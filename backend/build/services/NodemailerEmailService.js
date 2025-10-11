var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { injectable } from 'inversify';
import nodemailer from 'nodemailer';
let NodemailerEmailService = class NodemailerEmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.EMAIL_USER?.trim(),
                pass: process.env.EMAIL_PASS?.trim(),
            },
        });
    }
    async sendNotification(email, subject, message) {
        const mailOptions = {
            from: `"FluxBoard" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: subject,
            text: message,
        };
        await this.transporter.sendMail(mailOptions);
    }
    async sendOTP(email, otp) {
        const mailOptions = {
            from: `"FluxBoard" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Your OTP for Login',
            text: `Your OTP is ${otp}`,
        };
        await this.transporter.sendMail(mailOptions);
    }
};
NodemailerEmailService = __decorate([
    injectable(),
    __metadata("design:paramtypes", [])
], NodemailerEmailService);
export default NodemailerEmailService;
