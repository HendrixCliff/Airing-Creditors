import LoginComponent from './components/LoginComponent';  
import { Link } from "react-router-dom"

function AuthenticatePage() {
  return (
    <section className="mt-[7em] max-md:mt-[5em] w-[60%] max-sm:ml-[0.01em] max-sm:w-[100%] max-mad:w-[98%] ml-[30em] max-md:ml-[1em] overflow-hidden "> 
         <h2 className="font-sans font-bold text-center max-md:w-[98%] text-[2.5rem]">Welcome Back!</h2>
         <h4 className="text-[1.3rem] text-center">Enter your email and password to access your account</h4> 
         <section className="ml-[14em] max-md:ml-[2.5em]">
          <LoginComponent />
          <h3 className="text-[1.3rem]">Don't have an account?</h3>
          <section className="flex text-[1.2rem]  mt-[.3em] w-[60%] max-md:w-[95%] justify-between">
          <Link to="/signup">Sign Up</Link>
          <Link to="/forgot-password">Forgot Password</Link>
        </section>
        </section>
    </section>
  )
}

export default AuthenticatePage