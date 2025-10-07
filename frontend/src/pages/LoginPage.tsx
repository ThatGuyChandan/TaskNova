import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSendOTP = async () => {
    try {
      await axiosInstance.post('/auth/send-otp', { email });
      setStep(2);
    } catch (error) {
      console.error('Error sending OTP', error);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await axiosInstance.post('/auth/verify-otp', { email, otp });
      dispatch(loginSuccess({ token: response.data.token, user: response.data.user }));
      navigate('/dashboard');
    } catch (error) {
      console.error('Error verifying OTP', error);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        {step === 1 ? (
          <div style={{ backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0, 0,0, 0.1)', borderRadius: '0.5rem', padding: '1.5rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', color: '#4a5568', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }} htmlFor="email">
                Email
              </label>
              <input
                style={{ boxShadow: '0 1px 3px rgba(0, 0,0, 0.1)', appearance: 'none', border: '1px solid #e2e8f0', borderRadius: '0.25rem', width: '100%', padding: '0.5rem 0.75rem', color: '#4a5568', lineHeight: '1.25', outline: 'none' }}
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <button
                style={{ backgroundColor: '#4299e1', color: 'white', fontWeight: 'bold', padding: '0.5rem 1rem', borderRadius: '0.25rem', outline: 'none', cursor: 'pointer' }}
                type="button"
                onClick={handleSendOTP}
              >
                Send OTP
              </button>
            </div>
          </div>
        ) : (
          <div style={{ backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0, 0,0, 0.1)', borderRadius: '0.5rem', padding: '1.5rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', color: '#4a5568', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }} htmlFor="otp">
                OTP
              </label>
              <input
                style={{ boxShadow: '0 1px 3px rgba(0, 0,0, 0.1)', appearance: 'none', border: '1px solid #e2e8f0', borderRadius: '0.25rem', width: '100%', padding: '0.5rem 0.75rem', color: '#4a5568', lineHeight: '1.25', outline: 'none' }}
                id="otp"
                type="text"
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <button
                style={{ backgroundColor: '#4299e1', color: 'white', fontWeight: 'bold', padding: '0.5rem 1rem', borderRadius: '0.25rem', outline: 'none', cursor: 'pointer' }}
                type="button"
                onClick={handleVerifyOTP}
              >
                Verify OTP
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
