import React, { useEffect } from 'react';
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchLoggedInUser } from "../../redux/fetchData";

const ProfileDetails: React.FC = () => {
  const { phoneNumber, username, country, email, _id, loading, error } = useAppSelector((state) => state.userProfile);

  
  // const { isLoggedIn } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  // Fetch user details if logged in
  useEffect(() => {
    
      dispatch(fetchLoggedInUser());
    
  }, [dispatch]);

 // Conditional rendering logic for better organization
  const renderLoadingState = () => (
    <p aria-live="polite" style={{ color: '#555' }}>
      Loading user details...
    </p>
  );

  const renderErrorState = () => (
    <p aria-live="assertive" style={{ color: 'red', fontWeight: 'bold' }}>
      {error}
    </p>
  );

  const renderProfileDetails = () => (
    <>
      <div className="">
        <img
          className="profile-avatar"
          src="/path/to/avatar.jpg"
          alt="User Avatar"
        />
      </div>
      <p>
          <strong>Id: </strong>{_id || "N/A"}
      </p>
  
      <p>
          <strong>Username: </strong>{username || "N/A"}
      </p>
      <p> 
        <strong>Email:</strong> {email || "N/A"}
      </p>
      <p>
        <strong>Phone Number:</strong> {phoneNumber || "N/A"}
      </p>
      <p>
        <strong>Location:</strong> {country || "N/A"}
      </p>
    </>
  );
//Generate me a logo featuring Airtime 

  const renderLoggedOutState = () => (
    <p aria-live="polite" style={{ color: '#777' }}>
      Please log in to view your profile details.
    </p>
  );
console.log()
  // Main render logic
  return (
    <div style={{ padding: '20px' }}>
      {loading && renderLoadingState()}
      {error && renderErrorState()}
      {!loading && !error && renderProfileDetails()}
      {!loading && renderLoggedOutState()}
    </div>
  );
};

export default ProfileDetails;