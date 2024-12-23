import React, { useState } from 'react';

interface EditProfileModalProps {
  onClose: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState('john.doe@example.com');
  const [bio, setBio] = useState('Software Developer at XYZ Corp. Passionate about coding and coffee.');

  const handleSave = () => {
    // Save logic here (e.g., API call)
    console.log('Saved:', { email, bio });
    onClose();
  };

  return (
    <div className="edit-profile-modal">
      <div className="modal-content">
        <h2>Edit Profile</h2>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Bio:
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </label>
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
