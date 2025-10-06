import { injectable } from 'inversify';
import type { NotificationStrategy } from '../interfaces/i-notification-strategy.js';
import type { TicketEvent } from '../interfaces/TicketEvent.js';
import { addJob } from '../config/queue.js';

@injectable()
class EmailNotificationStrategy implements NotificationStrategy {
  sendNotification(event: TicketEvent, data: any): void {
    addJob({ event, data });
  }
}

export default EmailNotificationStrategy;