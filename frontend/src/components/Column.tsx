import { Droppable } from '@hello-pangea/dnd';
import { useDispatch } from 'react-redux';
import TicketCard from './TicketCard';
import { toggleNewTicketModal } from '../redux/uiSlice';
import styles from './Kanban.module.css';

const columnMeta = {
  Proposed: { color: 'bg-pink-100 text-pink-600' },
  'To-Do': { color: 'bg-purple-100 text-purple-600' },
  'In-Progress': { color: 'bg-cyan-100 text-cyan-600' },
  Done: { color: 'bg-green-100 text-green-600' },
  Deployed: { color: 'bg-yellow-100 text-yellow-600' },
};

const Column = ({ columnId, tickets }) => {
  const dispatch = useDispatch();
  const meta = columnMeta[columnId] || { color: 'bg-gray-100 text-gray-500' };

  return (
    <div className={styles.column}>
      <div className={styles['column-header']}>
        <span className={`${styles.columnTitleText} ${meta.color}`}>{columnId} <span className={styles.ticketCount}>({tickets.length})</span></span>
        <button className={styles.newTicketButton} onClick={() => dispatch(toggleNewTicketModal(columnId))}>+ New</button>
      </div>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={styles.droppableArea}
          >
            {tickets.length > 0 ? (
              tickets.map((ticket, index) => (
                <TicketCard key={ticket._id} ticket={ticket} index={index} />
              ))
            ) : (
              <div className={styles.emptyState}>No tickets yet.</div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
