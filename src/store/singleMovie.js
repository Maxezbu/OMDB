import { createAction, createReducer } from "@reduxjs/toolkit";

export const setMovie = createAction("setMovie");

const movieReducer = createReducer([], {
  [setMovie]: (state, action) => (state = action.payload),
});

export default movieReducer;
