import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  backend: "http://localhost:5050",
  chatRooms: [],
  messages: {}
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatRooms: (state, action) => {
      state.chatRooms = action.payload;
    },
    setMessages: (state, action) => {
      state.messages[action.payload.groupId] = action.payload.messages;
    },
  },
});

export const { setChatRooms, setMessages } = chatSlice.actions;

export default chatSlice.reducer;
