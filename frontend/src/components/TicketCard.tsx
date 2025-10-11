import { useSelector } from 'react-redux';
import { Draggable } from '@hello-pangea/dnd';
import styles from './TicketCard.module.css';

const priorityClasses = {
  Low: styles.priorityLow,
  Medium: styles.priorityMedium,
  High: styles.priorityHigh,
};

const TicketCard = ({ ticket, index }) => {
  const { superUserToggle } = useSelector((state) => state.ui);

  return (
    <Draggable draggableId={ticket._id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`${styles.card} ${priorityClasses[ticket.priority]}`}>
          <h3 className={styles.title}>{ticket.title}</h3>
          <p className={styles.description}>{ticket.description}</p>
          {superUserToggle && (
            <div className={styles.superuserInfo}>
              <p>Created by: {ticket.createdBy?.email}</p>
              <p>Updated by: {ticket.updatedBy?.email}</p>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TicketCard;
