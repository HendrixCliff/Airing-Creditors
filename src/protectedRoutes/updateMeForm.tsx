import React, { useState } from 'react';
import { useAppDispatch } from './../hooks/useAppDispatch';
import { useAppSelector } from './../hooks/useAppSelector';
import { updateMe } from '../redux/updateMeSlice';
import { UpdateMePayload } from '../redux/updateMeSlice'; // ✅ Fixed import path

const UpdateMeForm: React.FC = () => {
  // ✅ Using a single state object for all input fields
  const [userDetails, setUserDetails] = useState<UpdateMePayload>({
    username: '',
    email: '',
    phoneNumber: '',
    country: '',
  });

  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector((state) => state.updateMe); // ✅ Ensure `loading` exists

  // ✅ Handle input changes dynamically
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Validate required fields
    if (!userDetails.username || !userDetails.email || !userDetails.phoneNumber || !userDetails.country) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await dispatch(updateMe(userDetails)).unwrap();
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
        <input
          type="text"
          name="username"
          value={userDetails.username}
          onChange={handleChange}
          required
          placeholder="Username"
        />
        <input
          type="email"
          name="email"
          value={userDetails.email}
          onChange={handleChange}
          required
          placeholder="Email"
        />
        <input
          type="tel"
          name="phoneNumber"
          value={userDetails.phoneNumber}
          onChange={handleChange}
          required
          placeholder="Phone Number"
        />
        <input
          type="text"
          name="country"
          value={userDetails.country}
          onChange={handleChange}
          required
          placeholder="Country"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default UpdateMeForm;
