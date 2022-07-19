import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  name: "Osama",
  isLogged: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logInOut: (state, action) => {
      console.log("action is working");
      state.isLogged = !state.isLogged;
    },
  },
  extraReducers: {},
});

export const { logInOut } = authSlice.actions;
export default authSlice.reducer;
