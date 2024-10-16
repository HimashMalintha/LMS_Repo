import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  backend: "http://localhost:5050",
  isLogged: false,
  role: '',
  status: false,
  token: "",
  error: null,
  user:''
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setIsLogged: (state, action) => {
      state.isLogged = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
        state.user = action.payload;
      },
  },
});

export const { setIsLogged, setRole, setStatus, setToken, setUser } = authenticationSlice.actions;

export default authenticationSlice.reducer;
