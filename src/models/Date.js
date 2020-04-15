import { Schema, model } from 'mongoose';

const dateSchema = new Schema({
	title: String,
	start_date: String,
	end_date: String,
	classname: {
		type: String,
		default: 'Pendiente',
	},
	description: {
		type: String,
		trim: true,
	},
	editable: {
		type: Boolean,
		default: true,
	},
	allday: {
		type: Boolean,
		default: false,
	},
	doctor: {
		type: Schema.Types.ObjectId,
		ref: 'Doctor',
	},
	creator: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	patient: {
		type: Schema.Types.ObjectId,
		ref: 'Patient',
	},
	createdAt: String,
	updatedAt: String,
});

export default model('Date', dateSchema);
