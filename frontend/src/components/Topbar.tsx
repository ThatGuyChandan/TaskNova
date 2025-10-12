import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSuperuserModal, toggleNewProjectModal, disableSuperuserAPI } from '../redux/uiSlice';
import NotificationDropdown from './NotificationDropdown';
import styles from './Topbar.module.css';
import { RootState } from '../redux/store';

const Topbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { superUserToggle } = useSelector((state: RootState) => state.ui);
  const { activeProject } = useSelector((state: RootState) => state.projects);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSuperuserToggle = () => {
    if (superUserToggle) {
      dispatch(disableSuperuserAPI());
    } else {
      dispatch(toggleSuperuserModal());
    }
  };

  return (
    <header className={styles.topbar}>
      <div className={styles.title}>{activeProject?.name || 'Dashboard'}</div>
      <div className={styles.actions}>
        <button className={styles.newProjectButton} onClick={() => dispatch(toggleNewProjectModal())}>+ New Project</button>
        <div style={{ position: 'relative' }}>
          <button className={styles.iconButton} onClick={() => setShowNotifications(!showNotifications)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          </button>
          <NotificationDropdown show={showNotifications} />
        </div>
        <button className={styles.superuserButton} onClick={handleSuperuserToggle}>
            {superUserToggle ? 'Superuser: ON' : 'Superuser: OFF'}
          </button>
      </div>
    </header>
  );
};

export default Topbar;