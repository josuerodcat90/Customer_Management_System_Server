import Image from '../../models/Image';
import moment from 'moment';
import checkAuth from '../../utils/checkAuth';
import { AuthenticationError } from 'apollo-server-core';

export default {
	Query: {
		async getImages() {
			return await Image.find();
		},
		async getImage(_, { imageId }) {
			return await Image.findOne({ _id: imageId });
		},
		async getImagesByPatient(_, { patientId }) {
			return await Image.find({ patient: patientId }).sort({ createdAt: -1 });
		},
		async getImagesByAppointment(_, { appointmentId }) {
			return await Image.find({ appointment: appointmentId }).sort({ createdAt: -1 });
		},
	},
	Mutation: {
		async uploadImage(_, { input }, context) {
			const user = checkAuth(context);

			try {
				if (user) {
					const newImage = new Image({
						...input,
						uploadedBy: user._id,
						createdAt: moment().format('YYYY-MM-DD HH:mm'),
					});

					await newImage.save();
					return newImage;
				} else {
					throw new AuthenticationError(
						'Action not allowed, you must be logged on or have a valid token to upload an image.'
					);
				}
			} catch (err) {
				throw new Error(err);
			}
		},
		async deleteImage(_, { imageId }, context) {
			const user = checkAuth(context);
			const image = await Image.findOne({ _id: imageId });

			try {
				if (image.uploadedBy == user._id) {
					await image.delete();
					return 'Image deleted succesfully';
				} else {
					throw new AuthenticationError(
						'Action not allowed, you must be logged on or have a valid token to delete an image.'
					);
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},
};
