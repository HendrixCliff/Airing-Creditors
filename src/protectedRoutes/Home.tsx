import PaymentPage from './../protectedRoutes/PaymentPage';
import { Link } from 'react-router-dom';
import { useAppSelector } from './../hooks/useAppSelector'
import AirtimeResponse from './../protectedRoutes/AirtimeResponse'

export default function Home() {
    const { isLoggedIn } = useAppSelector((state) => state.auth);
    return (
        <section>
           {!isLoggedIn ?
           <section className="flex gap-[3em] max-md:gap-[1em] justify-start">
            <Link className=" text-center ml-[auto] mt-[2em] max-md:w-[19%] max-md:mt-[.5em] max-md:py-[.2em] max-md:px-[.2em]  p-[.2em] font-semibold rounded-[1em] text-[#f1fffc] border-solid bg-[#736dff] w-[8%] text-[1.2rem]" to="/authenticate">Login</Link>
            <Link className=" text-center mt-[2em] mr-[.5em] max-md:w-[19%] max-md:mt-[.5em] max-md:py-[.2em] max-md:px-[.2em]  p-[.2em] font-semibold rounded-[1em] text-[#f1fffc] border-solid bg-[#736dff] w-[8%] text-[1.2rem]" to="/signup">Sign Up</Link>
           </section> : <div> </div>}
            <h1>Home</h1>
            <section className="flex flex-col ml-[auto] w-[24%] mr-[1em] max-md:mr-[1em] text-[1.2rem] border-solid border-[.3em] border-[#f1fffc]">
                <Link className="ml-[1em]" to="/profile">Profile</Link>
                <Link className="ml-[1em]"  to="/dashboard"> Dashboard</Link>
            </section>
           <PaymentPage/>
           <AirtimeResponse/>
           
         
        </section>
    )
}