import { Schema, model } from 'mongoose';

interface IOTP {
  email: string;
  otp: string;
  createdAt: Date;
}

const otpSchema = new Schema<IOTP>({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '10m' }, // OTP expires in 10 minutes
});

const OTP = model<IOTP>('OTP', otpSchema);

export default OTP;
