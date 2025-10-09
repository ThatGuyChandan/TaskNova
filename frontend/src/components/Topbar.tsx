import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSuperuserModal, toggleNewProjectModal } from '../redux/uiSlice';
import NotificationDropdown from './NotificationDropdown';
import styles from './Topbar.module.css';

const Topbar = () => {
  const dispatch = useDispatch();
  const { superUserToggle } = useSelector((state) => state.ui);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className={styles.topbar}>
      <div className={styles.title}>Page Title</div>
      <div className={styles.actions}>
        <button className={styles.newProjectButton} onClick={() => dispatch(toggleNewProjectModal())}>+ New Project</button>
        <button className={styles.button}>Filter</button>
        <button className={styles.button}>Sort</button>
        <button className={styles.button}>Options</button>
        <button className={styles.iconButton}>
          <span role="img" aria-label="bell">🔔</span>
        </button>
        <button className={styles.superuserButton} onClick={() => dispatch(toggleSuperuserModal())}>Superuser</button>
      </div>
    </header>
  );
};

export default Topbar;
