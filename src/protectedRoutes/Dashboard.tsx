import React from 'react';
import { logout } from './../redux/authSlice';
import { useAppDispatch } from './../hooks/useAppDispatch';
import { useAppSelector } from './../hooks/useAppSelector';
import PaymentPage from './../protectedRoutes/PaymentPage';
import { Link } from 'react-router-dom';
import AirtimeResponse from './../protectedRoutes/AirtimeResponse'


const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <section className="flex w-[100%] justify-center mt-[.8em] items-start overflow-hidden bg-gray-100">
      {!isLoggedIn ? (
        <>
          {/* Sidebar */}
          <aside className="w-[15%] max-md:w-[30%] max-sm:w-[29%] px-[.5em] bg-white shadow-lg">
            <section className="p-[.4em] w-[95%] max-sm:w-[95%] max-md:w-[95%] mt-[.5em] border-t-[.3em] border-r-[.3em] border-l-[.3em] border-b-[.3em]">
              <img src="./images/airtimelogo.webp" className="text-lg w-[100%] h-[6em]  object-fit  font-bold"/>
            </section>
            <nav className="px-[.3em] py-[.5em] mt-[.5em]">
              <ul className="space-y-4 max-md:mt-[.7em] mt-[1.1em]">
                <li>
                  <a href="#" className="block border-l-[.3em] border-r-[.3em] py-2 px-4 rounded-md hover:bg-gray-200 transition">
                    Overview
                  </a>
                </li>
                <li>
                <Link className=" block border-l-[.3em] border-r-[.3em]  py-2 px-4 rounded-md hover:bg-gray-200 transition" to="/profile">Profile</Link>
                </li>
                <li>
                  <a href="#" className="block border-l-[.3em] border-r-[.3em]  py-2 px-4 rounded-md hover:bg-gray-200 transition">
                    Settings
                  </a>
                </li>
                <li>
                  <button onClick={handleLogout} className="block border-l-[.3em] max-sm:w-[100%] text-left w-[100%] border-r-[.3em]  py-2 px-4 rounded-md hover:bg-gray-200 transition">
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 w-[100%] mr-[1.5em]">
            <header className="flex justify-between items-center mb-[.5em]">
              <h1 className="text-2xl ml-[2em] w-[50%] font-bold text-center text-gray-800">Welcome Back!</h1>
               {!isLoggedIn ?
              <section className="flex gap-[3em] w-[20%] max-md:w-[60%] max-md:gap-[.5em] justify-start">
                <Link className=" text-center w-[100%] max-md:w-[90%] ml-[auto] mt-[2em]  max-md:mt-[.5em] max-md:py-[.2em] max-md:px-[.2em]  p-[.2em] font-semibold rounded-[1em] text-[#f1fffc] border-solid bg-[#736dff] max-md:text-[.9em] max-sm:text-[.8em]  text-[1.2rem]" to="/authenticate">Login</Link>
                <Link className=" text-center w-[100%] max-md:w-[90%] mt-[2em] mr-[.5em] max-md:mt-[.5em] max-md:py-[.2em] max-md:px-[.2em]  p-[.2em] font-semibold rounded-[1em] text-[#f1fffc] border-solid bg-[#736dff] max-md:text-[.9em] max-sm:text-[.8em] text-[1.2rem]" to="/signup">Signup</Link>
              </section> : <div> </div>}
          {/* Sidebar */}
            </header>

            {/* Cards */}
            <section className=" flex max-sm:gap-[1em] max-md:flex-col-reverse items-center max-md:items-start gap-[1em] max-md:gap-[.5em] max-md:mt-[1em] max-md:ml-[1em]">
            <section className=" bg-white w-[40%] max-md:w-[90%] max-sm:w-[100%] text-left shadow rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800"><AirtimeResponse/></h3>
              </section>
              <section className=" bg-white shadow rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800"><PaymentPage/></h3>
              </section>
            </section>
          </main>
        </>
      ) : (
        <h3>You need to login to be a user.</h3>
      )}
    </section>
  );
};

export default Dashboard;
