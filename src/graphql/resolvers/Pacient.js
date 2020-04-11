import Pacients from '../../models/Pacient';

export default {
	Query: {
		async getPacients() {
			return await Pacients.find();
		},
		async getPacient(_, { pacientID }) {
			return await Pacients.findById(pacientID);
		}
	},
	Mutation: {
		async createPacient(_, { input }) {
			const newPacient = new Pacients(input);
			await newPacient.save();
			return newPacient;
		},
		async updatePacient(_, { pacientID, input }) {
			return await Pacients.findByIdAndUpdate(pacientID, input, { new: true });
		},
		async deletePacient(_, { pacientID }) {
			return await Pacients.findByIdAndDelete(pacientID);
		}
	}
};
