import TicketEvent from './TicketEvent.js';

interface INotificationStrategy {
  sendNotification(event: TicketEvent, data: any): void;
}

export default INotificationStrategy;
