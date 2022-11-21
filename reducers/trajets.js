import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { },
};

export const trajetsSlice = createSlice({
  name: 'trajets',
  initialState,
  reducers: {
    addDeparture: (state, action) => {
      state.value.departure = action.payload;
    },
    addArrival: (state, action) => {
      state.value.arrival = action.payload;
    },
    addTime: (state, action) => {
      state.value.departureTime = action.payload;
    },
    addJourney: (state, action) => {
    state.value.sections = action.payload;
    },
  },
});

export const { addDeparture, addArrival, addJourney, addTime } = trajetsSlice.actions;
export default trajetsSlice.reducer;
