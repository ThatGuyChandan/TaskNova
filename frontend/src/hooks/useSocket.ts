import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { socket } from '../api/socket';
import { addTicket, updateTicketInList } from '../redux/ticketsSlice';
import { addNotification } from '../redux/notificationsSlice';

export const useSocket = (userId: string, projectId: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userId || !projectId) return;

    socket.auth = { userId };
    socket.on('connect', () => {
      socket.emit('joinProject', projectId);
    });

    socket.connect();

    const onTicketCreated = (ticket) => {
      dispatch(addTicket(ticket));
    };

    const onTicketUpdated = (ticket) => {
      dispatch(updateTicketInList(ticket));
    };

    const onNotification = (notification) => {
      dispatch(addNotification(notification));
    };

    socket.on('ticketCreated', onTicketCreated);
    socket.on('ticketUpdated', onTicketUpdated);
    socket.on('notification', onNotification);

    return () => {
      socket.off('ticketCreated', onTicketCreated);
      socket.off('ticketUpdated', onTicketUpdated);
      socket.off('notification', onNotification);
      socket.disconnect();
    };
  }, [dispatch, userId, projectId]);
};
