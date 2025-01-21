import React from 'react';
//import { useAppSelector } from './../../hooks/useAppSelector'


interface ProfileHeaderProps {
  onEditClick: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ onEditClick }) => {
  //const { username } = useAppSelector((state) => state.user);

  return (
    <div className="">
      <img className="" src="/path/to/avatar.jpg" alt="User Avatar" />
      <h1 className="">{}</h1>
      <button className="edit-profile-button" onClick={onEditClick}>
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileHeader;
