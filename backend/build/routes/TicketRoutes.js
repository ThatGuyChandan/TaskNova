import { Router } from 'express';
import container from '../inversify.config.js';
import { TYPES } from '../types.js';
import { protect } from '../middlewares/authMiddleware.js';
const router = Router({ mergeParams: true });
const ticketController = container.get(TYPES.TicketController);
router.route('/').post(protect, ticketController.createTicket).get(protect, ticketController.getTickets);
router.route('/:id').get(protect, ticketController.getTicketById).put(protect, ticketController.updateTicket).delete(protect, ticketController.deleteTicket);
export default router;
