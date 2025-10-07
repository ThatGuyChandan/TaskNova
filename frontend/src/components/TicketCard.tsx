import { useSelector } from 'react-redux';
import { Draggable } from '@hello-pangea/dnd';

const TicketCard = ({ ticket, index }) => {
  const { superUserToggle } = useSelector((state) => state.ui);

  return (
    <Draggable draggableId={ticket.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          style={{ backgroundColor: 'white', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1rem', boxShadow: '0 4px 6px rgba(0, 0,0, 0.1)' }}
        >
          <h3 style={{ fontWeight: 'bold' }}>{ticket.title}</h3>
          <ul style={{ listStyleType: 'disc', marginLeft: '1.25rem' }}>
            {ticket.description.split('\n').map((line, index) => (
              <li key={index}>{line}</li>
            ))}
          </ul>
          {superUserToggle && (
            <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#a0aec0' }}>
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
