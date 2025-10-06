import type { TicketEvent } from './TicketEvent.js';

export interface Job {
  event: TicketEvent;
  data: any;
}