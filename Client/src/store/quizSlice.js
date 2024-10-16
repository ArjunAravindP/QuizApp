// src/quizSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quizData: [],
  currentQuizIndex: 0,
  selectedOption: null,
  score: 0,
  quizComplete: false,
  error: null,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuizData: (state, action) => {
      state.quizData = action.payload;
    },
    setCurrentQuizIndex: (state, action) => {
      state.currentQuizIndex = action.payload; // Set index from action payload
    },
    selectOption: (state, action) => {
      state.selectedOption = action.payload; // Set selected option from action payload
    },
    incrementScore: (state) => {
      state.score += 1; // Increment the score
    },
    completeQuiz: (state) => {
      state.quizComplete = true; // Set quiz completion state
    },
    resetQuiz: (state) => {
      // Reset the quiz to initial state
      state.currentQuizIndex = 0;
      state.selectedOption = null;
      state.score = 0;
      state.quizComplete = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload; // Set error message
    },
  },
});

export const {
  setQuizData,
  setCurrentQuizIndex,
  selectOption,
  incrementScore,
  completeQuiz,
  resetQuiz,
  setError,
} = quizSlice.actions;

export default quizSlice.reducer;
