import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProject } from '../redux/projectsSlice';

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
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', overflowY: 'auto', height: '100%', width: '100%' }}>
      <div style={{ position: 'relative', top: '5rem', margin: 'auto', padding: '1.25rem', border: '1px solid #e2e8f0', width: '24rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '0.375rem', backgroundColor: 'white' }}>
        <div style={{ marginTop: '0.75rem', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.125rem', lineHeight: '1.75rem', fontWeight: '500', color: '#1a202c' }}>Create New Project</h3>
          <div style={{ marginTop: '0.5rem', padding: '0.75rem 1.75rem' }}>
            <input
              type="text"
              style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', appearance: 'none', border: '1px solid #e2e8f0', borderRadius: '0.25rem', width: '100%', padding: '0.5rem 0.75rem', color: '#4a5568', lineHeight: '1.25', outline: 'none' }}
              placeholder="Project Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', appearance: 'none', border: '1px solid #e2e8f0', borderRadius: '0.25rem', width: '100%', padding: '0.5rem 0.75rem', color: '#4a5568', lineHeight: '1.25', outline: 'none', marginTop: '1rem' }}
              placeholder="Project Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', padding: '1rem 1rem' }}>
            <button
              style={{ padding: '0.5rem 1rem', backgroundColor: '#4299e1', color: 'white', fontSize: '1rem', fontWeight: '500', borderRadius: '0.375rem', width: '100%', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', cursor: 'pointer' }}
              onClick={handleSubmit}
            >
              Create
            </button>
            <button
              style={{ marginTop: '0.5rem', padding: '0.5rem 1rem', backgroundColor: '#e2e8f0', color: '#4a5568', fontSize: '1rem', fontWeight: '500', borderRadius: '0.375rem', width: '100%', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', cursor: 'pointer' }}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProjectModal;
