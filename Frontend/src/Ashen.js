import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import StartScreen from './components/StartScreen';
import Quiz from './components/Quiz';
import ResultScreen from './components/ResultScreen';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { checkLogin } from './redux/Authentication/actions/authenticationAction';
import './Ashen.css'; // Importing the CSS file
import Register from './pages/Register';

function Ashen() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.authentication.status);
  const token = useSelector((state) => state.authentication.token);
  const role = useSelector((state) => state.authentication.role);
  const username = useSelector((state) => state.authentication.user);
  const isLogged = useSelector((state) => state.authentication.isLogged);
  const quizTaken = useSelector((state) => state.quiz.quizTaken);

  useEffect(() => {
    console.log(username, role);
  }, [username, role]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Checking token');
      dispatch(checkLogin(token));
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isLogged ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/dashboard"
          element={isLogged ? (quizTaken ? <Dashboard /> : <Navigate to="/quiz" />) : <Navigate to="/login" />}
        />
        <Route
          path="/quiz"
          element={isLogged ? (quizTaken ? <Navigate to="/dashboard" /> : <Quiz />) : <Navigate to="/login" />}
        />
        
        {/* <Route path="/quiz" element={<Quiz />} /> */}

        <Route path="/" element={<StartScreen />} />
        <Route path="/result" element={<ResultScreen />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default Ashen;
