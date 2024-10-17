import React, { useState } from 'react';
import './App.css'; // Assuming you're using CSS for styling
import logo from '../assets/knowledgeconnect-logo.jpg'; // Replace with your actual logo path
import loginImage from '../assets/login-image.jpeg'; // Replace with your actual image path
import WelcomePage from './WelcomePage'; // Import the WelcomePage component

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for handling error messages
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  const handleSubmit = (event) => {
    event.preventDefault();
    // Predefined credentials
    const validUsername = 'abc@gmail.com';
    const validPassword = '123';

    // Check if the entered credentials match
    if (username === validUsername && password === validPassword) {
      console.log('Login successful!');
      setErrorMessage(''); // Clear any previous error message
      setIsLoggedIn(true); // Set login state to true to show WelcomePage component
    } else {
      // Set error message if credentials don't match
      setErrorMessage('Incorrect username or password.');
    }
  };

  // Handle logout to reset the login state
  const handleLogout = () => {
    setIsLoggedIn(false); // Reset the login state to false to show login form
    setUsername(''); // Clear the username input
    setPassword(''); // Clear the password input
    sessionStorage.removeItem('logoutMessage'); // Clear the logout message
  };

  // If the user is logged in, render the WelcomePage component
  if (isLoggedIn) {
    return <WelcomePage onLogout={handleLogout} />;
    
  }

  return (
    <div className="login-container">
      <div className="image-section">
        <img src={loginImage} alt="Welcome" className="login-image" />
      </div>
      <div className="login-form-section">
        <img src={logo} alt="KnowledgeConnect" className="login-logo" />
        <h1>WELCOME BACK !</h1>
        <p>Enter your username and password to access your account</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username :</label>
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password :</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Sign In</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
      </div>
    </div>
  );
}

export default App;
