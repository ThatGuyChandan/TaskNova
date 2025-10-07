import { Droppable } from '@hello-pangea/dnd';
import { useDispatch } from 'react-redux';
import TicketCard from './TicketCard';
import { toggleNewTicketModal } from '../redux/uiSlice';

const Column = ({ columnId, tickets }) => {
  const dispatch = useDispatch();

  return (
    <div style={{ width: '20%', backgroundColor: '#e2e8f0', borderRadius: '0.5rem', padding: '1rem' }}>
      <h2 style={{ fontWeight: 'bold', fontSize: '1.125rem', marginBottom: '1rem' }}>{columnId}</h2>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} style={{ minHeight: '600px' }}>
            {tickets.map((ticket, index) => (
              <TicketCard key={ticket.id} ticket={ticket} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <button
        style={{ marginTop: '1rem', backgroundColor: '#4299e1', color: 'white', fontWeight: 'bold', padding: '0.5rem 1rem', borderRadius: '0.25rem', cursor: 'pointer' }}
        onClick={() => dispatch(toggleNewTicketModal())}
      >
        + New
      </button>
    </div>
  );
};

export default Column;
