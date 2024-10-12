import { configureStore } from "@reduxjs/toolkit";
import { emailReducer } from "../features/email/emailSlice";

const store = configureStore({
  reducer: {
    email: emailReducer,
  },
});

export default store;
