import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSuperuserModal, toggleSuperUserAPI } from '../redux/uiSlice';
import styles from './SuperuserModal.module.css';

const SuperuserModal = () => {
  const dispatch = useDispatch();
  const { superuserModal } = useSelector((state) => state.ui);
  const [password, setPassword] = useState('');

  const handleToggle = () => {
    dispatch(toggleSuperUserAPI(password));
  };

  return (
    <>
      {superuserModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Enter Super-user Password</h3>
            </div>
            <div className={styles.modalBody}>
              <input
                type="password"
                className={styles.input}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={styles.modalFooter}>
              <button
                className={`${styles.button} ${styles['button-secondary']}`}
                onClick={() => dispatch(toggleSuperuserModal())}
              >
                Cancel
              </button>
              <button
                className={`${styles.button} ${styles['button-primary']}`}
                onClick={handleToggle}
              >
                Enter
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SuperuserModal;
