import Doctor from '../../models/Doctor';
import moment from 'moment';

export default {
	Query: {
		async getDoctors() {
			return await Doctor.find();
		},
		async getDoctor(_, { doctorId }) {
			return await Doctor.findById(doctorId);
		},
	},
	Mutation: {
		async createDoctor(_, { input: { firstname, lastname, status } }) {
			const newDoctor = new Doctor({
				firstname,
				lastname,
				status,
				createdAt: moment().format('YYYY/MM/DD HH:mm'),
			});
			await newDoctor.save();

			return newDoctor;
		},
		async updateDoctor(_, { doctorId, input: { firstname, lastname, status } }) {
			return await Doctor.findByIdAndUpdate(
				doctorId,
				{
					firstname,
					lastname,
					status,
					updatedAt: moment().format('YYYY/MM/DD HH:mm'),
				},
				{ new: true }
			);
		},
		async deleteDoctor(_, { doctorId }) {
			return await Doctor.findByIdAndDelete(doctorId);
		},
	},
};
