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
import Ticket from '../models/TicketModel.js';
import { superuserState } from '../config/superuser.js';
import NotificationService from '../services/NotificationService.js';
import { TYPES } from '../types.js';
let TicketController = class TicketController {
    constructor(notificationService) {
        this.notificationService = notificationService;
        this.createTicket = async (req, res) => {
            try {
                const { projectId, title, description, status } = req.body;
                const ticket = await Ticket.create({ projectId, title, description, status, createdBy: req.user._id, updatedBy: req.user._id });
                this.notificationService.sendNotification('TicketCreated', { user: req.user, ticket });
                res.status(201).json(ticket);
            }
            catch (error) {
                res.status(500).json({ message: 'Error creating ticket', error });
            }
        };
        this.getTickets = async (req, res) => {
            try {
                let ticketsQuery = Ticket.find({ projectId: req.params.projectId });
                if (superuserState.view) {
                    ticketsQuery = ticketsQuery.populate('createdBy', 'email').populate('updatedBy', 'email');
                }
                const tickets = await ticketsQuery;
                res.status(200).json(tickets);
            }
            catch (error) {
                res.status(500).json({ message: 'Error getting tickets', error });
            }
        };
        this.getTicketById = async (req, res) => {
            try {
                let ticketQuery = Ticket.findById(req.params.id);
                if (superuserState.view) {
                    ticketQuery = ticketQuery.populate('createdBy', 'email').populate('updatedBy', 'email');
                }
                const ticket = await ticketQuery;
                if (!ticket) {
                    return res.status(404).json({ message: 'Ticket not found' });
                }
                res.status(200).json(ticket);
            }
            catch (error) {
                res.status(500).json({ message: 'Error getting ticket', error });
            }
        };
        this.updateTicket = async (req, res) => {
            try {
                const { title, description, status } = req.body;
                const ticket = await Ticket.findByIdAndUpdate(req.params.id, { title, description, status, updatedBy: req.user._id }, { new: true });
                if (!ticket) {
                    return res.status(404).json({ message: 'Ticket not found' });
                }
                this.notificationService.sendNotification('TicketUpdated', { user: req.user, ticket });
                res.status(200).json(ticket);
            }
            catch (error) {
                res.status(500).json({ message: 'Error updating ticket', error });
            }
        };
        this.deleteTicket = async (req, res) => {
            try {
                const ticket = await Ticket.findByIdAndDelete(req.params.id);
                if (!ticket) {
                    return res.status(404).json({ message: 'Ticket not found' });
                }
                res.status(200).json({ message: 'Ticket deleted successfully' });
            }
            catch (error) {
                res.status(500).json({ message: 'Error deleting ticket', error });
            }
        };
    }
};
TicketController = __decorate([
    injectable(),
    __param(0, inject(TYPES.NotificationService)),
    __metadata("design:paramtypes", [NotificationService])
], TicketController);
export default TicketController;
