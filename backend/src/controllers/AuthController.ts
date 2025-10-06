import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import OTPService from '../services/OTPService.js';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';
import { TYPES } from '../types.js';

@injectable()
class AuthController {
  constructor(@inject(TYPES.OTPService) private otpService: OTPService) {}

  sendOTP = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      await this.otpService.generateAndSendOTP(email);
      res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error sending OTP', error });
    }
  };

  verifyOTP = async (req: Request, res: Response) => {
    try {
      const { email, otp } = req.body;
      const user = await this.otpService.verifyOTP(email, otp);

      if (user) {
        const token = jwt.sign({ id: user._id, isSuperUser: user.isSuperUser }, process.env.JWT_SECRET || 'secret', {
          expiresIn: process.env.JWT_EXPIRES_IN || '1d',
        });
        res.status(200).json({ message: 'OTP verified successfully', token });
      } else {
        res.status(400).json({ message: 'Invalid OTP' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error verifying OTP', error });
    }
  };
}

export default AuthController;