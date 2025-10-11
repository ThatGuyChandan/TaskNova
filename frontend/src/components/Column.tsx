import { Droppable } from '@hello-pangea/dnd';
import { useDispatch } from 'react-redux';
import TicketCard from './TicketCard';
import { toggleNewTicketModal } from '../redux/uiSlice';
import styles from './Kanban.module.css';

const columnMeta = {
  Proposed: { className: styles.backlog },
  'To-Do': { className: styles.todo },
  'In-Progress': { className: styles.inProgress },
  Done: { className: styles.done },
  Deployed: { className: styles.cancelled },
};

const Column = ({ columnId, tickets }) => {
  const dispatch = useDispatch();
  const meta = columnMeta[columnId] || { className: styles.backlog };

  return (
    <div className={styles.column}>
      <div className={styles['column-header']}>
        <span className={`${styles.columnTitleText} ${meta.className}`}>{columnId} <span className={styles.ticketCount}>({tickets.length})</span></span>
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
