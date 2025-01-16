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
    dispatch(resetPassword({ password, confirmPassword }));
  };

  const handleClearMessages = () => {
    dispatch(clearAuthMessages());
  };

  return (
    <section  className="ml-[40em] max-md:ml-[1em] mt-[9em] max-md:mt-[6em] flex flex-col overflow-hidden">
      <h2 className="text-[1.6rem] max-md:text-[1.8rem] max-md:text-center max-md:w-[70%]">Reset Password</h2>
      <form onSubmit={handleSubmit}>
          <label className="flex flex-col gap-[.5em] relative">
         <h3 className="max-md:text-[1.2rem] text-[1.8rem]"> New Password </h3>
          <input
             type={showPassword ? 'text' : 'password'}
            className="w-[50%] p-[.4em] max-md:w-[90%]  rounded-[.1em] border-[.2em] border-solid bg-[#f1fffc] border-[#f1fffc]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            required
          />
    <FontAwesomeIcon
      icon={showPassword ? faEyeSlash : faEye}
      onClick={togglePasswordVisibility}
      className="flex max-md:hidden"
      style={{
        position: 'absolute',
        right: '5.9em',
        top: '38%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
      }}
    /><FontAwesomeIcon
      icon={showPassword ? faEyeSlash : faEye}
      onClick={togglePasswordVisibility}
      className="hidden max-md:flex "
      style={{
        position: 'absolute',
        right: '5.9em',
        top: '68%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
      }}
    />
      </label>
          <label className="flex flex-col gap-[.5em] relative">
           <h3 className="text-[1.4rem] max-md:text-[1.2rem]"> Confirm New Password </h3>
          <input
             type={showPasswordAgain ? 'text' : 'password'}
              className="w-[50%] max-md:w-[90%] p-[.4em] rounded-[.1em] border-[.2em] border-solid bg-[#f1fffc] border-[#f1fffc]"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm New Password"
            required
          />
            <FontAwesomeIcon
          icon={showPasswordAgain ? faEyeSlash : faEye}
          onClick={togglePasswordVisibilityAgain}
          className="flex max-md:hidden"
          style={{
            position: 'absolute',
            right: '6em',
            top: '59%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
          }}
         />
           <FontAwesomeIcon
          icon={showPasswordAgain ? faEyeSlash : faEye}
          onClick={togglePasswordVisibilityAgain}
          className="hidden max-md:flex"
          style={{
            position: 'absolute',
            right: '6em',
            top: '73%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
          }}
         />
          </label>
        <button type="submit"  className="text-center ml-[3em] max-md:w-[70%] mt-[1em]
         p-[.2em] font-bold rounded-[1em] text-[#f1fffc] border-solid
          bg-[#1f1915] max-md:mt-[1.4em] w-[30%] text-[1.4rem]" disabled={loading}>
          {loading ? 'Loading...' : 'Reset Password'}
        </button>
        <Link to="/authenticate" className="flex text-[1.3rem] max-md:mt-[1.2em] items-center font-semibold">< TiArrowBack size={20}/>Back to Login</Link>
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
