import { injectable, inject } from 'inversify';
import NotificationContext from './NotificationContext.js';
import TicketEvent from '../interfaces/TicketEvent.js';
import { TYPES } from '../types.js';

@injectable()
class NotificationService {
  constructor(
    @inject(TYPES.NotificationContext) private notificationContext: NotificationContext,
  ) {}

  sendNotification(event: TicketEvent, data: any) {
    this.notificationContext.sendNotification(event, data);
  }
}

export default NotificationService;