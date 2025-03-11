import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  userName: null,
  isAuthenticated: false,
  token: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    /* eslint-disable @typescript-eslint/no-unused-expressions */
    login: (state, action) => {
      state.userId = action.payload.userId,
      state.userName = action.payload.userName,
      state.isAuthenticated = true;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.userId = null;
      state.userName = null;
      state.isAuthenticated = false;
      state.token = null;
    },
  }
})

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;