import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  token: '',
  isLogged: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.token = action.payload;
    },
    setloginStatus: (state, action) => {
      state.isLogged = action.payload;
    },
    setBrandName: (state, action) => {
      state.name = action.payload;
    },

    setLoadingState: (state, action) => {
      state.isLoading = action.payload;
    },
    resetAuthSlice: (state) =>
      (state = {
        name: '',
        token: '',
        isLogged: false,
        isLoading: false,
      }),
  },
});

export const {
  setAuthToken,
  setloginStatus,
  setBrandName,
  resetAuthStatus,
  setLoadingState,
  resetAuthSlice,
} = authSlice.actions;

export default authSlice.reducer;
