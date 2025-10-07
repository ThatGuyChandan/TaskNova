import { useSelector } from 'react-redux';

const NotificationDropdown = () => {
  const { notifications } = useSelector((state) => state.notifications);

  return (
    <div style={{ position: 'absolute', right: 0, marginTop: '0.5rem', width: '20rem', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
      <div style={{ padding: '0.5rem 0' }}>
        <h3 style={{ paddingLeft: '1rem', fontWeight: 'bold', fontSize: '1.125rem' }}>Notifications</h3>
        <ul style={{ divideY: '1px solid #e2e8f0' }}>
          {notifications.map((notification) => (
            <li key={notification._id} style={{ padding: '0.75rem 1rem' }}>
              <p style={{ fontSize: '0.875rem', color: '#4a5568' }}>{notification.message}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NotificationDropdown;
