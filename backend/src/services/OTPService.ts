import { injectable, inject } from 'inversify';
import otpGenerator from 'otp-generator';
import OTP from '../models/OTPModel.js';
import User, { IUser } from '../models/UserModel.js';
import IEmailService from '../interfaces/EmailService.js';
import { TYPES } from '../types.js';

@injectable()
class OTPService {
  constructor(@inject(TYPES.IEmailService) private emailService: IEmailService) {}

  async generateAndSendOTP(email: string): Promise<void> {
    const user = await User.findOne({ email });
    if (!user) {
      // Decide if you want to create a new user or throw an error
      // For this example, we'll create a new user
      await User.create({ email });
    }

    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
    await OTP.create({ email, otp });

    await this.emailService.sendOTP(email, otp);
  }

  async verifyOTP(email: string, otp: string): Promise<IUser | null> {
    const otpRecord = await OTP.findOne({ email, otp });

    if (!otpRecord) {
      return null;
    }

    // OTP is valid, so we can delete it
    await OTP.deleteOne({ _id: otpRecord._id });

    const user = await User.findOne({ email });

    if (!user) {
      // This should not happen if the user was created during OTP generation
      return null;
    }

    return user;
  }
}

export default OTPService;