import React, { useState } from 'react';
import { useAppDispatch } from './../hooks/useAppDispatch'; 
import { useSelector } from 'react-redux';
import { signup } from './../redux/fetchData'; 
import { RootState } from './../redux/rootReducer'; 
import { Link,  useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


export const SignUpComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false)
  const { token, loading, error } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    country: ''
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibilityAgain = () => {
  setShowPasswordAgain(!showPasswordAgain)
  }
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
      navigate('/')
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="overflow-hidden">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!token ? (
        <form className="ml-[40em] max-md:ml-[3em]  flex flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignUp();
          }}>
            <label className="flex flex-col gap-[.5em] max-md-gap-[.1em]" >
            <h3 className="text-[1.4rem]  max-md:text-[1.2rem]">Username</h3>
              <input
              className="w-[70%] max-md:w-[95%] p-[.4em] rounded-[.1em]  border-[.2em] border-solid bg-[#f1fffc] border-[#f1fffc]"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
              />
            </label>
          
            <label className="flex flex-col gap-[.5em] max-md:gap-[.1em]">
              <h3 className="text-[1.4rem]  max-md:text-[1.2rem]">Email</h3>
              <input
                className="w-[70%] max-md:w-[95%] p-[.4em] rounded-[.1em] border-[.2em] border-solid bg-[#f1fffc] border-[#f1fffc]"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="youremail@gmail.com"
                required
              />
            </label>
          
            <label className="flex flex-col gap-[.5em] relative max-md:gap-[.1em]">
            <h3 className="text-[1.4rem] max-md:text-[1.2rem]">Password</h3>
              <input
              className="w-[70%] max-md:w-[95%] relative p-[.4em] rounded-[.1em] border-[.2em] border-solid bg-[#f1fffc] border-[#f1fffc]"
              type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
              <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                      onClick={togglePasswordVisibility}
                      className="flex max-md:hidden"
                      style={{
                        position: 'absolute',
                        right: '15em',
                        top: '78%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                      }}
                    />
                    <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    className="hidden max-md:flex"
                    style={{
                      position: 'absolute',
                      right: '4em',
                      top: '69%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                    }}
                    />

            </label>

            <label className="flex flex-col relative gap-[.5em] max-md:gap-[.1em]">
            <h3 className="text-[1.4rem] max-md:text-[1.2rem]">Confirm Password</h3>
              <input
              className="w-[70%] rounded-[.1em] max-md:w-[95%]  p-[.4em] border-[.2em] border-solid bg-[#f1fffc] border-[#f1fffc]"
              type={showPasswordAgain ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
              />
               <FontAwesomeIcon
                      icon={showPasswordAgain ? faEyeSlash : faEye}
                      onClick={togglePasswordVisibilityAgain}
                      className="flex max-md:hidden"
                      style={{
                        position: 'absolute',
                        right: '15em',
                        top: '72%',
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
                        right: '4em',
                        top: '68.5%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                      }}
                    />
            </label>
          
            <label className="flex flex-col gap-[.5em] max-md:gap-[.1em]">
            <h3 className="text-[1.4rem]  max-md:text-[1.2rem]">Phone Number</h3>
              <input
              className="w-[70%] max-md:w-[95%] p-[.4em] rounded-[.1em]  border-[.2em] border-solid bg-[#f1fffc] border-[#f1fffc]"
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                required
              />
            </label>
          
            <label className="flex flex-col gap-[.5em] max-md:gap-[.1em]">
            <h3 className="text-[1.4rem]  max-md:text-[1.2rem]">Country</h3>
              <input
              className="w-[70%] max-md:w-[95%] p-[.4em] rounded-[.1em] border-[.2em] border-solid bg-[#f1fffc] border-[#f1fffc]"
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
                required
              />
            </label>
          <button type="submit" className=" max-md:ml-[4.5em] mt-[2em] max-md:w-[50%] max-md:mt-[.5em] max-md:py-[.2em] max-md:px-[2em] ml-[7em] p-[.2em] font-bold rounded-[1em] text-[#f1fffc] border-solid bg-[#1f1915] w-[30%] text-[1.4rem]">Sign Up</button>
        </form>
      ) : (<h3>You are logged in</h3>)}
      <section className="flex max-md:gap-[6em] justify-around ml-[23em] max-md:ml-[2em] max-md:w-[80%] max-md:mt-[.5em] mt-[.5em]  max-md:text-[1.1rem] text-[1.3rem]">
        <h3>Have an account?</h3>
         <Link to="/authenticate">Login</Link>
      </section>
    </section>
  )}