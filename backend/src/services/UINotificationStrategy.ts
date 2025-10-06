import { injectable } from 'inversify';
import INotificationStrategy from '../interfaces/NotificationStrategy.js';
import TicketEvent from '../interfaces/TicketEvent.js';
import SocketService from './SocketService.js';
import Notification from '../models/NotificationModel.js';

@injectable()
class UINotificationStrategy implements INotificationStrategy {
  async sendNotification(event: TicketEvent, data: any): Promise<void> {
    const { user, ticket } = data;
    const message = `Ticket ${ticket.title} was ${event === TicketEvent.TicketCreated ? 'created' : 'updated'}`;

    if (event === TicketEvent.TicketCreated) {
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