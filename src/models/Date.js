import { Schema, model } from 'mongoose';

const dateSchema = new Schema(
	{
		title: String,
		start_date: String,
		end_date: String,
		classname: {
			type: String,
			default: 'pendiente',
		},
		description: {
			type: String,
			trim: true,
		},
		editable: {
			type: Boolean,
			default: 1,
		},
		allday: {
			type: Boolean,
			default: 0,
		},
		doctorId: {
			type: Schema.Types.ObjectId,
			ref: 'Doctor',
		},
		userId: {
			type: Schema.Types.ObjectId,
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
