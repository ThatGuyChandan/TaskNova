import type { TicketEvent } from './TicketEvent.js';

export interface NotificationStrategy {
  sendNotification(event: TicketEvent, data: any): void;
}
