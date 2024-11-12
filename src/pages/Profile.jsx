import React from 'react';
import '../pages/Profile.css'; // Ensure you have a linked CSS file

export function Profile() {
  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="profile-header">
        <img
          src="src/assets/CamProfile.png"
          alt="Profile"
          className="profile-image"
        />
        <div className="profile-info">
          <span className="profile-username">username</span>
          <p className="profile-name">John Doe</p>
        </div>
      </div>

      {/* Footer */}
      <div className="profile-footer">
        <button className="edit-button">Edit Profile</button>
      </div>
    </div>
  );
}
