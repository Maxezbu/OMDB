import { createAction, createReducer } from "@reduxjs/toolkit";

export const setEmail = createAction("setEmail");

const emailReducer = createReducer("", {
  [setEmail]: (state, action) => (state = action.payload),
});

export default emailReducer;
