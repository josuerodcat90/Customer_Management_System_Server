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
			return await Patient.findById(patientId);
		},
	},
	Mutation: {
		async createPatient(
			_,
			{
				input: {
					firstname,
					lastname,
					birthDate,
					idDocument,
					phoneNumber,
					email,
					address,
					referedBy,
					allergies,
					records,
					status,
				},
			},
			context
		) {
			try {
				const user = checkAuth(context);
				if (user) {
					const newPatient = new Patient({
						firstname,
						lastname,
						birthDate,
						idDocument,
						phoneNumber,
						email,
						address,
						referedBy,
						allergies,
						records,
						status,
						createdAt: moment().format('YYYY/MM/DD HH:mm'),
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
		async updatePatient(
			_,
			{
				patientId,
				input: {
					firstname,
					lastname,
					birthDate,
					idDocument,
					phoneNumber,
					email,
					address,
					referedBy,
					allergies,
					records,
					status,
				},
			},
			context
		) {
			const user = checkAuth(context);

			try {
				if (user) {
					return await Patient.findByIdAndUpdate(
						patientId,
						{
							firstname,
							lastname,
							birthDate,
							idDocument,
							phoneNumber,
							email,
							address,
							referedBy,
							allergies,
							records,
							status,
							updatedAt: moment().format('YYYY/MM/DD HH:mm'),
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

			try {
				if (user) {
					await Patient.findByIdAndDelete(patientId);
					return 'Patient deleted succesfully';
				} else {
					throw new AuthenticationError(
						'Action not allowed, you must be logged on or have a valid token to delete a patient.'
					);
				}
			} catch (err) {}
		},
	},
};
