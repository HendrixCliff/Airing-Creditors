import React from 'react';

interface ProfileHeaderProps {
  onEditClick: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ onEditClick }) => {
  return (
    <div className="profile-header">
      <img className="profile-avatar" src="/path/to/avatar.jpg" alt="User Avatar" />
      <h1 className="profile-name">John Doe</h1>
      <button className="edit-profile-button" onClick={onEditClick}>
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileHeader;
