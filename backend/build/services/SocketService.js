import { io } from '../server.js';
class SocketService {
    emitTicketUpdate(projectId, ticket) {
        io.to(projectId).emit('ticketUpdated', ticket);
    }
    emitTicketCreate(projectId, ticket) {
        io.to(projectId).emit('ticketCreated', ticket);
    }
    emitNotification(userId, notification) {
        io.to(userId).emit('notification', notification);
    }
}
export default new SocketService();
