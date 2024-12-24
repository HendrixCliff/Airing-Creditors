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
    <section className="overflow-hidden">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!token ? (
        
        <form className="flex flex-col  gap-[1em]" onSubmit={handleLogin}>
  <label className="text-[1.3rem] mt-[1.1em] flex flex-col gap-[.7em]" >
    Username
    <input
    className="w-[60%] rounded-[.1em]  p-[.3em] border-[.2em] border-solid bg-[#f1fffc] border-[#f1fffc]"
    type="text"
    name="username"
    placeholder="Enter your Username"
    required
  />
  </label>
  
  
  <label className="text-[1.3rem] flex flex-col gap-[.7em]" >
    Password
    <input
    className="w-[60%] rounded-[.1em] p-[.3em] border-[.2em] border-solid  bg-[#f1fffc] border-[#f1fffc]"
    type={showPassword ? 'text' : 'password'}
    name="password"
    placeholder="Enter your Password"
    required
  />
   <FontAwesomeIcon
        icon={showPassword ? faEyeSlash : faEye}
        onClick={togglePasswordVisibility}
        style={{
          position: 'absolute',
          right: '16em',
          top: '69%',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
        }}
      />
  </label>
  
  
  <button
    className="ml-[4em] text-center font-bold rounded-[1em] text-[1.7rem] text-[#f1fffc] border-solid bg-[#1f1915] w-[30%]"
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

