import { io } from '../server.js';

class SocketService {
  public emitTicketUpdate(projectId: string, ticket: any) {
    io.to(projectId).emit('ticketUpdated', ticket);
  }

  public emitTicketCreate(projectId: string, ticket: any) {
    io.to(projectId).emit('ticketCreated', ticket);
  }
}

export default new SocketService();
