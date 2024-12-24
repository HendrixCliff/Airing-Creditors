// ProtectedAccess.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from './hooks/useAppSelector'
const ProtectedAccess: React.FC = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  if (process.env.NODE_ENV === 'development') {
    // Allow access in development mode
    return <Outlet />;
  }

  // In production mode, check if the user is authenticated
  return isLoggedIn ? <Outlet /> : <Navigate to="/authenticate" />;
};

export default ProtectedAccess;


