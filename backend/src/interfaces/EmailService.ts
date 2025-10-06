interface IEmailService {
  sendOTP(email: string, otp: string): Promise<void>;
}

export default IEmailService;
