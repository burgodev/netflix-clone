import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../state/userSlice";

export const store = configureStore({
  reducer: userReducer,
});
