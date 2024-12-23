import React from 'react';
import { useAppDispatch } from './../hooks/useAppDispatch'; // Replace with your actual store path
import { useSelector } from 'react-redux';
import { protectedData } from './../redux/fetchData'; 
import { RootState } from './../redux/rootReducer'; 

const ProtectedComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { protectedMessage, loading, error } = useSelector((state: RootState) => state.auth);

  const handleFetchProtected = async () => {
    try {
      await dispatch(protectedData()).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={handleFetchProtected} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Protected Data'}
      </button>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {protectedMessage && <p>Protected Message: {protectedMessage}</p>}
    </div>
  );
};

export default ProtectedComponent;
