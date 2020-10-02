import { createSlice } from "@reduxjs/toolkit";
import generateState from "../../../utility/State";
import generateFunctions from "../../../utility/Functions";

const initialState = generateState().User_Authenticated;

const slice = createSlice({
  name: "User_Authentication",
  initialState: initialState,
  reducers: {
    userauthentication_reducer: (state, action) => {
      const newstate = { ...state };
      const valid = generateFunctions().Authenticate_User(action.type);
      if (valid) {
        newstate.isAuthenticated = true;
      } else {
        newstate.isAuthenticated = false;
      }
      return newstate;
    },
  },
});

export const { userauthentication_reducer } = slice.actions;
export default slice.reducer;
