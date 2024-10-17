import { createSlice } from '@reduxjs/toolkit';
import { fetchQuestions, submitQuiz, updateQuizTaken } from '../actions/quizAction';

const initialState = {
  loading: true,
  countdown: 4,
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: {},
  questionnaire: 1,
  chosenGroup: [],
  quizTaken: false,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuestionnaire: (state, action) => {
      state.questionnaire = action.payload;
      state.currentQuestionIndex = 0;
      state.userAnswers = {};
      state.loading = true;
      state.countdown = 4;
    },
    handleAnswer: (state, action) => {
      const { questionId, answer } = action.payload;
      state.userAnswers[questionId] = answer;
    },
    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
      }
    },
    previousQuestion: (state) => {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
      }
    },
    setCountdown: (state, action) => {
      state.countdown = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    appendChosenSubGroup: (state, action) => {
      if (!state.chosenGroup.includes(action.payload)) {
        state.chosenGroup.push(action.payload);
      }
    },
    setQuizTaken: (state, action) => {
      state.quizTaken = action.payload; // Correct the field being updated
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.questions = action.payload;
        state.loading = false;
      })
      .addCase(fetchQuestions.rejected, (state) => {
        state.loading = false;
      })
      .addCase(submitQuiz.fulfilled, (state, action) => {
        state.quizTaken = true; // Set quizTaken to true when quiz is submitted
      })
      .addCase(updateQuizTaken.fulfilled, (state, action) => {
        state.quizTaken = action.payload.quizTaken; // Update state based on API response
      });
  },
});

export const {
  setQuestionnaire,
  handleAnswer,
  nextQuestion,
  previousQuestion,
  setCountdown,
  setLoading,
  appendChosenSubGroup,
  setQuizTaken,
} = quizSlice.actions;

export default quizSlice.reducer;
