import React,{ useState, useEffect} from 'react';
import { logout } from './../redux/authSlice';
import { useAppDispatch } from './../hooks/useAppDispatch';
import { useAppSelector } from './../hooks/useAppSelector';
import PaymentPage from './../protectedRoutes/PaymentPage';
import { Link} from 'react-router-dom';
import PaymentVerification from './../protectedRoutes/verifyPaymentPage'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./../components/ui/alert-dialog"

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.auth);
const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setIsDialogOpen(true); // Open the dialog if the user is not logged in
    } else {
      setIsDialogOpen(false); // Close the dialog when the user logs in
    }
    
  }, [isLoggedIn]);


  
  return (
    <>
    {
      !isLoggedIn ?
      (
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogContent className="bg-[#2f5951] text-[#ffb927]">
            <AlertDialogHeader>
              <AlertDialogTitle>You need to be logged in</AlertDialogTitle>
              <AlertDialogDescription>
                You are required to log in before making any payment. Please sign in to continue.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              {/* The Cancel button will now close the dialog */}
              <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
                Cancel
              </AlertDialogCancel>
              {/* Add a Login button or navigation logic here */}
              <AlertDialogAction onClick={() => navigate('/authenticate')}>
                Login
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>   ) :
        (<section></section>)
    }
       <section className=" w-[100%] bg-dashboard-bg bg-cover bg-center bg-no-repeat  min-h-screen relative max-[]ml-[0em] p-[0em]  mt-[.8em]  overflow-hidden bg-gray-100">
        <>
          {/* Sidebar */}
          <aside className="w-[15%] absolute left-[1em]max-[650px]:left-[20em] max-[600px]:top-[4.5em] max-[589px]:left-[15em] max-[650px]:left-[20em] max-[600px]:top-[4.5em] max-[600px]:left-[20em] max-md:top-[2.3em]  max-md:w-[30%] max-sm:w-[34%] max-[600px]:w-[34%] px-[.5em] bg-white shadow-lg">
            <section className="p-[.4em] w-[95%] max-sm:w-[95%] max-[600px]:w-[100%] max-md:w-[95%] mt-[.5em] border-t-[.3em] border-r-[.3em] border-l-[.3em] border-b-[.3em]">
              <img src="./images/airtimelogo.webp" className="w-[100%] h-[6em]  object-fit  font-bold"/>
            </section>
            <nav className="px-[.3em] py-[.5em] mt-[.5em]">
              <ul className="space-y-4 max-md:mt-[.7em] mt-[1.1em]">
                <li>
                  <a href="#" className="block border-l-[.3em] border-r-[.3em] py-2 px-4 rounded-md hover:bg-gray-200 transition">
                    Overview
                  </a>
                </li>
                <li>
                {isLoggedIn ? (
                  <Link to="/profile" className="block border-l-[.3em] border-r-[.3em]  py-2 px-4 rounded-md hover:bg-gray-200 transition">Profile</Link>
                ) : (
                  <span className="block border-l-[.3em] border-r-[.3em]  py-2 px-4 rounded-md hover:bg-gray-200 transition">Profile</span>
                )}
                </li>
                <li>
                {isLoggedIn ? (
                  <Link to="/airtime-response" className="block border-l-[.3em] border-r-[.3em]  py-2 px-4 rounded-md hover:bg-gray-200 transition">Transactions</Link>
                ) : (
                  <span className="block border-l-[.3em] border-r-[.3em]  py-2 px-4 rounded-md hover:bg-gray-200 transition">Transactions</span>
                )}
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
          <main className=" w-[100%] max-md:w-[100%]  max-md:mr-[.5em]">
            <header className=" mb-[.5em] ">
               {!isLoggedIn ?
              <section className="flex gap-[3em] max-md:mt-[1em] w-[20%] max-md:w-[60%] max-md:gap-[.5em] ml-[auto] ">
                <Link className=" text-center w-[100%] max-md:w-[90%] ml-[auto] mt-[2em]  max-md:mt-[.5em] max-md:py-[.2em] max-md:px-[.2em]  p-[.2em] font-semibold rounded-[1em] text-[#f1fffc] border-solid bg-[#736dff] max-md:text-[.9em] max-sm:text-[.8em]  text-[1.2rem]" to="/authenticate">Login</Link>
                <Link className=" text-center w-[100%] max-md:w-[90%] ml-[auto] mt-[2em] mr-[.5em] max-md:mt-[.5em] max-md:py-[.2em] max-md:px-[.2em]  p-[.2em] font-semibold rounded-[1em] text-[#f1fffc] border-solid bg-[#736dff] max-md:text-[.9em] max-sm:text-[.8em] text-[1.2rem]" to="/signup">Signup</Link>
              </section> : <div> </div>}
          {/* Sidebar */}
            </header>

            {/* Cards */}
            <section className=" flex ml-[16em] max-md:mt-[2em] max-md:w-[100%]  mt-[6em] max-md:ml-[.2em] items-start max-sm:gap-[1em] max-md:flex-col-reverse  max-md:items-start gap-[1em] max-md:gap-[.5em] max-md:mt-[1em] ">
            <section className=" bg-white w-[50%] max-md:h-[13em] h-[16em] mt-[5em] max-md:mt-[0em] max-md:w-[100%] ml-[.5em] max-md:ml-[.1em] text-left shadow rounded-lg">
                 <PaymentVerification/>
              </section>
              <section className=" bg-white w-[65%] shadow rounded-lg max-md:mt-[2em] mt-[5em]">
                  <PaymentPage/>
              </section >
            </section>
            
          </main>
        </>
    </section>
    </>
   
  );
};

export default Dashboard;
