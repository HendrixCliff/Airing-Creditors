import React, { useState } from 'react';
import { useAppDispatch } from './../hooks/useAppDispatch'; 
import { useSelector } from 'react-redux';
import { signup } from './../redux/fetchData'; 
import { RootState } from './../redux/rootReducer'; 
import { Link } from 'react-router-dom';

export const SignUpComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { token, loading, error } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    country: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUp = async () => {
    try {
      await dispatch(signup(formData)).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!token ? (
        <form className="ml-[40em] grid-col-3 flex flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignUp();
          }}>
            <label className="flex flex-col gap-[.5em]" >
            <h3 className="text-[1.4rem]">Username</h3>
              <input
              className="w-[70%] p-[.4em] rounded-[.1em]  border-[.2em] border-solid bg-[#f1fffc] border-[#f1fffc]"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
              />
            </label>
          
            <label className="flex flex-col gap-[.5em]">
              <h3 className="text-[1.4rem]">Email</h3>
              <input
              className="w-[70%] p-[.4em] rounded-[.1em] border-[.2em] border-solid bg-[#f1fffc] border-[#f1fffc]"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="youremail@gmail.com"
                required
              />
            </label>
          
            <label className="flex flex-col gap-[.5em]">
            <h3 className="text-[1.4rem]">Password</h3>
              <input
              className="w-[70%] p-[.4em] rounded-[.1em] border-[.2em] border-solid bg-[#f1fffc] border-[#f1fffc]"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </label>
          
            <label className="flex flex-col gap-[.5em]">
            <h3 className="text-[1.4rem]">Confirm Password</h3>
              <input
              className="w-[70%] rounded-[.1em]  p-[.4em] border-[.2em] border-solid bg-[#f1fffc] border-[#f1fffc]"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
              />
            </label>
          
            <label className="flex flex-col gap-[.5em]">
            <h3 className="text-[1.4rem]">Phone Number</h3>
              <input
              className="w-[70%] p-[.4em] rounded-[.1em]  border-[.2em] border-solid bg-[#f1fffc] border-[#f1fffc]"
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                required
              />
            </label>
          
            <label className="flex flex-col gap-[.5em]">
            <h3 className="text-[1.4rem]">Country</h3>
              <input
              className="w-[70%] p-[.4em] rounded-[.1em] border-[.2em] border-solid bg-[#f1fffc] border-[#f1fffc]"
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
                required
              />
            </label>
          <button type="submit" className="text-center ml-[7em] p-[.2em] font-bold rounded-[1em] text-[#f1fffc] border-solid bg-[#1f1915] w-[30%] text-[1.4rem]">Sign Up</button>
        </form>
      ) : (<h3>You are logged in</h3>)}
      <section className="flex  ml-[23em] mt-[1em] justify-around text-[1.3rem]">
        <h3>Have an account?</h3>
         <Link to="/authenticate">Login</Link>
      </section>
      
    </section>
  );
};

export default SignUpComponent;
