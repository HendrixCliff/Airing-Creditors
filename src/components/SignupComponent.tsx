import React, { useState } from 'react';
import { useAppDispatch } from './../hooks/useAppDispatch'; 
import { useSelector } from 'react-redux';
import { signup } from './../redux/fetchData'; 
import { RootState } from './../redux/rootReducer'; 
import { Link,  useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FaArrowLeftLong} from "react-icons/fa6"

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
    <section>
      <Link to="/"><FaArrowLeftLong size={25}/></Link>
      <section className="overflow-hidden flex max-md:flex-col gap-[2em] max-md:gap-[.1em]">
        <img className="w-[54%] max-md:w-[100%] max-md:m-[.2em] object-cover h-[37em] max-md:h-[20em]" src="/images/wild.webp"/>
     <section className="w-[46%] max-md:w-[100%] ml-[4em] ">
     {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!token ? (
        <form className=" w-[80%] mt-[.1em]  flex flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignUp();
          }}>
            <label className="flex flex-col gap-[.5em] max-md-gap-[.1em]" >
            <h3 className="text-[1.2rem]  max-md:text-[1.2rem] text-semibold">Username</h3>
              <input
              className="w-[100%] max-md:w-[95%] p-[.4em] rounded-[.1em]  border-[.2em] border-solid bg-[#f1fffc] border-[#f1fffc]"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
              />
            </label>
          
            <label className="flex flex-col gap-[.5em] max-md:gap-[.1em]">
              <h3 className="text-[1.2rem]  max-md:text-[1.2rem] text-semibold">Email</h3>
              <input
                className="w-[100%] max-md:w-[95%] p-[.8em] rounded-[.1em] border-[.2em] border-solid bg-[#f1fffc] border-[#f1fffc]"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="youremail@gmail.com"
                required
              />
            </label>
          
            <label className="flex flex-col gap-[.5em] relative max-md:gap-[.1em]">
            <h3 className="text-[1.2rem] max-md:text-[1.2rem] text-semibold">Password</h3>
              <input
              className="w-[100%] max-md:w-[95%] relative p-[.7em] rounded-[.1em] border-[.2em] border-solid bg-[#f1fffc] border-[#f1fffc]"
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
                        right: '2em',
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
            <h3 className="text-[1.2rem] max-md:text-[1.2rem] text-semibold">Confirm Password</h3>
              <input
              className="w-[100%] rounded-[.1em] max-md:w-[95%]  p-[.4em] border-[.2em] border-solid bg-[#f1fffc] border-[#f1fffc]"
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
                        right: '2em',
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
            <h3 className="text-[1.2rem]  max-md:text-[1.2rem] text-semibold">Phone Number</h3>
              <input
              className="w-[100%] max-md:w-[95%] p-[.4em] roun7ed-[.1em]  border-[.2em] border-solid bg-[#f1fffc] border-[#f1fffc]"
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                required
              />
            </label>
          
            <label className="flex flex-col gap-[.5em] max-md:gap-[.1em]">
            <h3 className="text-[1.2rem]  max-md:text-[1.2rem] text-semibold">Country</h3>
              <input
              className="w-[100%] max-md:w-[95%] p-[.4em] roun7ed-[.1em] border-[.2em] border-solid bg-[#f1fffc] border-[#f1fffc]"
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
                required
              />
            </label>
          <button type="submit" className=" ml-[auto] mr-[auto] mt-[.1em] max-md:w-[50%] max-md:mt-[.5em] max-md:py-[.2em] max-md:px-[2em] p-[.2em] font-bold rounded-[1em] text-[#f1fffc] border-solid bg-[#1f1915] w-[50%] text-[1.4rem]">Sign Up</button>
        </form>
      ) : (<h3>You are logged in</h3>)}
      <section className="flex  justify-between  max-md:ml-[2em] max-md:w-[80%] max-md:mt-[.5em] mt-[.1em]  max-md:text-[1.1rem] text-[1.3rem]">
        <h3>Have an account?</h3>
        <Link className="mr-[6em]" to="/authenticate">Login</Link>
      </section>
     </section>
     
    </section>
    </section>
    
  )}