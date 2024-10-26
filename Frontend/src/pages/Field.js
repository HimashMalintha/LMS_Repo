import React, { useState } from 'react';
import './Field.css'; // Assuming you're using CSS for styling
import logo from '../assets/knowledgeconnect-logo.jpeg'; // Ensure this path is correct
import studentImage from '../assets/student-thinking.jpeg'; // Add the correct path for your image
import axios from 'axios'; // Import Axios
import Dash from './WelcomePage';

function Field({ onLogout }) {
  const [grades, setGrades] = useState({
    introProg: '',  // Introduction to Programming
    oop: '',         // Object Oriented Programming
    dsa: '',         // Data Structures and Algorithms
    iwt: '',         // Internet and Web Technologies
    mad: '',         // Mobile Application Development
    isdm: '',        // Information Systems and Data Modeling
    mathComp: '',    // Mathematics for Computing
    dbms: '',        // Database Management Systems
    probStat: ''     // Probability and Statistics
  });

  const [navigateToDash, setNavigateToDash] = useState(false); // State to handle navigation
  const [result, setResult] = useState(''); // To display the result from the backend

  const handleDashRecommendation = () => {
    setNavigateToDash(true); // Update state to trigger Field navigation
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setGrades({
      ...grades,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5050/check-eligibility', grades);
      const { seResult, dsResult } = response.data;
      setResult(`SE Result: ${seResult}\nDS Result: ${dsResult}`); // Show both results
    } catch (error) {
      console.error('There was an error submitting the grades!', error);
      setResult('An error occurred while checking eligibility.');
    }
  };

  // Check if navigation to dashboard is triggered
  if (navigateToDash) {
    return <Dash onLogout={onLogout} />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="KnowledgeConnect Logo" />
        <nav>
          <a href="/">Study Groups</a>
          <a href="/">Field Recommendation</a>
        </nav>
        <button className="logout-btn" onClick={() => window.location.href = '/'}>Main Page</button>
        <div className="logout-btn" onClick={handleDashRecommendation} style={{ cursor: 'pointer' }}>
          Go to Dashboard
        </div>
      </header>

      <div className="content">
        <div className="image-section">
          <img src={studentImage} alt="Student thinking" className="student-image" />
        </div>

        <div className="form-section">
          <h2>Enter your grades of first two years below</h2>

          <div className="grades-form">
            <h3>Year 1 Modules</h3>
            {Object.entries(year1Subjects).map(([key, label]) => (
              <div key={key} className="input-group">
                <label>{label}</label>
                <select
                  name={key}
                  value={grades[key]}
                  onChange={handleInputChange}
                >
                  <option value="">Select Grade</option>
                  <option value="A+">A+</option>
                  <option value="A">A</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="B-">B-</option>
                  <option value="C+">C+</option>
                </select>
              </div>
            ))}

            <h3>Year 2 Modules</h3>
            {Object.entries(year2Subjects).map(([key, label]) => (
              <div key={key} className="input-group">
                <label>{label}</label>
                <select
                  name={key}
                  value={grades[key]}
                  onChange={handleInputChange}
                >
                  <option value="">Select Grade</option>
                  <option value="A+">A+</option>
                  <option value="A">A</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="B-">B-</option>
                  <option value="C+">C+</option>
                </select>
              </div>
            ))}

            <button type="button" onClick={handleSubmit} className="submit-btn">
              Check
            </button>
          </div>

          {/* Display the result */}
          {result && <pre className="result-message">{result}</pre>}
        </div>
      </div>
    </div>
  );
}

// Separate subjects by year
const year1Subjects = {
  introProg: 'Introduction to Programming',
  iwt: 'Internet and Web Technologies',
  isdm: 'Information Systems and Data Modeling',
  mathComp: 'Mathematics for Computing'
};

const year2Subjects = {
  oop: 'Object Oriented Programming',
  dsa: 'Data Structures and Algorithms',
  mad: 'Mobile Application Development',
  dbms: 'Database Management Systems',
  probStat: 'Probability and Statistics'
};

export default Field;
