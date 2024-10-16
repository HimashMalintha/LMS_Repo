import React, { useState } from 'react';
import './WelcomePage.css'; // Your CSS file
import logo from '../assets/knowledgeconnect-logo.jpeg'; // Replace with your actual logo path
import Field from './Field'; // Import Field component
import Ashen from '../Ashen';

function WelcomePage({ onLogout }) {
  const [navigateToField, setNavigateToField] = useState(false); // State to handle navigation
  const [navigateToAshen, setNavigateToAshen] = useState(false); // State to handle navigation

  const handleLogout = () => {
    // Set the message in session storage for the next page load
    sessionStorage.setItem('logoutMessage', 'Logged out successfully');
    // Call the onLogout function passed from App.js to switch back to login page
    onLogout();
  };

  // Handle click for Field Recommendation to navigate to Field page
  const handleFieldRecommendation = () => {
    setNavigateToField(true); // Update state to trigger Field navigation
  };

  // If navigateToField is true, render the Field component
  if (navigateToField) {
    return <Field />;
  }

   // Handle click for Field Recommendation to navigate to Field page
   const handleAshenRecommendation = () => {
    setNavigateToAshen(true); // Update state to trigger Field navigation
  };

  // If navigateToField is true, render the Field component
  if (navigateToAshen) {
    return <Ashen />;
  }

  return (
    <div className="welcome-container">
      <header className="welcome-header">
        <img src={logo} alt="KnowledgeConnect Logo" className="logo" />
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>
      <main className="welcome-main">
        <h1>Hello!</h1>
        <p>Select your preferred service</p>
        <div className="options-container">
          <div className="option-card"onClick={handleAshenRecommendation} style={{ cursor: 'pointer' }}>
            <h3>Study Group Platform</h3>
          </div>
          <div className="option-card" onClick={handleFieldRecommendation} style={{ cursor: 'pointer' }}>
            <h3>Field Recommendation</h3>
          </div>
        </div>
      </main>
    </div>
  );
}

export default WelcomePage;
