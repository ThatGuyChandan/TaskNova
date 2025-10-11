import { Schema, model } from 'mongoose';
const otpSchema = new Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: '10m' }, // OTP expires in 10 minutes
});
const OTP = model('OTP', otpSchema);
export default OTP;
