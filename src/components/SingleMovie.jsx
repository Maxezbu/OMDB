import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";

import { setMovie } from "../store/singleMovie";

import { Button, Typography, Box, Grid } from "@material-ui/core";

export const SingleMovie = (props) => {
  const param = props.match.params.title;
  const movie = useSelector((state) => state.singleMovie);

  const user = useSelector((state) => state.user);
  console.log(movie.imdbID);
  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?apikey=20dac387&t=${param}`)

      .then((response) => response.data)
      .then((data) => data)
      .then((data) => dispatch(setMovie(data)));
  }, []);

  const handleFavs = () => {
    axios.post("/api/favorites", {
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
      favId: user.id,
    });
  };

  return (
    <>
      <Grid
        container
        style={{ padding: 10 }}
        spacing={2}
        direction="row"
        justify="space-evenly"
        alignItems="flex-start"
      >
        <Button
          color="secondary"
          variant="contained"
          disableElevation
          onClick={handleFavs}
          size="small"
        >
          AGREGAR A FAVORITOS
        </Button>

        <Button
          color="secondary"
          variant="contained"
          disableElevation
          onClick={() => history.push("/favorites")}
          size="small"
        >
          MIS FAVORITOS
        </Button>
      </Grid>

      <Box
        border={3}
        borderColor="primary.main"
        borderRadius={16}
        bgcolor="black"
      >
        <Grid
          container
          style={{ padding: 20 }}
          spacing={2}
          direction="row"
          justify="space-evenly"
          alignItems="flex-start"
        >
          <Grid item nowrap style={{ padding: 10 }} xs md={4}>
            <Typography variant="h3" color="primary">
              {movie.Title}
            </Typography>
            <img src={movie.Poster} alt={movie.Title} />
          </Grid>
          <Grid item nowrap style={{ padding: 10 }} xs md={4}>
            <Typography variant="h3" color="primary" align="center">
              Description
            </Typography>
            {movie.Plot}
            <h3>Year and Genre</h3>
            {movie.Year}
            {movie.Genre}
            <h3>Language</h3>
            {movie.Language}
            <h3>Runtime</h3>
            {movie.Runtime}
            <h3>Actors</h3>
            {movie.Actors}
            <h3>Ratings</h3>
            {movie.Ratings &&
              movie.Ratings.map((rating) => {
                return (
                  <section key={movie.imdbID + movie.Ratings.indexOf(rating)}>
                    <h3>{rating.Source}</h3>
                    {rating.Value}
                  </section>
                );
              })}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
