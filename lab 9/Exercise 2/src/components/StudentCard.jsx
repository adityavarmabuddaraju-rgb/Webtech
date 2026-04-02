import React from 'react';
import './StudentCard.css';

const StudentCard = ({ name, department, marks }) => {
  return (
    <div className="student-card">
      <div className="card-header">
        <span className="student-avatar">{name.charAt(0)}</span>
        <h2 className="student-name">{name}</h2>
      </div>
      <div className="card-body">
        <p className="detail">
          <span className="label">Department:</span>
          <span className="value">{department}</span>
        </p>
        <p className="detail">
          <span className="label">Marks:</span>
          <span className="value">{marks}</span>
        </p>
      </div>
    </div>
  );
};

export default StudentCard;
