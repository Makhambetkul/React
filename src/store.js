import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./features/movies/moviesSlice";

export const store = configureStore({
  reducer: {
    movie: movieReducer,
  },
});
