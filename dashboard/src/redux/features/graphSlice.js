import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cumlative_units: [],
  cumlative_sum: [],
};

const graphSlice = createSlice({
  name: 'graph',
  initialState,
  reducers: {
    setCumlativeUnits: (state, { payload }) => {
      state.cumlative_units = payload;
    },
    setCumlativeSum: (state, { payload }) => {
      state.cumlative_sum = payload;
    },
    resetGraphSlice: (state) =>
      (state = {
        cumlative_units: [],
        cumlative_sum: [],
      }),
  },
});

export const { setCumlativeSum, setCumlativeUnits, resetGraphSlice } =
  graphSlice.actions;

export default graphSlice.reducer;
