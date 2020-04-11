import { Schema, model } from 'mongoose';

const imageSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	size: {
		type: String,
		required: true,
	},
	pacientId: {
		type: String,
		required: true,
	},
	dateId: {
		type: String,
		required: true,
	},
	fullroute: {
		type: String,
		required: true,
	},
});

export default model('Image', imageSchema);
