import { injectable, inject } from 'inversify';
import INotificationStrategy from '../interfaces/NotificationStrategy.js';
import TicketEvent from '../interfaces/TicketEvent.js';
import { isUserOnline } from '../config/onlineUsers.js';
import { TYPES } from '../types.js';

@injectable()
class NotificationContext {
  constructor(
    @inject(TYPES.EmailNotificationStrategy) private emailStrategy: INotificationStrategy,
    @inject(TYPES.UINotificationStrategy) private uiStrategy: INotificationStrategy,
  ) {}

  sendNotification(event: TicketEvent, data: any): void {
    const { user } = data;
    if (isUserOnline(user._id.toString())) {
      this.uiStrategy.sendNotification(event, data);
    } else {
      this.emailStrategy.sendNotification(event, data);
    }
  }
}

export default NotificationContext;
