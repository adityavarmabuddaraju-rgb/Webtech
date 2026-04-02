import React from 'react';

const StudentProfile = () => {
  // Store student details inside variables using JavaScript
  const name = "Aditya Kumar";
  const department = "Computer Science and Engineering";
  const year = "3rd Year";
  const section = "B";

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
           <div className="profile-image-placeholder">AK</div>
           <h1>Student Profile</h1>
        </div>
        <div className="profile-details">
          <div className="detail-item">
            <span className="label">Name:</span>
            {/* Render variables dynamically using curly braces */}
            <h2 className="value">{name}</h2>
          </div>
          <div className="detail-item">
            <span className="label">Department:</span>
            <p className="value">{department}</p>
          </div>
          <div className="detail-item">
            <span className="label">Year:</span>
            <p className="value">{year}</p>
          </div>
          <div className="detail-item">
            <span className="label">Section:</span>
            <p className="value">{section}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
