import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '192.168.1.21',
};

export const urlSlice = createSlice({
  name: 'url',
  initialState,
  reducers: {
    url: (state, action) => {
       state.value = '192.168.1.21'
    },
  },
});

export const { url } = urlSlice.actions;
export default urlSlice.reducer;


