import React, { useState } from 'react';
import { useAppDispatch} from './../hooks/useAppDispatch'; 
import { useAppSelector } from './../hooks/useAppSelector';
import { forgotPassword } from './../redux/fetchData';

const ForgotPasswordComponent: React.FC = () => {
  const [email, setEmail] = useState('');
  const dispatch = useAppDispatch();
  const { loading, error, forgotPasswordMessage } = useAppSelector((state) => state.auth);

  const handleForgotPassword = async () => {
    try {
      await dispatch(forgotPassword({ email })).unwrap();
    } catch (err) {
      console.error('Forgot password failed:', err);
    }
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleForgotPassword} disabled={loading}>
        {loading ? 'Sending...' : 'Send Reset Link'}
      </button>
      {error && <p className="text-[red]">{error}</p>}
      {forgotPasswordMessage && <p style={{ color: 'green' }}>{forgotPasswordMessage}</p>}
    </div>
  );
};

export default ForgotPasswordComponent;
