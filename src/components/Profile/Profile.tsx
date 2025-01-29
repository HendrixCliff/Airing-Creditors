import React from 'react';
import { Link} from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Import the correct icon
import ProfileDetails from './ProfileDetails';


const Profile: React.FC = () => {
  
 

  return (
    <section className="p-4">

        <>
          {/* Back Button */}
          <Link to="/" className="inline-flex items-center text-blue-600 hover:underline mb-4">
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Link>

          {/* Profile Header */}
          

          {/* Profile Details */}
          <ProfileDetails />

          {/* Edit Modal */}
          {/* {isEditing && <EditProfileModal onClose={handleCloseModal} />} */}
        </>
        <section>
          <Link to="/" className="inline-flex items-center text-blue-600 hover:underline mb-4">
            <FaArrowLeft className="mr-2" />
          </Link>
        <h3 className="text-center text-red-500">You need to log in to access your profile.</h3>
       </section>
    </section>
  );
};

export default Profile;
