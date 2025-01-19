import PaymentPage from './../protectedRoutes/PaymentPage';
import { Link } from 'react-router-dom';
import { useAppSelector } from './../hooks/useAppSelector'


export default function Home() {
    const { isLoggedIn } = useAppSelector((state) => state.auth);
    return (
        <section>
           {!isLoggedIn ?
           <section className="flex gap-[3em] max-md:gap-[1em] justify-start">
            <Link className=" text-center ml-[auto] mt-[2em] max-md:w-[25%] max-md:mt-[.5em] max-md:py-[.2em] max-md:px-[.2em]  p-[.2em] font-semibold rounded-[1em] text-[#f1fffc] border-solid bg-[#736dff] w-[8%] text-[1.2rem]" to="/authenticate">Login</Link>
            <Link className=" text-center mt-[2em] mr-[.5em] max-md:w-[25%] max-md:mt-[.5em] max-md:py-[.2em] max-md:px-[.2em]  p-[.2em] font-semibold rounded-[1em] text-[#f1fffc] border-solid bg-[#736dff] w-[8%] text-[1.2rem]" to="/signup">Sign Up</Link>
           </section>: <h3>Good</h3>}
            <h1>Home</h1>
           <Link to="/profile">Profile</Link>
           <Link to="/dashboard"> Dashboard</Link>
           <PaymentPage/>
           
         
        </section>
    )
}