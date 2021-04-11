import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../store/movies";
import { setUser } from "../store/user";
import { Button, Grid, Typography, Box } from "@material-ui/core";

export const Movies = () => {
  const movies = useSelector((state) => state.movies);
  const user = useSelector((state) => state.user);
  //////////////////////
  const [num, setNum] = useState(2);
  const [buscador, setBuscador] = useState("");
  const [type, setType] = useState("");
  ////////////////////////
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    return axios
      .get(
        `https://www.omdbapi.com/?apikey=20dac387&s=${
          buscador || "dragon ball"
        }&type=${type}`
      )
      .then((response) => response.data)
      .then((data) => data.Search)
      .then((movies) => dispatch(setMovies(movies)));
  }, [buscador, type]);

  // funciones

  const handleSearch = (e) => {
    const value = e.target.value;
    const input = e.target.name;
    if (input === "title") {
      return setBuscador(value);
    } else if (input === "type") {
      return setType(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleLogout = () => {
    axios
      .post("/api/movies/logout", dispatch(setUser()))
      .then(() => (window.location.href = "/"));
  };

  const handleNextPage = () => {
    axios
      .get(
        `https://www.omdbapi.com/?apikey=20dac387&s=${buscador}&type=${
          type || "movie"
        }&page=${num}`
      )
      .then((response) => response.data)
      .then((data) => data.Search)
      .then((movies) => dispatch(setMovies(movies)));
    setNum(num + 1);
  };

  const handleBackPage = () => {
    axios
      .get(
        `https://www.omdbapi.com/?apikey=20dac387&s=${buscador}&type=${type}&page=${num}`
      )
      .then((response) => response.data)
      .then((data) => data.Search)
      .then((movies) => dispatch(setMovies(movies)));
    setNum(num - 1);
  };

  if (user !== null) {
    return (
      <>
        <Box bgcolor="black">
          <Grid container justify="flex-end" style={{ padding: 20 }}>
            <Button
              color="secondary"
              variant="contained"
              onClick={handleLogout}
            >
              SALIR
            </Button>
          </Grid>

          <form onSubmit={handleSubmit}>
            <div className="col-md-5">
              <Typography variant="h4">Título</Typography>
              <input
                className="form-control"
                placeholder="ingrese el título que busca"
                type="text"
                value={buscador}
                onChange={handleSearch}
                name="title"
              />
            </div>

            <div className="col-md-4">
              <Typography variant="h5">Típo</Typography>

              <input
                className="form-control"
                placeholder="movie/series/episode"
                type="text"
                value={type}
                onChange={handleSearch}
                name="type"
              />
            </div>
          </form>
          <Grid
            container
            style={{ padding: 20 }}
            spacing={2}
            direction="row"
            justify="space-evenly"
            alignItems="flex-start"
          >
            {movies &&
              movies.map((movie) => {
                return (
                  <Box border={2} borderColor="blue" borderRadius={16}>
                    <Grid
                      item
                      nowrap
                      style={{ padding: 10 }}
                      key={movie.imdbID}
                      onClick={() => history.push(`/movie/${movie.Title}`)}
                      xs={4}
                    >
                      <Typography>
                        <h3>{movie.Title}</h3>
                      </Typography>

                      <img src={movie && movie.Poster} alt={movie.Title} />

                      <Typography
                        variant="h6"
                        color="textSecondary"
                        align="center"
                      >
                        {movie.Year}
                      </Typography>
                    </Grid>
                  </Box>
                );
              })}
          </Grid>
          <Grid
            container
            style={{ padding: 10 }}
            spacing={2}
            direction="row"
            justify="space-between"
            alignItems="flex-start"
          >
            <Button
              color="secondary"
              variant="contained"
              onClick={handleBackPage}
            >
              ANTERIOR
            </Button>
            <Button
              color="secondary"
              variant="contained"
              onClick={handleNextPage}
            >
              SIGUIENTE
            </Button>
          </Grid>
        </Box>
      </>
    );
  }

  return <>HAS INGRESADO UN USUARIO NO VÁLIDO</>;
};
