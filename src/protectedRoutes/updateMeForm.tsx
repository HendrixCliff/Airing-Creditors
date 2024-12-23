import React, { useState } from 'react';
import { useAppDispatch } from './../hooks/useAppDispatch';
import { RootState } from './../redux/rootReducer'; 
import { updateMe } from './../redux/fetchData'; 
import { useSelector } from 'react-redux'

const UpdateMeForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useAppDispatch();
  const { loading, error, user } = useSelector((state: RootState) => state.user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = 'your-auth-token-here'; // Replace with the actual token retrieval logic
    const userDetails = { name, email };

    await dispatch(updateMe({ token, userDetails }));
  };

  return (
    <div>
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {user && <p style={{ color: 'green' }}>Profile updated successfully!</p>}
    </div>
  );
};

export default UpdateMeForm;
