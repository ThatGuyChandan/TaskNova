import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSuperuserModal, toggleSuperUserAPI } from '../redux/uiSlice';

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
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', overflowY: 'auto', height: '100%', width: '100%' }}>
          <div style={{ position: 'relative', top: '5rem', margin: 'auto', padding: '1.25rem', border: '1px solid #e2e8f0', width: '24rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '0.375rem', backgroundColor: 'white' }}>
            <div style={{ marginTop: '0.75rem', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.125rem', lineHeight: '1.75rem', fontWeight: '500', color: '#1a202c' }}>Enter Super-user Password</h3>
              <div style={{ marginTop: '0.5rem', padding: '0.75rem 1.75rem' }}>
                <input
                  type="password"
                  style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', appearance: 'none', border: '1px solid #e2e8f0', borderRadius: '0.25rem', width: '100%', padding: '0.5rem 0.75rem', color: '#4a5568', lineHeight: '1.25', outline: 'none' }}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', padding: '1rem 1rem' }}>
                <button
                  style={{ padding: '0.5rem 1rem', backgroundColor: '#4299e1', color: 'white', fontSize: '1rem', fontWeight: '500', borderRadius: '0.375rem', width: '100%', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', cursor: 'pointer' }}
                  onClick={handleToggle}
                >
                  Enter
                </button>
                <button
                  style={{ marginTop: '0.5rem', padding: '0.5rem 1rem', backgroundColor: '#e2e8f0', color: '#4a5568', fontSize: '1rem', fontWeight: '500', borderRadius: '0.375rem', width: '100%', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', cursor: 'pointer' }}
                  onClick={() => dispatch(toggleSuperuserModal())}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SuperuserModal;
