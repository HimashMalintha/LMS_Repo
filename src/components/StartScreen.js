import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StartScreen.css'; // Importing the CSS file if needed

const StartScreen = () => {
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate('/quiz', { state: { questionnaire: 1 } });
  };

  return (
    <div className="start-screen">
      <h1>Hi User01!</h1>
      <h2>Welcome to <span className="highlight">Knowledgeconnect</span>!</h2>
      <hr />
      <p>Ready to identify which study groups you belong to?</p>
      <button className="start-button" onClick={startQuiz}>
        Start Quiz <span className="arrow">→</span>
      </button>
    </div>
  );
};

export default StartScreen;
