import Doctor from '../../models/Doctor';

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
		async createDoctor(_, { input }) {
			const newDoctor = new Doctor(input);
			await newDoctor.save();
			return newDoctor;
		},
		async updateDoctor(_, { doctorId, input }) {
			return await Doctor.findByIdAndUpdate(doctorId, input, { new: true });
		},
		async deleteDoctor(_, { doctorId }) {
			return await Doctor.findByIdAndDelete(doctorId);
		},
	},
};
