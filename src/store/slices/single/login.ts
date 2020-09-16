import { createSlice } from "@reduxjs/toolkit";
import generateState from "../../../utility/State";

const initialState = generateState().Login.Authenticate;

const slice = createSlice({
  name: "Login",
  initialState: initialState,
  reducers: {
    authenticate_reducer: (state, action) => {
      const newstate = { ...state };
      newstate.isAuthenticated = action.payload.isAuthenticated;
      return newstate;
    },
  },
});

export const { authenticate_reducer } = slice.actions;
export default slice.reducer;
