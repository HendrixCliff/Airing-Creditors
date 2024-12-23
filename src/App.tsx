import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './protectedRoutes/Dashboard';  
import AuthenticatePage from './AuthenticatePage'
import ProtectedAccess from './ProtectedAccess';
import Profile from './components/Profile/Profile'
import SignUpComponent from './components/SignupComponent';
import ForgotPassword from './components/ForgotPasswordComponent';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/authenticate" element={<AuthenticatePage />} />
        <Route path="/signup" element={<SignUpComponent/>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* Protected Routes */}
        <Route element={<ProtectedAccess />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} /> {/* New Protected Route */}
          <Route path="/payment-page" element={<Profile />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/authenticate" />} />
      </Routes>
    </Router>
  );
};

export default App;




  



