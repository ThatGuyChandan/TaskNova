import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/UserModel.js';
dotenv.config({ path: '../../.env' });
const email = process.argv[2];
if (!email) {
    console.error('Please provide an email address.');
    process.exit(1);
}
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || '');
        console.log('MongoDB connected');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};
const makeSuperuser = async () => {
    await connectDB();
    try {
        const user = await User.findOneAndUpdate({ email }, { isSuperUser: true }, { new: true });
        if (user) {
            console.log(`Successfully made ${email} a super-user.`);
        }
        else {
            console.error(`User with email ${email} not found.`);
        }
    }
    catch (error) {
        console.error('Error making user a super-user:', error);
    }
    finally {
        mongoose.disconnect();
    }
};
makeSuperuser();
