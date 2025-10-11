var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { injectable } from 'inversify';
import SocketService from './SocketService.js';
import Notification from '../models/NotificationModel.js';
let UINotificationStrategy = class UINotificationStrategy {
    async sendNotification(event, data) {
        const { user, ticket } = data;
        const message = `Ticket ${ticket.title} was ${event === 'TicketCreated' ? 'created' : 'updated'}`;
        if (event === 'TicketCreated') {
            SocketService.emitTicketCreate(ticket.projectId.toString(), ticket);
        }
        else {
            SocketService.emitTicketUpdate(ticket.projectId.toString(), ticket);
        }
        const notification = await Notification.create({
            userId: user._id,
            event,
            message,
        });
        SocketService.emitNotification(user._id.toString(), notification);
    }
};
UINotificationStrategy = __decorate([
    injectable()
], UINotificationStrategy);
export default UINotificationStrategy;
