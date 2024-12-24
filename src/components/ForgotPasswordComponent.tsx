import React, { useState } from 'react';
import { useAppDispatch} from './../hooks/useAppDispatch'; 
import { useAppSelector } from './../hooks/useAppSelector';
import { forgotPassword } from './../redux/fetchData';
import { Link } from 'react-router-dom'
import { TiArrowBack } from 'react-icons/ti';

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
    <form  className="ml-[40em]  max-md:ml-[1em] mt-[14em] max-md:mt-[10em]  flex flex-col">
      <label className="flex flex-col gap-[.5em]" >
      <h3 className="text-[1.6rem] font-semibold">Forgot Password?</h3>
      <h3 className="text-[1.4rem]">No worries, we'll send you a reset instructions.</h3>
      <input
        className="w-[70%] max-md:w-[90%] p-[.4em] rounded-[.1em] border-[.2em] border-solid bg-[#f1fffc] border-[#f1fffc]"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      </label>
     <Link to="/reset-password"> <button type="submit" className="text-center ml-[7em] max-md:ml-[2.5em] max-md:w-[70%] p-[.2em] mt-[1em] font-bold rounded-[1em] text-[#f1fffc] border-solid bg-[#1f1915] w-[30%] text-[1.4rem]" onClick={handleForgotPassword} disabled={loading}>
        {loading ? 'sending...' : 'send reset link'}
      </button>
     </Link>
      {error && <p className="text-[red]">{error}</p>}
      {forgotPasswordMessage && <p style={{ color: 'green' }}>{forgotPasswordMessage}</p>}
     <Link to="/authenticate" className="flex align-middle items-center text-[1.3rem] font-semibold">< TiArrowBack size={20}/><h3>Back to Login</h3></Link>
    </form>
  );
};

export default ForgotPasswordComponent;
