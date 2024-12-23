import React, { useState } from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileDetails from './ProfileDetails';
import EditProfileModal from './EditProfileModal';


const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <ProfileHeader onEditClick={handleEditClick} />
      <ProfileDetails />
      {isEditing && <EditProfileModal onClose={handleCloseModal} />}
    </div>
  );
};

export default Profile;
