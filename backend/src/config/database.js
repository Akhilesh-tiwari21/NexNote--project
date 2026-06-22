import mongoose from 'mongoose';
import config from './config.js';

const connectDb = async() => {
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log(`Database is connected succesfully`)
    } catch (error) {
        console.error(`Database connection failed ${message.error}`);
        process.exit(1);
    }
};

export default connectDb;