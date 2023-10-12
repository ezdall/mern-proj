import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null },
  reducer: {
    setCredentials(state, action) {
      const { accessToken } = action.payload;

      // eslint-disable-next-line
      state.token = accessToken;
      // return { ...state, token: accessToken };
    },
    logOut(state, action) {
      // state.token = null
      return { ...state, toke: null };
    }
  }
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = state => state.auth.token;
