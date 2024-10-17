import React, { useState } from 'react';
import './Field.css'; // Assuming you're using CSS for styling
import logo from '../assets/knowledgeconnect-logo.jpeg'; // Ensure this path is correct
import studentImage from '../assets/student-thinking.jpeg'; // Add the correct path for your image

function Field() {
  const [grades, setGrades] = useState({
    programming: '',
    math: '',
    systems: '',
    webTech: '',
    oop: '',
    dbms: '',
    stats: '',
    mobileDev: '',
    dsa: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setGrades({
      ...grades,
      [name]: value
    });
  };

  const handleSubmit = () => {
    console.log('Grades Submitted', grades);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="KnowledgeConnect Logo" />
        <nav>
          <a href="/">Study Groups</a>
          <a href="/">Field Recommendation</a>
        </nav>
        <button className="logout-btn">Logout</button>
      </header>

      <div className="content">
        <div className="image-section">
          <img src={studentImage} alt="Student thinking" className="student-image" />
        </div>

        <div className="form-section">
          <h2>Enter your grades of first two years below</h2>
          <form className="grades-form">
            {Object.entries(subjects).map(([key, label]) => (
              <div key={key} className="input-group">
                <label>{label}</label>
                <input
                  type="text"
                  name={key}
                  value={grades[key]}
                  onChange={handleInputChange}
                  placeholder="Grade"
                />
              </div>
            ))}
            <button type="button" onClick={handleSubmit} className="submit-btn">
              Check
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const subjects = {
  programming: 'Introduction to Programming',
  math: 'Mathematics for Computing',
  systems: 'Information Systems and Data Modeling',
  webTech: 'Internet and Web Technologies',
  oop: 'Object Oriented Programming',
  dbms: 'Database Management Systems',
  stats: 'Probability and Statistics',
  mobileDev: 'Mobile Application Development',
  dsa: 'Data Structures and Algorithms'
};

export default Field;
