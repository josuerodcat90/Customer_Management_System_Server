import Patient from '../../models/Patient';
import moment from 'moment';
import checkAuth from '../../utils/checkAuth';
import { AuthenticationError } from 'apollo-server-core';

export default {
	Query: {
		async getPatients() {
			return await Patient.find();
		},
		async getPatient(_, { patientId }) {
			return await Patient.findOne({ _id: patientId });
		},
	},
	Mutation: {
		async createPatient(_, { input }, context) {
			try {
				const user = checkAuth(context);
				if (user) {
					const newPatient = new Patient({
						...input,
						createdAt: moment().format('YYYY-MM-DD HH:mm'),
					});
					await newPatient.save();

					return newPatient;
				} else {
					throw new AuthenticationError(
						'Action not allowed, you must be logged on or have a valid token to add a new patient'
					);
				}
			} catch (err) {
				throw new Error(err);
			}
		},
		async updatePatient(_, { patientId, input }, context) {
			const user = checkAuth(context);

			try {
				if (user) {
					return await Patient.findByIdAndUpdate(
						patientId,
						{
							...input,
							updatedAt: moment().format('YYYY-MM-DD HH:mm'),
						},
						{ new: true }
					);
				} else {
					throw new AuthenticationError(
						'Action not allowed, you must be logged on or have a valid token to update a patient'
					);
				}
			} catch (err) {
				throw new Error(err);
			}
		},
		async deletePatient(_, { patientId }, context) {
			const user = checkAuth(context);
			const patient = await Patient.findOne({ _id: patientId }, {}, { autopopulate: false });

			try {
				if (user && patient) {
					await patient.delete();
					return 'Patient deleted succesfully';
				} else if (user && !patient) {
					throw new Error("The patient doesn't exist in the database.");
				} else {
					throw new AuthenticationError(
						'Action not allowed, you must be logged on or have a valid token to delete a patient.'
					);
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},
};