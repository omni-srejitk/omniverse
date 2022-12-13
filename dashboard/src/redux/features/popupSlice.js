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
      state.popups.durationFilter = false;
      state.popups.productFilter = false;
      state.popups.datePicker = false;
    },
    setDurationPopup: (state, action) => {
      state.popups.profile = false;
      state.popups.durationFilter = action.payload;
      state.popups.productFilter = false;
      state.popups.datePicker = false;
    },
    setProductPopup: (state, action) => {
      state.popups.profile = false;
      state.popups.durationFilter = false;
      state.popups.productFilter = action.payload;
      state.popups.datePicker = false;
    },
    setDatePickerPopup: (state, action) => {
      state.popups.profile = false;
      state.popups.durationFilter = false;
      state.popups.productFilter = false;
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
