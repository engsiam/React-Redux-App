import { configureStore } from "@reduxjs/toolkit";
//add reducer
import authReducer from "../features/authSlice.js";
import postReducer from "../features/postsSlice.js";

export const store = configureStore({
  reducer: {
    posts: postReducer,
    auth: authReducer,
  },
});

export default store;
