import { getJob } from '../config/queue.js';
import NodemailerEmailService from '../services/NodemailerEmailService.js';
import TicketEvent from '../interfaces/TicketEvent.js';
import Notification from '../models/NotificationModel.js';

const emailService = new NodemailerEmailService();

const processJob = async () => {
  const job = getJob();
  if (job) {
    const { event, data } = job;
    const { user, ticket } = data;
    const message = `Ticket ${ticket.title} was ${event === TicketEvent.TicketCreated ? 'created' : 'updated'}`;

    try {
      await emailService.sendOTP(user.email, message); // Reusing sendOTP for simplicity
      await Notification.create({
        userId: user._id,
        event,
        message,
      });
    } catch (error) {
      console.error('Error processing email job:', error);
    }
  }
};

export const startWorker = () => {
  setInterval(processJob, 10000); // Process a job every 10 seconds
};
