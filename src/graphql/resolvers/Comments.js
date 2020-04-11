import { AuthenticationError, UserInputError } from 'apollo-server-express';
import checkAuth from '../../utils/checkAuth';
import Dates from '../../models/Date';
import moment from 'moment';

export default {
	Mutation: {
		async createComment(_, { dateID, body }, context) {
			const user = checkAuth(context);
			if (body.trim() === '') {
				throw new UserInputError('Empty comment!', {
					errors: {
						body: 'Comment body must not empty',
					},
				});
			}

			const date = await Dates.findById(dateID);

			if (date) {
				date.comments.unshift({
					body,
					nameString: user.firstname + ' ' + user.lastname,
					username: user.username,
					createdAt: moment().format('YYYY-MM-DDTHH:mm:ss'),
				});
				await date.save();
				return date;
			} else {
				throw new UserInputError('Date not found');
			}
		},
		async updateComment(_, { dateID, commentID, body }, context) {
			const { username } = checkAuth(context);

			const date = await Dates.findById(dateID);

			if (date) {
				const index = date.comments.findIndex((c) => c.id === commentID);

				if (date.comments[index].username === username) {
					date.comments[index].body = body;
					await date.save();
					return date;
				} else {
					throw new AuthenticationError('Action not allowed');
				}
			} else {
				throw new UserInputError('Comment not found');
			}
		},
		async deleteComment(_, { dateID, commentID }, context) {
			const { username } = checkAuth(context);

			const date = await Dates.findById(dateID);

			if (date) {
				const index = date.comments.findIndex((c) => c.id === commentID);

				if (date.comments[index].username === username) {
					date.comments.splice(index, 1);
					await date.save();
					return date;
				} else {
					throw new AuthenticationError('Action not allowed');
				}
			} else {
				throw new UserInputError('Date not found');
			}
		},
	},
};
