import Image from '../../models/Image';
import checkAuth from '../../utils/checkAuth';
import { AuthenticationError } from 'apollo-server-core';

export default {
	Query: {
		async getImages() {
			return await Image.find();
		},
		async getImage(_, { imageID }) {
			return await Image.findById(imageID);
		},
		async getImagesByPacient(_, { pacientId }) {
			return await Image.find(pacientId).sort({ createdAt: -1 });
		},
		async getImagesByDate(_, { dateId }) {
			return await Image.find(dateId).sort({ createdAt: -1 });
		},
	},
	Mutation: {
		async uploadImage(_, { input: { name, size, pacientId, dateId, url } }, context) {
			const user = checkAuth(context);

			const newImage = new Image({
				name,
				size,
				pacientId,
				dateId,
				uploadedBy: user._id,
				url,
			});

			await newImage.save();

			return newImage;
		},
		async deleteImage(_, { imageId }, context) {
			const user = checkAuth(context);
			const image = await Image.findById(imageId);

			try {
				if (image.uploadedBy === user._id) {
					await image.delete();
					return 'Image deleted succesfully';
				} else {
					throw new AuthenticationError('Action not allowed');
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},
};
