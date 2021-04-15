import React, { useEffect } from "react";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { Favorites } from "../components/Favorites";
import { SingleMovie } from "../components/SingleMovie";
import { Movies } from "../components/Movies";
import { Register } from "../components/Register";
import { Login } from "../components/Login";
import { Navbar } from "../components/NavBar";
import { me } from "../store/user";
import { useDispatch } from "react-redux";

export const Main = () => {
  return (
    <>
      <Navbar />

      <BrowserRouter>
        <Switch>
          <Route path="/movie/:title" component={SingleMovie} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/movies" component={Movies} />
          <Route path="/favorites" component={Favorites} />
          <Redirect to="/login" />
        </Switch>
      </BrowserRouter>
    </>
  );
};
