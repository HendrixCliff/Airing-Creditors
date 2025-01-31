import React, { useState, useEffect } from 'react';
import { logout } from './../redux/authSlice';
import { useAppDispatch } from './../hooks/useAppDispatch';
import { useAppSelector } from './../hooks/useAppSelector';
import { useNavigate, Link } from 'react-router-dom'; // ✅ Added useNavigate
import PaymentPage from './../protectedRoutes/PaymentPage';
import PaymentVerification from './../protectedRoutes/verifyPaymentPage';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './../components/ui/alert-dialog';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // ✅ Initialize navigate function
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setIsDialogOpen(true);
    } else {
      setIsDialogOpen(false);
    }
  }, [isLoggedIn]); // ✅ Removed unnecessary dependency

  return (
    <>
      {!isLoggedIn && (
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogContent className="bg-[#2f5951] text-[#ffb927]">
            <AlertDialogHeader>
              <AlertDialogTitle>You need to be logged in</AlertDialogTitle>
              <AlertDialogDescription>
                You are required to log in before making any payment. Please sign in to continue.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => navigate('/authenticate')}>Login</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      <section className="w-full bg-dashboard-bg bg-cover bg-center bg-no-repeat min-h-screen relative overflow-hidden bg-gray-100">
        <>
          {/* Sidebar */}
          <aside className="w-[15%] absolute left-[1em] max-[720px]:top-[5.8em] max-[600px]:left-[17.8em] max-[720px]:left-[19.8em] max-md:top-[5em] max-md:left-[21em] top-[2em] max-md:w-[30%] max-[720px]:w-[40%]  max-sm:w-[34%] px-[.5em] bg-white shadow-lg">
            <section className="p-[.4em] w-[95%] max-sm:w-[95%] mt-[.5em] border">
              <img
                src="./images/airtimelogo.webp"
                className="w-full h-[9em] max-md:h-[6em] object-cover font-bold"
                alt="Airtime Logo"
              />
            </section>
            <nav className="px-[.3em] py-[.5em] mt-[.5em]">
              <ul className="space-y-4 mt-[1.1em]">
                <li>
                  <a href="#" className="block border-l-[.3em] border-r-[.3em] py-2 px-4 rounded-md hover:bg-gray-200 transition">
                    Overview
                  </a>
                </li>
                <li>
                  {isLoggedIn ? (
                    <Link to="/profile" className="block border-l-[.3em] border-r-[.3em] py-2 px-4 rounded-md hover:bg-gray-200 transition">
                      Profile
                    </Link>
                  ) : (
                    <span className="block border-l-[.3em] border-r-[.3em] py-2 px-4 rounded-md hover:bg-gray-200 transition">
                      Profile
                    </span>
                  )}
                </li>
                <li>
                  {isLoggedIn ? (
                    <Link to="/airtime-response" className="block border-l-[.3em] border-r-[.3em] py-2 px-4 rounded-md hover:bg-gray-200 transition">
                      Transactions
                    </Link>
                  ) : (
                    <span className="block border-l-[.3em] border-r-[.3em] py-2 px-4 rounded-md hover:bg-gray-200 transition">
                      Transactions
                    </span>
                  )}
                </li>
                <li>
                  <a href="#" className="block border-l-[.3em] border-r-[.3em] py-2 px-4 rounded-md hover:bg-gray-200 transition">
                    Settings
                  </a>
                </li>
                <li>
                  <button onClick={handleLogout} className="block w-full text-left border-l-[.3em] border-r-[.3em] py-2 px-4 rounded-md hover:bg-gray-200 transition">
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="w-full max-md:w-full">
            <header className="mb-[.5em]">
              {!isLoggedIn ? (
                <section className="flex gap-[3em] max-md:mt-[1em] w-[20%] max-md:w-[60%] max-md:gap-[.5em] ml-auto">
                  <Link to="/authenticate" className="text-center w-full max-md:w-[90%] ml-auto mt-[2em] p-[.2em] font-semibold rounded-[1em] text-[#f1fffc] bg-[#736dff] max-md:text-[.9em] max-sm:text-[.8em] text-[1.2rem]">
                    Login
                  </Link>
                  <Link to="/signup" className="text-center w-full max-md:w-[90%] ml-auto mt-[2em] mr-[.5em] p-[.2em] font-semibold rounded-[1em] text-[#f1fffc] bg-[#736dff] max-md:text-[.9em] max-sm:text-[.8em] text-[1.2rem]">
                    Signup
                  </Link>
                </section>
              ) : null}
            </header>

            {/* Cards */}
            <section className="flex ml-[16em] max-md:mt-[2em] max-md:w-full mt-[6em] max-md:ml-[.2em] items-start gap-[1em] max-md:flex-col-reverse">
              <section className="bg-white w-[50%] h-[16em] shadow rounded-lg">
                <PaymentVerification />
              </section>
              <section className="bg-white w-[65%] shadow rounded-lg max-md:mt-[.1em]">
                <PaymentPage />
              </section>
            </section>
          </main>
        </>
      </section>
    </>
  );
};

export default Dashboard;
