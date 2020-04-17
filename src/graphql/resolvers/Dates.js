import Date from '../../models/Date';
import checkAuth from '../../utils/checkAuth';
import moment from 'moment';
import { AuthenticationError } from 'apollo-server-core';

export default {
	Query: {
		async getDates() {
			try {
				const dates = await Date.find();
				return dates;
			} catch (err) {
				throw new Error(err);
			}
		},
		async getDate(_, { dateId }) {
			try {
				const date = await Date.findOne({ _id: dateId });
				if (!date) {
					throw new Error('Date not found!', Error);
				} else {
					return date;
				}
			} catch (err) {
				throw new Error(err);
			}
		},
		async getDatesByPatient(_, { patientId }) {
			try {
				const dates = await Date.find({ patient: patientId }).sort({
					createdAt: -1,
				});
				if (!dates) {
					throw new Error('Dates of this patient not found!', Error);
				} else {
					return dates;
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},
	Mutation: {
		async createDate(
			_,
			{
				input: {
					title,
					start_date,
					end_date,
					classname,
					description,
					editable,
					allday,
					doctor,
					patient,
				},
			},
			context
		) {
			const user = checkAuth(context);

			///verify if the fields are empty
			if (title.trim() === '') {
				throw new Error('Title field must not be empty');
			}
			if (start_date.trim() === '') {
				throw new Error('Start date field must not be empty');
			}
			if (end_date.trim() === '') {
				throw new Error('End date field must not be empty');
			}

			const newDate = new Date({
				title,
				start_date: moment(start_date).format('YYYY/MM/DD HH:mm'),
				end_date: moment(end_date).format('YYYY/MM/DD HH:mm'),
				classname,
				description,
				editable,
				allday,
				doctor,
				createdBy: user._id,
				patient,
				createdAt: moment().format('YYYY/MM/DD HH:mm'),
			});

			const date = await newDate.save();

			return date;
		},
		async updateDate(
			_,
			{
				dateId,
				input: {
					title,
					start_date,
					end_date,
					classname,
					description,
					editable,
					allday,
					doctor,
					patient,
				},
			},
			context
		) {
			const user = checkAuth(context);
			const date = await Date.findOne({ _id: dateId }, {}, { autopopulate: false });

			try {
				if (date.createdBy == user._id) {
					const updatedDate = await Date.findOneAndUpdate(
						{ _id: dateId },
						{
							title,
							start_date: moment(start_date).format('YYYY/MM/DD HH:mm'),
							end_date: moment(end_date).format('YYYY/MM/DD HH:mm'),
							classname,
							description,
							editable,
							allday,
							doctor,
							createdBy: user._id,
							patient,
							updatedAt: moment().format('YYYY/MM/DD HH:mm'),
						},
						{ new: true }
					);
					return updatedDate;
				} else {
					throw new AuthenticationError(
						'Action not allowed, you must be logged on or have a valid token to update a date.'
					);
				}
			} catch (err) {
				throw new Error(err);
			}
		},
		async deleteDate(_, { dateId }, context) {
			const user = checkAuth(context);
			const date = await Date.findOne({ _id: dateId }, {}, { autopopulate: false });

			try {
				if (date.createdBy == user._id) {
					await date.delete();
					return 'Date deleted succesfully.';
				} else {
					throw new AuthenticationError(
						'Action not allowed, you must be logged on or have a valid token to delete a date.'
					);
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},
};
