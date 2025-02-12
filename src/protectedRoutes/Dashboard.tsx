import React, { useState, useEffect } from 'react';
import { logout } from './../redux/authSlice';
import { useAppDispatch } from './../hooks/useAppDispatch';
import { useAppSelector } from './../hooks/useAppSelector';
import { useNavigate, Link, NavLink } from 'react-router-dom'; 
import PaymentPage from './../protectedRoutes/PaymentPage';
import PaymentVerification from './../protectedRoutes/verifyPaymentPage';
import VirtualAccount from './../protectedRoutes/VirtualAccount'
import { useWebhookListener } from "./../hooks/useWebhookListener";
import TransactionAction from './../protectedRoutes/TransactionAction';

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
  const navigate = useNavigate(); 
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // ✅ Define webhookData (fetch from API, state, or use dummy data)
  const webhookData = {
    transactionId: '12345',
    status: 'successful',
  };

  // ✅ Pass webhookData to useWebhookListener
  useWebhookListener(webhookData);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setIsDialogOpen(true);
    } else {
      setIsDialogOpen(false);
    }
  }, [isLoggedIn]);

  return (
    <section className="max-h-full overflow-hidden">
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

      <section className="w-full h-full bg-dashboard-bg bg-cover bg-center max-[500px]:bg-[center] bg-no-repeat min-h-screen relative overflow-hidden bg-gray-100">
        <>
          {/* Sidebar */}
          <aside className="w-[15%] shadow-2xl bg-payment-bg bg-cover bg-center py-[.6em] absolute left-[1em] max-[900px]:left-[] max-[500px]:top-[5em] max-[480px]:top-[6.9] max-[720px]:top-[6.2em] max-[450px]:left-[14.2em] max-[480px]:left-[14.2em] max-[500px]:left-[19.8em] max-[530px]:left-[21.8em]  max-[580px]:left-[24.8em] max-[590px]:left-[25.8em] max-[600px]:left-[19.8em] max-[650px]:left-[29.8em] max-[720px]:left-[29.8em] max-md:top-[5em] max-md:left-[21em] top-[2em] max-md:w-[30%] max-[720px]:w-[40%] max-sm:w-[34%] px-[.5em] bg-white">
            <section className="p-[.4em] w-[95%] bg-[white] max-sm:w-[95%] mt-[.5em]  border">
              <img
                src="./images/airtimelogo.webp"
                className="w-full h-[9em] max-md:h-[6em] object-cover font-bold"
                alt="Airtime Logo"
              />
            </section>
            <nav className="px-[.3em] py-[.5em] bg-[white] mt-[.5em]">
              <ul className="space-y-4 mt-[1.1em]">
                <li>
                  <a href="#" className="block border-l-[.3em] border-r-[.3em] py-2 px-4 rounded-md hover:bg-gray-200 transition">
                    Overview
                  </a>
                </li>
                <li>
                <NavLink 
                  to="/profile" 
                  className="cursor-pointer block border-l-[.3em] border-r-[.3em] py-2 px-4 rounded-md hover:bg-gray-200 transition"
                >
                  Profile
                </NavLink>
              
            </li>

                <li>
                  {isLoggedIn ? (
                    <Link to="/airtime-response" className="block border-l-[.3em] border-r-[.3em] py-2 px-4 rounded-md hover:bg-gray-200 transition">
                      Transactions
                    </Link>
                  ) : (
                    <span className="block border-l-[.3em] border-r-[.3em] py-2 px-4 max-[720px]:px-[.2em] rounded-md hover:bg-gray-200 transition">
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
          <main className="w-full max-md:w-full relative min-h-screen overflow-auto">
  <header className="mb-[.5em]">
    {!isLoggedIn ? (
      <section className="flex gap-[3em] max-md:mt-[1em] w-[20%] max-md:w-[60%] max-md:gap-[.5em] ml-auto">
        <Link
          to="/authenticate"
          className="text-center w-full max-md:w-[90%] ml-auto mt-[2em] p-[.2em] font-semibold rounded-[1em] text-[#f1fffc] bg-[#736dff] max-md:text-[.9em] max-sm:text-[.8em] text-[1.2rem]"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="text-center w-full max-md:w-[90%] ml-auto mt-[2em] mr-[.5em] p-[.2em] font-semibold rounded-[1em] text-[#f1fffc] bg-[#736dff] max-md:text-[.9em] max-sm:text-[.8em] text-[1.2rem]"
        >
          Signup
        </Link>
      </section>
    ) : null}
  </header>

  {/* Cards */}
  <section className="relative min-h-screen flex flex-col gap-8">
    <section className="flex max-[500px]:flex-col max-[500px]:gap-[.5em] max-[500px]:mt-[1em] items-start">
      {/* VirtualAccount */}
      <section className="relative left-[40em] max-[500px]:h-[24em] max-[500px]:w-[65%] max-[480px]:w-[62%] max-[500px]:left-[.1em] max-[500px]:top-[6em] top-[0.6em]  h-[23em] px-[.8em] bg-payment-bg bg-cover bg-center">
        <VirtualAccount />
      </section>

      {/* TransactionAction */}
      <section className="relative right-[22em] max-[500px]:w-[65%] max-[500px]:static max-[500px]:order-1 max-md:right-[6em] max-md:left-[.0em]">
        <TransactionAction />
      </section>
    </section>

    <section className="relative flex flex-col items-center gap-8">
      {/* Payment Verification */}
      <section className="bg-white bg-payment-bg bg-cover bg-center w-[45%] max-[500px]:w-[80%] mt-[.3em] shadow-2xl max-[500px]:ml-[auto] max-[500px]:mr-[auto] max-md:mt-[-2.5em] h-[23em] max-[500px]:h-[27em] rounded-lg">
        <PaymentVerification />
      </section>

      {/* Payment Page */}
      <section className="bg-payment-bg bg-cover bg-center bg-white/60 mt-[1em] ml-[auto] mr-[auto] backdrop-blur-lg shadow-[2em] p-6 max-[500px]:w-[85%] w-[50%] mb-[2em] rounded-[.3em] border border-dotted border-gray-300">
        <PaymentPage />
      </section>
    </section>
  </section>
</main>

        </>
      </section>
    </section>
  );
};

export default Dashboard;
