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
  const { loading, error } = useAppSelector((state) => state.updateMe); // ✅ Removed unused `user`

  // ✅ Email & Phone Validation
  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone: string) => /^\d{10,15}$/.test(phone); // ✅ Allows 10-15 digit numbers

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Validate Required Fields
    if (!username || !email || !phoneNumber || !country) {
      alert('Please fill in all fields.');
      return;
    }
    if (!isValidEmail(email)) {
      alert('Invalid email format.');
      return;
    }
    if (!isValidPhone(phoneNumber)) {
      alert('Invalid phone number format.');
      return;
    }

    try {
      await dispatch(updateMe({ username, email, phoneNumber, country })).unwrap(); // ✅ Pass fields directly
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile. Please try again.');
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
              placeholder="Enter 10-15 digit phone number"
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
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default UpdateMeForm;
