import React, { useState } from 'react';
import { useAppDispatch} from './../hooks/useAppDispatch';
import { useAppSelector} from './../hooks/useAppSelector'; 
import { resetPassword } from './../redux/fetchData'; 
import { clearAuthMessages } from './../redux/authSlice';
import { Link } from 'react-router-dom' 
import { TiArrowBack } from 'react-icons/ti';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const ResetPassword = () => {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
   const [showPassword, setShowPassword] = useState(false);
    const [showPasswordAgain, setShowPasswordAgain] = useState(false)
  const dispatch = useAppDispatch()
  const { loading, successMessage, errorMessage } = useAppSelector((state) => state.auth);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibilityAgain = () => {
  setShowPasswordAgain(!showPasswordAgain)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(resetPassword({ token, password, confirmPassword }));
  };

  const handleClearMessages = () => {
    dispatch(clearAuthMessages());
  };

  return (
    <section  className="ml-[40em] mt-[9em]  flex flex-col">
      <h2 className="text-[1.6rem]">Reset Password</h2>
      <form onSubmit={handleSubmit}>
      <label className="flex flex-col gap-[.5em]">
       <h3 className="text-[1.4rem]">Token</h3>
          <input
             type="text"
            className="w-[50%] p-[.4em] rounded-[.1em] border-[.2em] border-solid bg-[#f1fffc] border-[#f1fffc]"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
          />
          </label>
          <label className="flex flex-col gap-[.5em]">
         <h3> New Password </h3>
          <input
             type={showPassword ? 'text' : 'password'}
            className="w-[50%] p-[.4em] rounded-[.1em] border-[.2em] border-solid bg-[#f1fffc] border-[#f1fffc]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            required
          />
      <FontAwesomeIcon
      icon={showPassword ? faEyeSlash : faEye}
      onClick={togglePasswordVisibility}
      style={{
        position: 'absolute',
        right: '23.9em',
        top: '53%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
      }}
    />
      </label>
          <label className="flex flex-col gap-[.5em]">
           <h3 className="text-[1.4rem]"> Confirm New Password </h3>
          <input
             type={showPasswordAgain ? 'text' : 'password'}
              className="w-[50%] p-[.4em] rounded-[.1em] border-[.2em] border-solid bg-[#f1fffc] border-[#f1fffc]"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm New Password"
            required
          />
            <FontAwesomeIcon
          icon={showPasswordAgain ? faEyeSlash : faEye}
          onClick={togglePasswordVisibilityAgain}
          style={{
            position: 'absolute',
            right: '24em',
            top: '66%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
          }}
         />
          </label>
        <button type="submit"  className="text-center ml-[3em] mt-[1em]
         p-[.2em] font-bold rounded-[1em] text-[#f1fffc] border-solid
          bg-[#1f1915] w-[30%] text-[1.4rem]" disabled={loading}>
          {loading ? 'Loading...' : 'Reset Password'}
        </button>
        <Link to="/authenticate" className="flex">< TiArrowBack size={20}/>Back to Login</Link>
      </form>
      {successMessage && (
        <div>
          <p>{successMessage}</p>
          <button onClick={handleClearMessages}>Clear</button>
        </div>
      )}
      {errorMessage && (
        <div>
          <p>{errorMessage}</p>
          <button onClick={handleClearMessages}>Clear</button>
        </div>
      )}
    </section>
  );
};

export default ResetPassword;
