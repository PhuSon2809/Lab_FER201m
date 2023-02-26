import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import filmReducer from "./film/filmSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    film: filmReducer,
  },
});
