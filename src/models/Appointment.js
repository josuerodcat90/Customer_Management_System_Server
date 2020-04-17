import { Schema, model } from 'mongoose';

const appointmentSchema = new Schema({
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
		autopopulate: true,
	},
	createdBy: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User',
		autopopulate: true,
	},
	patient: {
		type: Schema.Types.ObjectId,
		ref: 'Patient',
		autopopulate: true,
	},
	createdAt: String,
	updatedAt: String,
});

appointmentSchema.plugin(require('mongoose-autopopulate'));

export default model('Appointment', appointmentSchema);
