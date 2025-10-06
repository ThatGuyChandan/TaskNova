import { injectable } from 'inversify';
import INotificationStrategy from '../interfaces/NotificationStrategy.js';
import TicketEvent from '../interfaces/TicketEvent.js';
import { addJob } from '../config/queue.js';

@injectable()
class EmailNotificationStrategy implements INotificationStrategy {
  sendNotification(event: TicketEvent, data: any): void {
    addJob({ event, data });
  }
}

export default EmailNotificationStrategy;
