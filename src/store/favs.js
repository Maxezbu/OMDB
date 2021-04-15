import { createAction, createReducer } from "@reduxjs/toolkit";

export const setFavs = createAction("setFavs");

const favsReducer = createReducer([], {
  [setFavs]: (state, action) => action.payload,
});

export default favsReducer;
