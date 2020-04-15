import Pacient from '../../models/Pacient';
import moment from 'moment';
import checkAuth from '../../utils/checkAuth';
import { AuthenticationError } from 'apollo-server-core';

export default {
	Query: {
		async getPacients() {
			return await Pacient.find();
		},
		async getPacient(_, { pacientId }) {
			return await Pacient.findById(pacientId);
		},
	},
	Mutation: {
		async createPacient(
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
					const newPacient = new Pacient({
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
					await newPacient.save();

					return newPacient;
				} else {
					throw new AuthenticationError(
						'Action not allowed, you must be logged on or have a valid token to add a new pacient'
					);
				}
			} catch (err) {
				throw new Error(err);
			}
		},
		async updatePacient(
			_,
			{
				pacientId,
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
					return await Pacient.findByIdAndUpdate(
						pacientId,
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
		async deletePacient(_, { pacientId }, context) {
			const user = checkAuth(context);

			try {
				if (user) {
					await Pacient.findByIdAndDelete(pacientId);
					return 'Patient deleted successfuly';
				} else {
					throw new AuthenticationError(
						'Action not allowed, you must be logged on or have a valid token to delete a patient.'
					);
				}
			} catch (err) {}
		},
	},
};
