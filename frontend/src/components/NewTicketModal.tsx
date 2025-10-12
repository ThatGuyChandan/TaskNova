import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTicket } from '../redux/ticketsSlice';
import styles from './NewTicketModal.module.css';

const NewTicketModal = ({ isOpen, onClose, projectId }) => {
  const dispatch = useDispatch();
  const { newTicketModalStatus } = useSelector((state) => state.ui);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    dispatch(createTicket({ projectId, title, description, status: newTicketModalStatus }));
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3 className={`${styles.modalTitle} word-break-wrap`}>Create New Ticket</h3>
        </div>
        <div className={styles.modalBody}>
          <label className={styles.label} htmlFor="ticketTitle">Ticket Title</label>
          <input
            id="ticketTitle"
            type="text"
            className={styles.input}
            placeholder="Ticket Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className={styles.label} htmlFor="ticketDescription">Ticket Description</label>
          <textarea
            id="ticketDescription"
            className={`${styles.input} ${styles.textarea}`}
            placeholder="Ticket Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={styles.modalFooter}>
          <button
            className={`${styles.button} ${styles['button-secondary']}`}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`${styles.button} ${styles['button-primary']}`}
            onClick={handleSubmit}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewTicketModal;