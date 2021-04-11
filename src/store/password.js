import { createAction, createReducer } from "@reduxjs/toolkit";

export const setPassword = createAction("setPassword");

const passwordReducer = createReducer("", {
  [setPassword]: (state, action) => (state = action.payload),
});

export default passwordReducer;
