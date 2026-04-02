import React from 'react';
import StudentCard from './components/StudentCard';
import './App.css';

function App() {
  const students = [
    { id: 1, name: 'Aditya Vardhan', department: 'SCOPE', marks: 85 },
    { id: 2, name: 'Sujith Kumar', department: 'SENSE', marks: 92 },
    { id: 3, name: 'Rahul Sharma', department: 'VISH', marks: 78 },
    { id: 4, name: 'Priya Singh', department: 'SCOPE', marks: 88 },
    { id: 5, name: 'Deepak Raj', department: 'SENSE', marks: 95 },
    { id: 6, name: 'Ananya Rao', department: 'VISH', marks: 82 },
  ];

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Student Dashboard</h1>
        <p>Lab 9 Exercise 2: Component Reusability & Props</p>
      </header>
      <main className="student-grid">
        {students.map((student) => (
          <StudentCard
            key={student.id}
            name={student.name}
            department={student.department}
            marks={student.marks}
          />
        ))}
      </main>
      <footer className="app-footer">
        <div className="footer-details">
          <span>VIT-AP UNIVERSITY, ANDHRA PRADESH</span>
          <span>Branch: B.Tech/M.Tech</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
