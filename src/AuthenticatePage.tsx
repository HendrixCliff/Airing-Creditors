import LoginComponent from './components/LoginComponent';  
import { Link } from "react-router-dom"

function AuthenticatePage() {
  return (
    <section className="mt-[7em] w-[60%] ml-[30em] "> 
         <h2 className="font-sans font-bold text-center text-[3rem]">Welcome Back!</h2>
        <h4 className="text-[1.3rem] text-center">Enter your email and password to access your account</h4> 
        <section className="ml-[14em]">
          <LoginComponent />
          <h3 className="text-[1.3rem]">Don't have an account?</h3>
          <section className="flex text-[1.2rem] mt-[.3em] w-[60%] justify-between">
          <Link to="/signup">Sign Up</Link>
          <Link to="/forgot-password">Forgot Password</Link>
        </section>
        </section>
    </section>
  )
}

export default AuthenticatePage