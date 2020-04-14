import Pacient from '../../models/Pacient';
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
		async createPacient(_, { input }) {
			const newPacient = new Pacient(input);
			await newPacient.save();
			return newPacient;
		},
		async updatePacient(_, { pacientId, input }) {
			return await Pacient.findByIdAndUpdate(pacientId, input, { new: true });
		},
		async deletePacient(_, { pacientId }) {
			return await Pacient.findByIdAndDelete(pacientId);
		},
	},
};
