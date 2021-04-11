import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUser = createAction("setUser");

const userReducer = createReducer(null, {
  [setUser]: (state, action) => (state = action.payload),
});

export default userReducer;
