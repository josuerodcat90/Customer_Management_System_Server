import Images from '../../models/Image';

export default {
	Query: {
		async getImages() {
			return await Images.find();
		},
		async getImage(_, { imageID }) {
			return await Images.findById(imageID);
		}
	},
	Mutation: {
		async uploadImage(_, { input }) {
			const newImage = new Images(input);
			await newImage.save();
			return newImage;
		},
		async deleteImage(_, { imageID }) {
			return await Images.findByIdAndDelete(imageID);
		}
	}
};
