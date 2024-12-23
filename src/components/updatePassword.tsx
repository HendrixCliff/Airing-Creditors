import React, { useState } from 'react';
import { useAppDispatch } from './../hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { RootState } from './../redux/rootReducer'; 
import { updatePassword } from './../redux/fetchData'; 
import { clearUpdatePasswordState } from './../redux/authSlice'



const UpdatePassword: React.FC = () => {
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const dispatch = useAppDispatch();
  const { isUpdatingPassword, updatePasswordSuccess, updatePasswordError } = useSelector((state: RootState) => state.auth);
  
  const handleUpdatePassword = () => {
    dispatch(updatePassword({ token, newPassword }));
  };

  const resetState = () => {
    dispatch(clearUpdatePasswordState());
  };

  return (
    <div>
      <h2>Update Password</h2>
      <div>
        <label>
          Token:
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          New Password:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleUpdatePassword} disabled={isUpdatingPassword}>
        {isUpdatingPassword ? 'Updating...' : 'Update Password'}
      </button>
      {updatePasswordSuccess && (
        <p>Password updated successfully!</p>
      )}
      {updatePasswordError && (
        <p>Error: {updatePasswordError}</p>
      )}
      {(updatePasswordSuccess || updatePasswordError) && (
        <button onClick={resetState}>Reset State</button>
      )}
    </div>
  );
};

export default UpdatePassword;