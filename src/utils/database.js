import mongoose from 'mongoose';

///connection function
export const connectDB = async () => {
	///get the URI from dotenv file
	const URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/CustomerManagementSystem';

	///try to connect the to the Atlas DB
	try {
		await mongoose.connect(URI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		});
		console.log(`>>>Cloud DB is connected!<<<`);
	} catch (e) {
		///catch if something wrong happens
		console.error(`¡Something goes wrong!`);
		console.error(e);
	}
};
