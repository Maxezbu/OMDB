import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import moviesReducer from "./movies";

import movieReducer from "./singleMovie";
import userReducer from "./user";
import passwordReducer from "./password";
import emailReducer from "./email";
import favsReducer from "./favs";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    movies: moviesReducer,
    singleMovie: movieReducer,
    user: userReducer,
    password: passwordReducer,
    email: emailReducer,
    favorites: favsReducer,
  },
});
export default store;
