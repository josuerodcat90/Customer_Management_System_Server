import { UserInputError } from 'apollo-server-express';
import Users from '../../models/User';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import 'moment/locale/es';
import { validateUserRegisterInput, validateLoginInput } from '../../utils/validation';

function generateToken(user) {
	return jwt.sign(
		{
			_id: user._id,
			username: user.username,
			email: user.email,
			firstname: user.firstname,
			lastname: user.lastname,
			range: user.range,
			status: user.status,
			title: user.bachtitle,
			usericon: user.usericon,
		},
		process.env.SECRET_KEY,
		{ expiresIn: '1h' }
	);
}

export default {
	Query: {
		async getUsers() {
			return await Users.find();
		},
		async getUser(_, { userID }) {
			return await Users.findById(userID);
		},
	},
	Mutation: {
		async login(_, { username, password }) {
			const { errors, valid } = validateLoginInput(username, password);

			if (!valid) {
				throw new UserInputError('Errors', { errors });
			}

			const user = await Users.findOne({ username });
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
				id: user._id,
				token,
			};
		},
		async register(
			_,
			{
				registerInput: {
					firstname,
					lastname,
					username,
					email,
					password,
					confirmPassword,
					status,
					range,
					bachtitle,
					usericon,
				},
			},
			context,
			info
		) {
			// TODO: validate user data
			const { valid, errors } = validateUserRegisterInput(
				firstname,
				lastname,
				username,
				email,
				password,
				confirmPassword
			);
			if (!valid) {
				throw new UserInputError('Errors', { errors });
			}
			///make sure the user & email doesnt already exist in DB
			const user = await Users.findOne({ username });
			const emailVal = await Users.findOne({ email });

			if (user && emailVal) {
				throw new UserInputError('Username and Email Address in use', {
					errors: {
						username: 'This username is taken',
						email: 'This email is in use with other account',
					},
				});
			} else if (user) {
				throw new UserInputError('Username is taken', {
					errors: {
						username: 'This username is taken',
					},
				});
			} else if (emailVal) {
				throw new UserInputError('Email Address in use', {
					errors: {
						email: 'This email is in use with other account',
					},
				});
			} else {
				///hash password and create an auth token
				password = await bcryptjs.hash(password, 12);
			}

			const newUser = new Users({
				firstname,
				lastname,
				username,
				email,
				password,
				status,
				range,
				bachtitle,
				usericon,
				createdAt: moment().format('YYYY-MM-DDTHH:mm:ss'),
			});
			const res = await newUser.save();

			const token = generateToken(res);

			return {
				...res._doc,
				_id: res._id,
				token,
			};
		},
		async updateUser(_, { userID, input }) {
			return await Users.findByIdAndUpdate(userID, input, { new: true });
		},
		async deleteUser(_, { userID }) {
			return await Users.findByIdAndDelete(userID);
		},
	},
};
