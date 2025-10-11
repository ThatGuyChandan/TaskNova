var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { injectable, inject } from 'inversify';
import otpGenerator from 'otp-generator';
import OTP from '../models/OTPModel.js';
import User from '../models/UserModel.js';
import { TYPES } from '../types.js';
let OTPService = class OTPService {
    constructor(emailService) {
        this.emailService = emailService;
    }
    async generateAndSendOTP(email) {
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
    async verifyOTP(email, otp) {
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
};
OTPService = __decorate([
    injectable(),
    __param(0, inject(TYPES.IEmailService)),
    __metadata("design:paramtypes", [Object])
], OTPService);
export default OTPService;
