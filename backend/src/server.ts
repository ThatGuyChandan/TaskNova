import "reflect-metadata";
import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import connectDB from './config/database.js';
import { addUser, removeUser } from './config/onlineUsers.js';
import { startWorker } from './workers/emailWorker.js';

const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId as string;
  if (userId) {
    addUser(userId);
    console.log(`user ${userId} connected`);
  }

  socket.on('joinProject', (projectId) => {
    socket.join(projectId);
    console.log(`user ${userId} joined project ${projectId}`);
  });

  socket.on('disconnect', () => {
    if (userId) {
      removeUser(userId);
      console.log(`user ${userId} disconnected`);
    }
  });
});

const startServer = async () => {
  await connectDB();
  startWorker();
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer();

export { io };
