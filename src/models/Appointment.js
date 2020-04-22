import { Schema, model } from 'mongoose';

const appointmentSchema = new Schema({
	title: String,
	start: String,
	end: String,
	className: {
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
	allDay: {
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

appointmentSchema.set('toJSON', {
	virtuals: true,
	versionKey: false,
	transform: function (doc, ret) {
		delete ret._id;
	},
});

appointmentSchema.plugin(require('mongoose-autopopulate'));

export default model('Appointment', appointmentSchema);
