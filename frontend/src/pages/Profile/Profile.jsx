import React, {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import { CenterContainer } from '../../components/CenterContainer/CenterContainer';
import profileImage from '../../assets/pfp/CamProfile.png'; // Change when login is functional
import { AuthContext } from '../../context/AuthContext';
import Throbber from '../../components/Throbber/Throbber';

export function Profile() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const dropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleLogout = () => {
    logout(); // Clear authentication state
    navigate("/Login"); // Redirect to the login page
};

  function ProfileSection() {
    const { user } = useContext(AuthContext); // Assuming 'user' contains the name
    return (
      <>
        <div className="profile-image-and-username">
          <img src={profileImage} alt="Profile" className="profile-image"/>
          <div className="profile-username">
            <span>{user?.username || 'Guest'}</span> {/* Display user's name or a default */}
          </div>
        </div>
        {/* Only render Edit button if the user is logged in */}
        {user && (
          <button className="edit-button" onClick={dropdown}>
            Edit Profile
          </button>
        )}
      </>
    );
  }

  return (
    <CenterContainer>
      <div className="profile-container">
        {/* Image and Username */}
        <ProfileSection/>

        
        <div>
          {/* Dropdown */}
          {isDropdownVisible && (
            <div className="dropdown">
              <ul>
                <li>Edit Username</li>
                <li>Change Password</li>
                <li>Update Email</li>
                <li onClick={handleLogout}>Log Out</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </CenterContainer>
  );
}
