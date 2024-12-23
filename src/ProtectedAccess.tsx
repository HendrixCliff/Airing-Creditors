
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/rootReducer';



const ProtectedAccess: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  if (!token) {
    return <Navigate to="/authenticate" replace />;
  }

  return <Outlet />;
};

export default ProtectedAccess;

