import React, { useState } from 'react';
import { useAppDispatch } from './../hooks/useAppDispatch';
import { useAppSelector } from './../hooks/useAppSelector';
import { updateMe } from './../redux/updateMeSlice';

const UpdateMeForm: React.FC = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('');

  const dispatch = useAppDispatch();
  const { loading, error, user } = useAppSelector((state) => state.updateMe);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!username || !email || !phoneNumber || !country) {
      alert('Please fill in all fields');
      return;
    }

    const userDetails = {
      username,
      email,
      phoneNumber: Number(phoneNumber), // Convert to number if needed
      country,
    };

    try {
      await dispatch(updateMe({ userDetails })).unwrap();
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
    }
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
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
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
              required
            />
          </label>
        </div>
        <div>
          <label>
            Phone Number:
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Country:
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
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
