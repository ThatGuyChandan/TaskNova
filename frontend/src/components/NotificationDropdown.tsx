import { useSelector } from 'react-redux';
import styles from './NotificationDropdown.module.css';
import { RootState } from '../redux/store';

const NotificationDropdown = ({ show }) => {
  const { notifications } = useSelector((state: RootState) => state.notifications);

  if (!show) {
    return null;
  }

  return (
    <div className={styles.dropdown}>
      <div className={styles.header}>
        <h3 className={styles.title}>Notifications</h3>
      </div>
      <ul className={styles.list}>
        {notifications.map((notification) => (
          <li key={notification._id} className={styles.item}>
            <p className={styles.message}>{notification.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationDropdown;
