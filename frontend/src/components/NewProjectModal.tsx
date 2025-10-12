import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProject } from '../redux/projectsSlice';
import styles from './NewProjectModal.module.css';

const NewProjectModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    dispatch(createProject({ name, description }));
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3 className={`${styles.modalTitle} word-break-wrap`}>Create New Project</h3>
        </div>
        <div className={styles.modalBody}>
          <label className={styles.label} htmlFor="projectName">Project Name</label>
          <input
            id="projectName"
            type="text"
            className={styles.input}
            placeholder="Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className={styles.label} htmlFor="projectDescription">Project Description</label>
          <textarea
            id="projectDescription"
            className={`${styles.input} ${styles.textarea}`}
            placeholder="Project Description"
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

export default NewProjectModal;
