export interface IEmailService {
  sendNotification(email: string, subject: string, message: string): Promise<void>;
  sendOTP(email: string, otp: string): Promise<void>;
}