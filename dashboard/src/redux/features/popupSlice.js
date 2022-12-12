import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  popups: {
    profile: false,
    durationFilter: false,
    productFilter: false,
    datePicker: false,
  },
};

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    setProfilePopup: (state, action) => {
      state.popups.profile = action.payload;
    },
    setDurationPopup: (state, action) => {
      state.popups.durationFilter = action.payload;
    },
    setProductPopup: (state, action) => {
      state.popups.productFilter = action.payload;
    },
    setDatePickerPopup: (state, action) => {
      state.popups.datePicker = action.payload;
    },
    closeAll: (state) =>
      (state.popups = {
        profile: false,
        durationFilter: false,
        productFilter: false,
        datePicker: false,
      }),
  },
});

export const {
  setProfilePopup,
  setDatePickerPopup,
  setDurationPopup,
  setProductPopup,
} = popupSlice.actions;

export default popupSlice.reducer;
