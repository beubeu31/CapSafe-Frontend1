import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pinDeparture: [], pinArrival: []
};

export const positionSlice = createSlice({
  name: "positionPin",
  initialState,
  reducers: {
    positionDeparture: (state, action) => {
      state.pinDeparture = action.payload;
    },
    positionArrival: (state, action) => {
      state.pinArrival = action.payload;
    },
  },
});

export const { positionDeparture, positionArrival } = positionSlice.actions;
export default positionSlice.reducer;
