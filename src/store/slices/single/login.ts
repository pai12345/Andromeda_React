import { createSlice } from "@reduxjs/toolkit";
import generateState from "../../../utility/State";
import generateFunctions from "../../../utility/Functions";

const initialState = generateState().Login.Authenticate;

const slice = createSlice({
  name: "Auth",
  initialState: initialState,
  reducers: {
    authenticate_reducer: (state, action) => {
      const newstate = { ...state };
      const valid = generateFunctions().Authenticate_User(
        action.payload.isAuthenticated
      );
      newstate.isAuthenticated = valid;
      return newstate;
    },
  },
});

export const { authenticate_reducer } = slice.actions;
export default slice.reducer;
