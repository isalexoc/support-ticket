import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSilce";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
