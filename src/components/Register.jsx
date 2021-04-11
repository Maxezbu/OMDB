import React, { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setEmail } from "../store/email";
import { setPassword } from "../store/password";

import { Button, Grid, Box } from "@material-ui/core";

export const Register = () => {
  const email = useSelector((state) => state.email);
  const password = useSelector((state) => state.password);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/api/register", {
        email,
        password,
      })
      .then(() => {
        alert("Te registraste con éxito");
        history.push("/login");
        setLoading(false);
      });
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
      <Grid container style={{ padding: 10 }}>
        <form className="row" onSubmit={handleSubmit}>
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="ingrese un email"
              onChange={handleChange}
              type="email"
              value={email}
            />
          </div>
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="ingrese una contraseña"
              onChange={handleChange}
              type="password"
            />
          </div>
          <div className="col-md-3">
            <button className="btn btn-primary">REGISTRARME</button>
          </div>
          <div className="col-md-3">
            <Link to="/login">
              <Button color="secondary" variant="contained" disableElevation>
                YA TENGO CUENTA
              </Button>
            </Link>
          </div>
        </form>
      </Grid>
    </>
  );
};
