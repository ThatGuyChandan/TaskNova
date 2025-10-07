import { injectable } from 'inversify';
import nodemailer from 'nodemailer';
import type { IEmailService } from '../interfaces/EmailService.js';

@injectable()
class NodemailerEmailService implements IEmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER?.trim(),
        pass: process.env.EMAIL_PASS?.trim(),
      },
    });
  }

  async sendOTP(email: string, otp: string): Promise<void> {
    const mailOptions = {
      from: `"FluxBoard" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your OTP for Login',
      text: `Your OTP is ${otp}`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}

export default NodemailerEmailService;
