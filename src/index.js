import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Main } from "./containers/Main";
import store from "./store/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById("root")
);
