import app from './app';
import { connectDB } from './utils/database';

///Main function
const main = async () => {
	await app.listen(app.get('PORT'));
	console.log(`>>>Server on Port ${app.get('PORT')}!<<<`);
	connectDB();
};

main();
