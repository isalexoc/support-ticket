import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSilce";
import ticketReducer from "../features/tickets/ticketSlice";
import noteReducer from "../features/notes/noteSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tickets: ticketReducer,
    notes: noteReducer,
  },
});
