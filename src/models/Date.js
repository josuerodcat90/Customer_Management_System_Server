import { Schema, model } from 'mongoose';

const dateSchema = new Schema({
	title: String,
	start_date: String,
	end_date: String,
	classname: {
		type: String,
		default: 'Amarillo',
	},
	images: {
		type: [],
		default: [],
	},
	description: String,
	editable: {
		type: Boolean,
		default: 1,
	},
	allday: {
		type: Boolean,
		default: 0,
	},
	doctorId: String,
	userId: String,
	pacientId: String,
	createdAt: String,
	updatedAt: String,
});

export default model('Date', dateSchema);
