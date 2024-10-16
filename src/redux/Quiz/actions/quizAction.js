import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setQuizTaken } from '../slices/quizSlice';

export const fetchQuestions = createAsyncThunk(
  'quiz/fetchQuestions',
  async (_, { getState }) => {
    const { questionnaire } = getState().quiz;
    const response = await axios.get(`http://localhost:5050/questions?questionaire=${questionnaire}`);
    return response.data;
  }
);
export const submitQuiz = createAsyncThunk(
  'quiz/submitQuiz',
  async ({ userId, chosenGroup }, { dispatch, getState }) => {
    try {
      console.log("You have chosen", chosenGroup);
      console.log("User ID is", userId);
      const response = await axios.put(`http://localhost:5050/api/users/user/${userId}/chatGroups`, {
        chatGroups: chosenGroup
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Chat groups added successfully:', response.data);
      dispatch(setQuizTaken(true)); // Correctly dispatch the action to set quizTaken to true
      return response.data;
    } catch (error) {
      console.error('Error updating chat groups:', error.response ? error.response.data : error.message);
      throw error; // Throw error to handle it in the calling function
    }
  }
);
export const updateQuizTaken = createAsyncThunk(
  'quiz/updateQuizTaken',
  async ( {userId, quizTaken}, { rejectWithValue }) => {
    try {
      console.log("Quiz user id", userId)
      const response = await axios.put(`http://localhost:5050/api/users/user/quiz/${userId}/quiz-taken`, {
        quizTaken: quizTaken
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('User updated:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating quizTaken field:', error.response ? error.response.data : error.message);
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);
