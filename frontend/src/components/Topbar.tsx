import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSuperuserModal, toggleNewProjectModal } from '../redux/uiSlice';
import NotificationDropdown from './NotificationDropdown';

const Topbar = () => {
  const dispatch = useDispatch();
  const { superUserToggle } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleToggle = () => {
    if (superUserToggle) {
      dispatch(toggleSuperuserModal());
    } else {
      dispatch(toggleSuperuserModal());
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Kanban Board</h1>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'relative' }}>
          <button onClick={() => setShowNotifications(!showNotifications)} style={{ marginRight: '1rem' }}>
            <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '1.5rem', width: '1.5rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          {showNotifications && <NotificationDropdown />}
        </div>
        <button
          style={{ backgroundColor: superUserToggle ? '#48bb78' : '#e2e8f0', color: '#4a5568', fontWeight: 'bold', padding: '0.5rem 1rem', borderRadius: '0.25rem', marginRight: '0.5rem', cursor: user?.isSuperUser ? 'pointer' : 'not-allowed' }}
          onClick={handleToggle}
          disabled={!user?.isSuperUser}
        >
          Super-user Mode
        </button>
        <button
          style={{ backgroundColor: '#4299e1', color: 'white', fontWeight: 'bold', padding: '0.5rem 1rem', borderRadius: '0.25rem', marginRight: '0.5rem', cursor: 'pointer' }}
          onClick={() => dispatch(toggleNewProjectModal())}
        >
          + New Project
        </button>
        <button
          style={{ backgroundColor: '#e2e8f0', color: '#4a5568', fontWeight: 'bold', padding: '0.5rem 1rem', borderRadius: '0.25rem', marginRight: '0.5rem', cursor: 'pointer' }}
          onClick={() => console.log('Filter button clicked')}
        >
          Filter
        </button>
        <button
          style={{ backgroundColor: '#e2e8f0', color: '#4a5568', fontWeight: 'bold', padding: '0.5rem 1rem', borderRadius: '0.25rem', marginRight: '0.5rem', cursor: 'pointer' }}
          onClick={() => console.log('Sort button clicked')}
        >
          Sort
        </button>
        <button
          style={{ backgroundColor: '#e2e8f0', color: '#4a5568', fontWeight: 'bold', padding: '0.5rem 1rem', borderRadius: '0.25rem', cursor: 'pointer' }}
          onClick={() => console.log('Options button clicked')}
        >
          Options
        </button>
      </div>
    </div>
  );
};

export default Topbar;
