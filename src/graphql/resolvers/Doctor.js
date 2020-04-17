import Doctor from '../../models/Doctor';
import checkAuth from '../../utils/checkAuth';
import moment from 'moment';
import { AuthenticationError } from 'apollo-server-core';

export default {
	Query: {
		async getDoctors() {
			return await Doctor.find();
		},
		async getDoctor(_, { doctorId }) {
			return await Doctor.findOne({ _id: doctorId });
		},
	},
	Mutation: {
		async createDoctor(_, { input: { firstname, lastname, status } }, context) {
			const user = checkAuth(context);

			try {
				if (user) {
					const newDoctor = new Doctor({
						firstname,
						lastname,
						status,
						createdAt: moment().format('YYYY/MM/DD HH:mm'),
					});
					await newDoctor.save();

					return newDoctor;
				} else {
					throw new AuthenticationError(
						'Action not allowed, you must be logged on or have a valid token to create a Doctor.'
					);
				}
			} catch (err) {
				throw new Error(err);
			}
		},
		async updateDoctor(_, { doctorId, input: { firstname, lastname, status } }, context) {
			const user = checkAuth(context);

			try {
				if (user) {
					return await Doctor.findOneAndUpdate(
						{ _id: doctorId },
						{
							firstname,
							lastname,
							status,
							updatedAt: moment().format('YYYY/MM/DD HH:mm'),
						},
						{ new: true }
					);
				} else {
					throw new AuthenticationError(
						'Action not allowed, you must be logged on or have a valid token to update a Doctor.'
					);
				}
			} catch (err) {
				throw new Error(err);
			}
		},
		async deleteDoctor(_, { doctorId }, context) {
			const user = checkAuth(context);
			const doctor = await Doctor.findOne({ _id: doctorId });

			try {
				if (user && doctor) {
					await doctor.delete();
					return 'Doctor deleted succesfully.';
				} else if (user && !doctor) {
					throw new Error("The Doctor doesn't exist in the database.");
				} else {
					throw new AuthenticationError(
						'Action not allowed, you must be logged on or have a valid token to delete a Doctor.'
					);
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},
};
