export const selectLoginStatus = (state) => state.auth.isLogged;

export const selectBrandToken = (state) => state.auth.token;

export const selectBrandName = (state) => state.auth.name;

export const selectLoadingState = (state) => state.auth.isLoading;
