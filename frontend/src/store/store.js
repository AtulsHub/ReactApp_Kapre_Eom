import { configureStore } from "@reduxjs/toolkit";
import { login, logout } from "./userSlice.js";

const store = configureStore({
  reducer: {
    login,
    logout,
  },
});

export default store;
