import { UserInputError } from 'apollo-server-express';
import { AuthenticationError } from 'apollo-server-core';
import User from '../../models/User';
import moment from 'moment';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validateUserRegisterInput, validateLoginInput } from '../../utils/validation';
import checkAuth from '../../utils/checkAuth';

function generateToken(user) {
	return jwt.sign(
		{
			_id: user._id,
			email: user.email,
			firstname: user.firstname,
			lastname: user.lastname,
			range: user.range,
			status: user.status,
			title: user.bachTitle,
			usericon: user.userIcon,
		},
		process.env.SECRET_KEY,
		{ expiresIn: '3h' } ///FIXME: return the expire time to 1h
	);
}

export default {
	Query: {
		async getUsers() {
			return await User.find();
		},
		async getUser(_, { userId }) {
			return await User.findById(userId);
		},
	},
	Mutation: {
		async login(_, { email, password }) {
			const { errors, valid } = validateLoginInput(email, password);

			if (!valid) {
				throw new UserInputError('Errors', { errors });
			}

			const user = await User.findOne({ email });
			if (!user) {
				errors.general = 'User not found';
				throw new UserInputError('User not found', { errors });
			}

			const match = await bcryptjs.compare(password, user.password);
			if (!match) {
				errors.general = 'Wrong credentials';
				throw new UserInputError('Wrong credentials', { errors });
			}

			const token = generateToken(user);

			return {
				...user._doc,
				_id: user._id,
				token,
			};
		},
		async createUser(
			_,
			{
				input: {
					firstname,
					lastname,
					email,
					password,
					confirmPassword,
					status,
					range,
					bachTitle,
					userIcon,
				},
			},
			context,
			info
		) {
			const { valid, errors } = validateUserRegisterInput(
				firstname,
				lastname,
				email,
				password,
				confirmPassword
			);
			if (!valid) {
				throw new UserInputError('Errors', { errors });
			}
			///make sure the email doesnt already exist in DB
			const emailVal = await User.findOne({ email });

			if (emailVal) {
				throw new UserInputError('Email address in use', {
					errors: {
						email: 'This email is in use with other account',
					},
				});
			} else {
				///hash password and create an auth token
				password = await bcryptjs.hash(password, 12);
			}

			const newUser = new User({
				firstname,
				lastname,
				email,
				password,
				status,
				range,
				bachTitle,
				userIcon,
				createdAt: moment().format('YYYY/MM/DD HH:mm'),
			});
			const res = await newUser.save();

			const token = generateToken(res);

			return {
				...res._doc,
				_id: res._id,
				token,
			};
		},
		async updateUser(
			_,
			{ userId, input: { firstname, lastname, email, password, status, range } },
			context
		) {
			const user = checkAuth(context);
			const dbUser = await User.findById(userId);

			try {
				if (user._id == dbUser._id) {
					return await User.findOneAndUpdate(
						{ _id: userId },
						{
							firstname,
							lastname,
							email,
							password,
							status,
							range,
							updatedAt: moment().format('YYYY/MM/DD HH:mm'),
						},
						{ new: true }
					);
				} else {
					throw new AuthenticationError(
						'Action not allowed, you must be the owner of this account to update it.'
					);
				}
			} catch (err) {
				throw new Error(err);
			}
		},
		async deleteUser(_, { userId }, context) {
			const user = checkAuth(context);
			const dbUser = await User.findOne({ _id: userId });

			try {
				if (user._id == dbUser._id) {
					await dbUser.delete();
					return 'User deleted succesfully';
				} else {
					throw new AuthenticationError(
						'Action not allowed, you must be the owner of this account to delete it.'
					);
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},
};
