import React, { FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './../redux/rootReducer';
import {login } from './../redux/fetchData';
import { useAppDispatch } from './../hooks/useAppDispatch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';



export const LoginComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const { token, loading, error } = useSelector((state: RootState) => state.auth);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 

    const form = event.target as HTMLFormElement;
    const username = (form.elements.namedItem("username") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      await dispatch(login({ username, password })).unwrap();
    } catch (err) {
      console.error(err);
    }
  };


 
  
  return (
    <section className="overflow-hidden max-md:w-[98%]">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!token ? (
        
  <form className="flex flex-col  gap-[1em] max-md:gap-[.3em]" onSubmit={handleLogin}>
  <label className="text-[1.3rem] max-md:text-[1rem] mt-[1.1em] flex flex-col max-md:gap-[.3em] gap-[.7em]" >
    Username
    <input
    className="w-[60%] max-md:w-[90%] rounded-[.1em]  p-[.3em] border-[.2em] border-solid bg-[#f1fffc] border-[#f1fffc]"
    type="text"
    name="username"
    placeholder="Enter your Username"
    required
  />
  </label>
  
  
  <label className="text-[1.3rem] relative flex flex-col gap-[.7em] max-md:gap-[.5em]" >
    Password
    <input
    className="w-[60%] max-md:w-[90%] rounded-[.1em] p-[.3em] border-[.2em] border-solid  bg-[#f1fffc] border-[#f1fffc]"
    type={showPassword ? 'text' : 'password'}
    name="password"
    placeholder="Enter your Password"
    required
  />
   <FontAwesomeIcon
        icon={showPassword ? faEyeSlash : faEye}
        onClick={togglePasswordVisibility}
        className="flex max-md:hidden"
        style={{
          position: 'absolute',
          right: '16em',
          top: '71%',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
        }}
      />
      <FontAwesomeIcon
        icon={showPassword ? faEyeSlash : faEye}
        onClick={togglePasswordVisibility}
        className="hidden max-md:flex"
        style={{
          position: 'absolute',
          right: '4em',
          top: '72%',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
        }}
      />
      
  </label>
  
  
  <button
    className="ml-[4em] max-md:mt-[1.5em] max-md:ml-[3em] text-center font-bold rounded-[1em] max-md:p-[.4em] text-[1.7rem] max-md:text-[1rem] text-[#f1fffc] border-solid bg-[#1f1915] w-[30%] max-md:w-[70%]"
    type="submit"
  >
    Login
  </button>
</form>       
      ) : (
       <h3>You are logged in</h3>
      )}
    </section>
  );
};

export default LoginComponent;

