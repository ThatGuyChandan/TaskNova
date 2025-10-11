import { Router } from 'express';
import { createProject, getProjects, getProjectById, updateProject, deleteProject, } from '../controllers/ProjectController.js';
import { protect } from '../middlewares/authMiddleware.js';
import ticketRoutes from './TicketRoutes.js';
const router = Router();
router.route('/').post(protect, createProject).get(protect, getProjects);
router.route('/:projectId').get(protect, getProjectById).put(protect, updateProject).delete(protect, deleteProject);
router.use('/:projectId/tickets', ticketRoutes);
export default router;
