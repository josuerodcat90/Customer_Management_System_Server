import { Schema, model } from 'mongoose';

const dateSchema = new Schema(
	{
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
		doctorId: {
			type: Schema.Types.ObjectId,
			ref: 'Doctor',
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		pacientId: {
			type: Schema.Types.ObjectId,
			ref: 'Pacient',
		},
	},
	{
		timestamps: true,
	}
);

export default model('Date', dateSchema);
