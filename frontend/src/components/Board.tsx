import { useEffect, useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTickets, updateTicket } from '../redux/ticketsSlice';
import Column from './Column';
import styles from './Kanban.module.css';

const Board = () => {
  const dispatch = useDispatch();
  const { activeProject } = useSelector((state) => state.projects);
  const { tickets: allTickets, loading } = useSelector((state) => state.tickets);
  const [tickets, setTickets] = useState({
    Proposed: [],
    'To-Do': [],
    'In-Progress': [],
    Done: [],
    Deployed: [],
  });

  useEffect(() => {
    if (activeProject) {
      dispatch(fetchTickets(activeProject._id));
    }
  }, [activeProject, dispatch]);

  useEffect(() => {
    const newTickets = {
      Proposed: [],
      'To-Do': [],
      'In-Progress': [],
      Done: [],
      Deployed: [],
    };
    allTickets.forEach((ticket) => {
      if (newTickets[ticket.status]) {
        newTickets[ticket.status].push(ticket);
      }
    });
    setTickets(newTickets);
  }, [allTickets]);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const start = tickets[source.droppableId];
    const end = tickets[destination.droppableId];

    if (start === end) {
      const newTickets = Array.from(start);
      const [removed] = newTickets.splice(source.index, 1);
      newTickets.splice(destination.index, 0, removed);

      setTickets({
        ...tickets,
        [source.droppableId]: newTickets,
      });
    } else {
      const startTickets = Array.from(start);
      const [removed] = startTickets.splice(source.index, 1);
      const endTickets = Array.from(end);
      endTickets.splice(destination.index, 0, removed);

      setTickets({
        ...tickets,
        [source.droppableId]: startTickets,
        [destination.droppableId]: endTickets,
      });

      dispatch(updateTicket({ ...removed, status: destination.droppableId, projectId: activeProject._id }));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.board}>
        {['Proposed', 'To-Do', 'In-Progress', 'Done', 'Deployed'].map((columnId) => (
          <Column key={columnId} columnId={columnId} tickets={tickets[columnId]} />
        ))}
      </div>
    </DragDropContext>
  );
};

export default Board;
