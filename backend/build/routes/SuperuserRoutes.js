import { Router } from 'express';
import { toggle } from '../controllers/SuperuserController.js';
import { protect } from '../middlewares/authMiddleware.js';
const router = Router();
router.post('/toggle', protect, toggle);
export default router;
