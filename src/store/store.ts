import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer/reducer";
import logger from "./middleware/logger";

const store = () => {
  return configureStore({
    reducer: reducer,
    middleware: [...getDefaultMiddleware(), logger],
  });
};

export default store;
