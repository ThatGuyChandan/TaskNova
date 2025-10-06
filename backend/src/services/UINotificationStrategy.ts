import { injectable } from 'inversify';
import type { NotificationStrategy } from '../interfaces/i-notification-strategy.js';
import type { TicketEvent } from '../interfaces/TicketEvent.js';
import SocketService from './SocketService.js';
import Notification from '../models/NotificationModel.js';

@injectable()
class UINotificationStrategy implements NotificationStrategy {
  async sendNotification(event: TicketEvent, data: any): Promise<void> {
    const { user, ticket } = data;
    const message = `Ticket ${ticket.title} was ${event === 'TicketCreated' ? 'created' : 'updated'}`;

    if (event === 'TicketCreated') {
      SocketService.emitTicketCreate(ticket.projectId.toString(), ticket);
    } else {
      SocketService.emitTicketUpdate(ticket.projectId.toString(), ticket);
    }

    await Notification.create({
      userId: user._id,
      event,
      message,
    });
  }
}

export default UINotificationStrategy;
