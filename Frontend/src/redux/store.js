// store.js
import { configureStore } from '@reduxjs/toolkit';
import quizReducer from './Quiz/slices/quizSlice';
import authenticationReducer from './Authentication/slices/authenticationSlice';
import chatReducer from './Chat/slices/chatSlice';

const store = configureStore({
  reducer: {
    quiz: quizReducer,
    authentication: authenticationReducer,
    chat: chatReducer
  },
});

export default store;
