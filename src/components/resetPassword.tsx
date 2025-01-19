import React, { useState } from 'react';
import { useAppDispatch } from './../hooks/useAppDispatch';
import { useAppSelector } from './../hooks/useAppSelector';
import { resetPassword } from './../redux/fetchData';
import { clearAuthMessages } from './../redux/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { TiArrowBack } from 'react-icons/ti';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FaArrowLeftLong } from 'react-icons/fa6';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);

  const dispatch = useAppDispatch();
  const { loading, successMessage, errorMessage } = useAppSelector((state) => state.auth);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibilityAgain = () => {
    setShowPasswordAgain(!showPasswordAgain);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(resetPassword({ password, confirmPassword }));
  };

  const handleClearMessages = () => {
    dispatch(clearAuthMessages());
  };

  return (
    <section>
      {/* Navigate Back */}
      <section onClick={() => { handleClearMessages(); navigate(-1); }} style={{ cursor: 'pointer' }}>
        <FaArrowLeftLong size={25} />
      </section>

      {/* Form Section */}
      <section className="flex max-md:flex-col">
        <img
          className="w-[56%] max-md:w-[100%] max-md:m-[.2em] object-cover h-[38em] max-md:h-[20em]"
          src="/images/nature.webp"
          alt="Nature"
        />
        <section className="max-md:ml-[1em] max-md:w-[100%] w-[44%] max-md:mt-[1em] ml-[8em] mt-[9em] flex flex-col overflow-hidden">
          <h2 className="text-[1.6rem] max-md:text-[1.8rem] max-md:text-center max-md:w-[70%]">
            Reset Password
          </h2>
          <form onSubmit={handleSubmit}>
            {/* New Password */}
            <label className="flex flex-col gap-[.5em] relative">
              <h3 className="max-md:text-[1.2rem] text-[1.4rem]">New Password</h3>
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-[80%] p-[.4em] max-md:w-[90%] rounded-[.1em] border-[.2em] border-solid bg-[#f1fffc] border-[#f1fffc]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New Password"
                aria-label="New Password"
                required
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                onClick={togglePasswordVisibility}
                className="absolute flex max-md:hidden right-[9em] top-[80%] transform -translate-y-1/2 cursor-pointer"
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                onClick={togglePasswordVisibility}
                className="absolute hidden max-md:flex right-[5em] top-[70%] transform -translate-y-1/2 cursor-pointer"
              />
            </label>

            {/* Confirm Password */}
            <label className="flex flex-col gap-[.5em] relative">
              <h3 className="text-[1.4rem] max-md:text-[1.2rem]">Confirm New Password</h3>
              <input
                type={showPasswordAgain ? 'text' : 'password'}
                className="w-[80%] max-md:w-[90%] p-[.4em] rounded-[.1em] border-[.2em] border-solid bg-[#f1fffc] border-[#f1fffc]"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm New Password"
                aria-label="Confirm Password"
                required
              />
              <FontAwesomeIcon
                icon={showPasswordAgain ? faEyeSlash : faEye}
                onClick={togglePasswordVisibilityAgain}
                className="absolute flex max-md:hidden right-[9em] top-[80%] transform -translate-y-1/2 cursor-pointer"
              />
               <FontAwesomeIcon
                icon={showPasswordAgain ? faEyeSlash : faEye}
                onClick={togglePasswordVisibilityAgain}
                className="absolute hidden max-md:flex right-[5em] top-[75%] transform -translate-y-1/2 cursor-pointer"
              />
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="text-center ml-[6em] max-md:ml-[5em] max-md:w-[50%] mt-[1em] p-[.2em] font-bold rounded-[1em] text-[#f1fffc] border-solid bg-[#1f1915] max-md:mt-[1.4em] w-[30%] text-[1.4rem]"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Reset Password'}
            </button>

            {/* Back to Login Link */}
            <Link
              to="/authenticate"
              className="flex text-[1.3rem] max-md:mt-[1.2em] items-center font-semibold"
            >
              <TiArrowBack size={20} />
              Back to Login
            </Link>
          </form>

          {/* Success and Error Messages */}
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
      </section>
    </section>
  );
};

export default ResetPassword;
