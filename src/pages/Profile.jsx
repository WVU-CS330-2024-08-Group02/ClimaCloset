import React, {useState} from 'react';
import '../pages/Profile.css';

export function Profile() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const dropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="profile-container">
      {/* Image and Username */}
      <div className="profile-image-and-username">
        <img src="src/assets/CamProfile.png" alt="Profile" className="profile-image"/>
        <div className="profile-username">
          <span>CamTheMan96</span>
        </div>
      </div>

      {/* Edit Button */}
      <div>
        <button className="edit-button" onClick={dropdown}>Edit Profile</button>

        {/* Dropdown */}
        {isDropdownVisible && (
          <div className="dropdown">
            <ul>
              <li>Edit Username</li>
              <li>Change Password</li>
              <li>Update Email</li>
              <li>Log Out</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
