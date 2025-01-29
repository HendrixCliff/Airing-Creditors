import React, { useState, useCallback } from 'react';
import { useAppDispatch } from './../hooks/useAppDispatch';
import { updatePassword } from './../redux/fetchData';
import { clearUpdatePasswordState } from './../redux/userSlice';
import { useAppSelector } from '../hooks/useAppSelector';

const UpdatePassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const dispatch = useAppDispatch();
  
  
  const token = useAppSelector((state) => state.auth.token);
  const { isUpdatingPassword, updatePasswordSuccess, updatePasswordError } = useAppSelector((state) => state.user);

  
  const handleUpdatePassword = useCallback(() => {
    if (!token) {
      alert('User token is missing. Please log in again.');
      return;
    }
    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }
    dispatch(updatePassword({ token, newPassword }));
  }, [token, newPassword, dispatch]);

  // ✅ Reset state when needed
  const resetState = useCallback(() => {
    dispatch(clearUpdatePasswordState());
  }, [dispatch]);

  return (
    <div>
      <h2>Update Password</h2>
      <div>
        <label>
          New Password:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={6} // ✅ Basic password validation
            placeholder="Enter new password"
          />
        </label>
      </div>
      <button onClick={handleUpdatePassword} disabled={isUpdatingPassword}>
        {isUpdatingPassword ? 'Updating...' : 'Update Password'}
      </button>
      {updatePasswordSuccess && <p>Password updated successfully!</p>}
      {updatePasswordError && <p>Error: {updatePasswordError}</p>}
      {(updatePasswordSuccess || updatePasswordError) && (
        <button onClick={resetState}>Reset State</button>
      )}
    </div>
  );
};

export default UpdatePassword;
