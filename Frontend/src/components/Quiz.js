import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchQuestions } from '../redux/Quiz/actions/quizAction';
import { handleAnswer, nextQuestion, previousQuestion, setCountdown, setLoading, setQuestionnaire } from '../redux/Quiz/slices/quizSlice';
import '../Ashen.css'; // Importing the CSS file if needed

const Quiz = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    loading,
    countdown,
    questions,
    currentQuestionIndex,
    userAnswers,
    questionnaire,
    chosenSubGroups, // Access chosenSubGroups from the state
  } = useSelector((state) => state.quiz);

  useEffect(() => {
    dispatch(fetchQuestions(questionnaire));
  }, [dispatch, questionnaire]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => dispatch(setCountdown(countdown - 1)), 1000);
      return () => clearTimeout(timer);
    } else {
      dispatch(setLoading(false));
    }
  }, [countdown, dispatch]);

  const handleAnswerClick = (questionId, answer) => {
    dispatch(handleAnswer({ questionId, answer }));
    if (currentQuestionIndex === questions.length - 1) {
      const score = calculateScore();
      navigate('/result', { state: { questionnaire, score } });
    } else {
      dispatch(nextQuestion());
    }
  };

  const calculateScore = () => {
    let score = {
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

    Object.entries(userAnswers).forEach(([questionId, answer]) => {
      // Sensory Preferences
      if (questionnaire === 1) {
        if (answer.includes('(Visual)')) score.V++;
        if (answer.includes('(Auditory)')) score.A++;
        if (answer.includes('(Reading/Writing)')) score.R++;
        if (answer.includes('(Kinesthetic)')) score.K++;
      }
      // Cognitive Styles
      else if (questionnaire === 2) {
        if (answer.includes('(Global)')) score.G++;
        if (answer.includes('(Sequential)')) score.S++;
        if (answer.includes('(Analytical)')) score.An++;
        if (answer.includes('(Random)')) score.Ra++;
      }
      // Technical Preferences
      else if (questionnaire === 3) {
        if (answer.includes('(Collaborative)') || answer.includes('(Collaborative/Independent)')) score.C++;
        if (answer.includes('(Independent)')) score.I++;
        if (answer.includes('(Hands-on practice)') || answer.includes('(Kinesthetic)')) score.Ho++;
        if (answer.includes('(Theoretical understanding)') || answer.includes('(Reading/Writing)')) score.T++;
      }
    });

    return score;
  };

  const previousQuestionClick = () => {
    if (currentQuestionIndex > 0) {
      dispatch(previousQuestion());
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="rotating-icon"></div>
        <h1>Quiz starts in {countdown}</h1>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <div>Loading...</div>; // Handle the case where currentQuestion is undefined
  }

  return (
    <div className="quiz-container">
      <h2>Question {currentQuestionIndex + 1}</h2>
      <p>{currentQuestion.questionText}</p>
      <div className="answers">
        {currentQuestion.answers.map((answer, index) => (
          <button key={index} onClick={() => handleAnswerClick(currentQuestion._id, answer.text)}>
            {answer.text}
          </button>
        ))}
      </div>
      <button onClick={previousQuestionClick}>Back</button>
    </div>
  );
};

export default Quiz;
