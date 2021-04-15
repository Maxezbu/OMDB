import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
import axios from "axios";

export const setUser = createAction("setUser");
export const me = createAsyncThunk("me", () => {
  return axios.get("api/me").then((data) => {
    console.log("///////////////////", data);
    return data.data;
  });
});

const userReducer = createReducer(
  {},
  {
    [setUser]: (state, action) => action.payload,
    [me]: (state, action) => action.payload,
  }
);

export default userReducer;
