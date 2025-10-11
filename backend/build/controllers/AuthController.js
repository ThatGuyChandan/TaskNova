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
import OTPService from '../services/OTPService.js';
import jwt from 'jsonwebtoken';
import { TYPES } from '../types.js';
let AuthController = class AuthController {
    constructor(otpService) {
        this.otpService = otpService;
        this.sendOTP = async (req, res) => {
            try {
                const { email } = req.body;
                await this.otpService.generateAndSendOTP(email);
                res.status(200).json({ message: 'OTP sent successfully' });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: 'Error sending OTP', error });
            }
        };
        this.verifyOTP = async (req, res) => {
            try {
                const { email, otp } = req.body;
                const user = await this.otpService.verifyOTP(email, otp);
                if (user) {
                    const token = jwt.sign({ id: user._id, isSuperUser: user.isSuperUser }, process.env.JWT_SECRET || 'your-jwt-secret', {
                        expiresIn: String(process.env.JWT_EXPIRES_IN) || '1d',
                    });
                    res.status(200).json({ message: 'OTP verified successfully', token });
                }
                else {
                    res.status(400).json({ message: 'Invalid OTP' });
                }
            }
            catch (error) {
                res.status(500).json({ message: 'Error verifying OTP', error });
            }
        };
    }
};
AuthController = __decorate([
    injectable(),
    __param(0, inject(TYPES.OTPService)),
    __metadata("design:paramtypes", [OTPService])
], AuthController);
export default AuthController;
