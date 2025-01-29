import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './protectedRoutes/Dashboard';  
import AuthenticatePage from './AuthenticatePage'
import ProtectedAccess from './ProtectedAccess';
import Profile from './components/Profile/Profile'
import {SignUpComponent} from './components/SignupComponent';
import ForgotPassword from './components/ForgotPasswordComponent';
import ResetPassword from './components/resetPassword'
import AirtimeResponse from './protectedRoutes/AirtimeResponse'


const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/authenticate" element={<AuthenticatePage />} />
        <Route path="/signup" element={<SignUpComponent/>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword/>}/>
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/airtime-response" element={<AirtimeResponse/>} />
        {/* Protected Routes */}
       

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/authenticate" />} />
      </Routes>
    </Router>
  );
};

export default App;




  



