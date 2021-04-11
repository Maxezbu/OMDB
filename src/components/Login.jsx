import React, { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setEmail } from "../store/email";
import { setPassword } from "../store/password";
import { setUser } from "../store/user";

import { Button, Box, Grid } from "@material-ui/core";

export const Login = () => {
  const email = useSelector((state) => state.email);
  const password = useSelector((state) => state.password);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      axios
        .post("/api/login", {
          email,
          password,
        })
        .then(({ data }) => {
          dispatch(setUser(data));
          history.push("/movies");
          setLoading(false);
        })
        .catch(() => {
          alert("Usuario o contraseña incorrecto");
          setLoading(false);
        });
    } catch {
      console.log("OCURRIÓ UN ERROR");
    }
  };

  const handleChange = (e) => {
    const type = e.target.type;
    const value = e.target.value;
    if (type === "email") {
      dispatch(setEmail(value));
    } else if (type === "password") {
      dispatch(setPassword(value));
    }
  };

  if (loading)
    return (
      <Box border={3} borderColor="primary.main" borderRadius={8}>
        <Grid container justify="center" style={{ padding: 10 }} border={3}>
          <img src="descarga.jpeg" alt="Loading" />
        </Grid>
      </Box>
    );

  return (
    <>
      <Grid container justify="center" style={{ padding: 10 }}>
        <form onSubmit={handleSubmit}>
          <div className="col-md-10">
            <input
              className="form-control"
              placeholder="ingrese su email"
              onChange={handleChange}
              type="email"
              value={email}
            />
          </div>
          <div className="col-md-10">
            <input
              className="form-control"
              placeholder="ingrese su contraseña"
              onChange={handleChange}
              type="password"
            />
          </div>
          <div className="col-md-10">
            <Grid item style={{ padding: 20 }}>
              <button className="btn btn-primary" type="submit">
                INGRESAR
              </button>
            </Grid>
          </div>
          <div className="col-md-10">
            <Grid item style={{ padding: 10 }}>
              <Link to="/register">
                <Button color="secondary" variant="contained" disableElevation>
                  SUSCRIBIRME
                </Button>
              </Link>
            </Grid>
          </div>
        </form>
      </Grid>
    </>
  );
};
