import React, { useState, useEffect } from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileDetails from './ProfileDetails';
import EditProfileModal from './EditProfileModal';
import { useAppSelector } from './../../hooks/useAppSelector';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      alert('You need to be logged in to be able to have a profile');
     
     setTimeout(() => {
      navigate('/login')
     }, 3000) // Redirect to login page if needed
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      {isLoggedIn ? (
        <>
          <ProfileHeader onEditClick={handleEditClick} />
          <ProfileDetails />
          {isEditing && <EditProfileModal onClose={handleCloseModal} />}
        </>
      ) : (
        <h3>You need to log in to be a user.</h3>
      )}
    </div>
  );
};

export default Profile;
