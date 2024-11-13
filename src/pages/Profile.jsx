import React from 'react';
import '../pages/Profile.css';

export function Profile() {
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
        <button className="edit-button">Edit Profile</button>
      </div>
    </div>
  );
}
