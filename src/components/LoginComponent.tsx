import React, { FormEvent, useState } from 'react';
import { useAppDispatch } from './../hooks/useAppDispatch'
import { useAppSelector } from './../hooks/useAppSelector'
import { login } from '../redux/fetchData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; 

const LoginComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { isLoggedIn, loading, error } = useAppSelector((state) => state.auth);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    // Check if form and its elements are correctly accessed
    const usernameElement = form.elements.namedItem('username') as HTMLInputElement;
    const passwordElement = form.elements.namedItem('password') as HTMLInputElement;

    if (!usernameElement || !passwordElement) {
      console.error('Username or password input not found');
      return;
    }

    const username = usernameElement.value;
    const password = passwordElement.value;

    console.log('Logging in with:', { username, password });

    try {
      await dispatch(login({ username, password })).unwrap();
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <section className="overflow-hidden max-md:w-[99%] mr-[1em]">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!isLoggedIn ? (
        <form className="flex flex-col gap-[1em] max-md:gap-[.3em]" onSubmit={handleLogin}>
          <label className="text-[1.3rem] max-md:text-[1.3rem] mt-[1.1em] flex flex-col max-md:gap-[.3em] gap-[.7em]">
            Username
            <input
              className="w-[100%] max-md:w-[90%] rounded-[.1em] p-[.3em] border-[.2em] border-solid bg-[#f1fffc] border-[#f1fffc]"
              type="text"
              name="username"
              placeholder="Enter your Username"
              required
            />
          </label>

          <label className="text-[1.3rem] relative flex flex-col gap-[.7em] max-md:gap-[.5em]">
            Password
            <input
              className="w-[100%] max-md:w-[90%] rounded-[.1em] p-[.3em] border-[.2em] border-solid bg-[#f1fffc] border-[#f1fffc]"
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
                right: '1em',
                top: '72%',
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
            className="ml-[auto] mr-[auto] max-md:mt-[1.5em]  text-center font-bold rounded-[1em] max-md:p-[.4em] text-[1.7rem] max-md:text-[1rem] text-[#f1fffc] border-solid bg-[#1f1915] w-[50%] max-md:w-[70%]"
            type="submit"
          >
            Login
          </button>
        </form>
      ) : (
        <h3 className="text-[2rem] text-[green]">You are logged in</h3>
      )}
    </section>
  );
};

export default LoginComponent;
