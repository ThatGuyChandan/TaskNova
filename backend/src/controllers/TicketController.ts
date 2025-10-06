import { Response } from 'express';
import { injectable, inject } from 'inversify';
import Ticket from '../models/TicketModel.js';
import { AuthRequest } from '../middlewares/authMiddleware.js';
import { superuserView } from '../config/superuser.js';
import NotificationService from '../services/NotificationService.js';
import type { TicketEvent } from '../interfaces/TicketEvent.js';
import { TYPES } from '../types.js';

@injectable()
class TicketController {
  constructor(
    @inject(TYPES.NotificationService) private notificationService: NotificationService,
  ) {}

  createTicket = async (req: AuthRequest, res: Response) => {
    try {
      const { projectId, title, description } = req.body;
      const ticket = await Ticket.create({ projectId, title, description, updatedBy: req.user._id });
      this.notificationService.sendNotification('TicketCreated', { user: req.user, ticket });
      res.status(201).json(ticket);
    } catch (error) {
      res.status(500).json({ message: 'Error creating ticket', error });
    }
  };

  getTickets = async (req: AuthRequest, res: Response) => {
    try {
      let ticketsQuery = Ticket.find({ projectId: req.params.projectId });
      if (superuserView) {
        ticketsQuery = ticketsQuery.populate('updatedBy', 'email');
      }
      const tickets = await ticketsQuery;
      res.status(200).json(tickets);
    } catch (error) {
      res.status(500).json({ message: 'Error getting tickets', error });
    }
  };

  getTicketById = async (req: AuthRequest, res: Response) => {
    try {
      let ticketQuery = Ticket.findById(req.params.id);
      if (superuserView) {
        ticketQuery = ticketQuery.populate('updatedBy', 'email');
      }
      const ticket = await ticketQuery;
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
      res.status(200).json(ticket);
    } catch (error) {
      res.status(500).json({ message: 'Error getting ticket', error });
    }
  };

  updateTicket = async (req: AuthRequest, res: Response) => {
    try {
      const { title, description, status } = req.body;
      const ticket = await Ticket.findByIdAndUpdate(
        req.params.id,
        { title, description, status, updatedBy: req.user._id },
        { new: true },
      );
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
      this.notificationService.sendNotification('TicketUpdated', { user: req.user, ticket });
      res.status(200).json(ticket);
    } catch (error) {
      res.status(500).json({ message: 'Error updating ticket', error });
    }
  };

  deleteTicket = async (req: AuthRequest, res: Response) => {
    try {
      const ticket = await Ticket.findByIdAndDelete(req.params.id);
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
      res.status(200).json({ message: 'Ticket deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting ticket', error });
    }
  };
}

export default TicketController;