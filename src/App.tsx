import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './protectedRoutes/Dashboard';  
import AuthenticatePage from './AuthenticatePage'
import Profile from './components/Profile/Profile'
import {SignUpComponent} from './components/SignupComponent';
import ForgotPassword from './components/ForgotPasswordComponent';
import ResetPassword from './components/resetPassword'
import AirtimeResponseComponent from './protectedRoutes/AirtimeResponse'
import ErrorBoundary from "./errorFeatures/ErrorBoundary";

const App: React.FC = () => {

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/authenticate" element={<AuthenticatePage />} />
          <Route path="/signup" element={<SignUpComponent />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/airtime-response" element={<AirtimeResponseComponent />} />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/authenticate" />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;




  



