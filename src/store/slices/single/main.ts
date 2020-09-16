import { createSlice } from "@reduxjs/toolkit";
import generateState from "../../../utility/State";

const initialState = generateState().MainPage;

const slice = createSlice({
  name: "MainPage",
  initialState: initialState,
  reducers: {
    selectmode_reducer: (_state, action) => {
      const newstate = action.payload.SelectionState;
      return newstate;
    },
  },
});

export const { selectmode_reducer } = slice.actions;
export default slice.reducer;
