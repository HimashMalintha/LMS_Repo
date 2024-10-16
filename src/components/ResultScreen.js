import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { appendChosenSubGroup, setQuestionnaire } from '../redux/Quiz/slices/quizSlice';
import '../App.css'; // Importing the CSS file if needed
import axios from 'axios';
import { submitQuiz, updateQuizTaken } from '../redux/Quiz/actions/quizAction';

const ResultScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const questionnaire = useSelector((state) => state.quiz.questionnaire);
  const chosenGroup = useSelector((state) => state.quiz.chosenGroup);
  const user = useSelector((state) => state.authentication.user);
  const [finishedQuiz, setFinishedQuiz] = useState(false);

  // Ensure score is read from location state correctly
  const score = location.state?.score || {
    V: 0,
    A: 0,
    R: 0,
    K: 0,
    G: 0,
    S: 0,
    An: 0,
    Ra: 0,
    C: 0,
    I: 0,
    Ho: 0,
    T: 0,
  };

  const getGroupName = (groupNumber) => {
    const groupNames = {
        1: 'Visual Learners',
        2: 'Auditory Learners',
        3: 'Reading/Writing Learners',
        4: 'Kinesthetic Learners',
        5: 'Global Learners',
        6: 'Sequential Learners',
        7: 'Analytical Learners',
        8: 'Random Learners',
        9: 'Collaborative Learners',
        10: 'Independent Learners',
        11: 'Hands-on Practice Learners',
        12: 'Theoretical Learners'
    };

    return groupNames[groupNumber] || 'Unknown Group';
};

  const getResult = () => {
    if (questionnaire === 1) {
      const maxScore = Math.max(score.V, score.A, score.R, score.K);
      if (maxScore === score.V) return 1; // visual learners group under Sensory Preferences
      if (maxScore === score.A) return 2; // auditory learners group under Sensory Preferences
      if (maxScore === score.R) return 3; // reading/writing learners group under Sensory Preferences
      if (maxScore === score.K) return 4; // kinesthetic learners group under Sensory Preferences
    } else if (questionnaire === 2) {
      const maxScore = Math.max(score.G, score.S, score.An, score.Ra);
      if (maxScore === score.G) return 5; // global learners group under Cognitive Styles
      if (maxScore === score.S) return 6; // sequential learners group under Cognitive Styles
      if (maxScore === score.An) return 7; // analytical learners group under Cognitive Styles
      if (maxScore === score.Ra) return 8; // random learners group under Cognitive Styles
    } else if (questionnaire === 3) {
      const maxScore = Math.max(score.C, score.I, score.Ho, score.T);
      if (maxScore === score.C) return 9; // collaborative learners group under Technical Preferences
      if (maxScore === score.I) return 10; // independent learners group under Technical Preferences
      if (maxScore === score.Ho) return 11; // hands-on practice learners group under Technical Preferences
      if (maxScore === score.T) return 12; // theoretical learners group under Technical Preferences
    }
    return null;
  };

  const nextQuiz = () => {
    if (questionnaire < 3) {
      dispatch(setQuestionnaire(questionnaire + 1));
      dispatch(appendChosenSubGroup(getResult()))

      navigate('/quiz', { state: { questionnaire: questionnaire + 1 } });
    } else {
      dispatch(appendChosenSubGroup(getResult()))
      console.log("Chosen Group", chosenGroup)
      setFinishedQuiz(true);
      console.log('All questionnaires completed');
    }
  };



  const finishQuiz = async () => {
    console.log("logged in user is:", user);
    console.log("Chosen groups are:", chosenGroup);
    dispatch(submitQuiz({ userId: user, chosenGroup }))
      .unwrap()
      .then((result) => {
        console.log('Quiz submitted successfully:', result);
        console.log("username is", user)
        dispatch(updateQuizTaken({ userId: user, quizTaken: true }));
        
        navigate('/dashboard')
        
      })
      .catch((error) => {
        console.error('Error submitting quiz:', error);
      });
  };


  return (
    <div className="result-screen container d-flex flex-column justify-content-center align-items-center">
      <h2>Questionnaire {questionnaire} - Result</h2>
      <hr />
      <div className="result-icon">👁️</div>
      <p>Congratulations!</p>
      <p>You are grouped into <span className="highlight">{getGroupName(getResult())}</span>.</p>

      {
        !finishedQuiz ? (
          <button className="next-button" onClick={nextQuiz}>
            Next Quiz <span className="arrow">→</span>
          </button>
        ) : (
          <button className="next-button" onClick={finishQuiz}>
            Submit Quiz <span className="arrow">→</span>
          </button>
        )
      }

    </div>
  );
};

export default ResultScreen;
