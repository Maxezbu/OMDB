import { createAction, createReducer } from "@reduxjs/toolkit";

export const setMovies = createAction("setMovies");

const moviesReducer = createReducer([], {
  [setMovies]: (state, action) => (state = action.payload),
});

export default moviesReducer;
