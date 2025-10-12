import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSuperuserModal, enableSuperuserAPI } from '../redux/uiSlice';
import styles from './SuperuserModal.module.css';
import { RootState } from '../redux/store';

const SuperuserModal = () => {
  const dispatch = useDispatch();
  const { superuserModal } = useSelector((state: RootState) => state.ui);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Clear state when modal is closed
  useEffect(() => {
    if (!superuserModal) {
      setPassword('');
      setError('');
    }
  }, [superuserModal]);

  const handleToggle = async () => {
    setError('');
    try {
      await dispatch(enableSuperuserAPI(password)).unwrap();
      // The modal will be closed by the fulfilled reducer
    } catch (err) {
      setError('Incorrect password or insufficient permissions.');
      console.error('Failed to toggle super-user mode:', err);
    }
  };

  const handleCancel = () => {
    dispatch(toggleSuperuserModal());
  };

  return (
    <>
      {superuserModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3 className={`${styles.modalTitle} word-break-wrap`}>Enter Super-user Password</h3>
            </div>
            <div className={styles.modalBody}>
              <label className={styles.label} htmlFor="superuserPassword">Password</label>
              <input
                id="superuserPassword"
                type="password"
                className={styles.input}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
              />
              {error && <p className={styles.errorText}>{error}</p>}
            </div>
            <div className={styles.modalFooter}>
              <button
                className={`${styles.button} ${styles['button-secondary']}`}
                onClick={handleCancel}
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