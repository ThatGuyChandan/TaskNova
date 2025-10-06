import { Router } from 'express';
import container from '../inversify.config.js';
import AuthController from '../controllers/AuthController.js';
import { TYPES } from '../types.js';

const router = Router();
const authController = container.get<AuthController>(TYPES.AuthController);

router.post('/send-otp', authController.sendOTP);
router.post('/verify-otp', authController.verifyOTP);

export default router;