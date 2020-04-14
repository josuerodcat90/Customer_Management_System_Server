import { Schema, model } from 'mongoose';

const imageSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		size: {
			type: String,
			required: true,
		},
		pacientId: {
			type: Schema.Types.ObjectId,
			ref: 'Pacient',
			required: true,
		},
		dateId: {
			type: Schema.Types.ObjectId,
			ref: 'Date',
			required: true,
		},
		uploadedBy: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		url: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

export default model('Image', imageSchema);
