import React from 'react';

interface ProfileHeaderProps {
  onEditClick: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ onEditClick }) => {
  return (
    <div className="">
      <img className="" src="/path/to/avatar.jpg" alt="User Avatar" />
      <h1 className="">John Doe</h1>
      <button className="edit-profile-button" onClick={onEditClick}>
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileHeader;
