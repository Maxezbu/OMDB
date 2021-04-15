import React, { useEffect, useState } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { setFavs } from "../store/favs";

import { me } from "../store/user";

import { Button, Grid, Typography, Box } from "@material-ui/core";

export const Favorites = () => {
  const [loading, setLoading] = useState(false);
  const favs = useSelector((state) => state.favorites);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  console.log("---------------------", user);

  useEffect(() => {
    axios
      .get(`/api/favorites/${user.id}`)
      .then(({ data }) => dispatch(setFavs(data)));
  }, []);

  const handleFavs = (id) => {
    setLoading(true);
    return axios.delete(`/api/favorites/${id}`).then(() => {
      alert("quitaste la película de tus favoritos");
      setLoading(false);
    });
  };

  if (loading)
    return (
      <Box border={3} borderColor="primary.main" borderRadius={8}>
        <Grid container justify="center" style={{ padding: 10 }} border={3}>
          <img src="borrando.jpeg" alt="Loading" />
        </Grid>
      </Box>
    );

  return (
    <>
      <Box bgcolor="teal">
        <Box
          border={3}
          borderColor="primary.main"
          borderRadius={8}
          bgcolor="black "
          style={{ margin: 10 }}
        >
          <Typography variant="h4" color="secondary" align="center">
            FAVORITOS
          </Typography>
        </Box>

        <Grid
          container
          style={{ padding: 10 }}
          spacing={2}
          direction="row"
          justify="space-evenly"
          alignItems="flex-start"
        >
          {favs &&
            favs.map((fav) => {
              return (
                <Box
                  border={3}
                  borderColor="primary.main"
                  borderRadius={16}
                  bgcolor="black"
                  xs
                >
                  <Grid item nowrap style={{ padding: 10 }}>
                    <Typography variant="h6" color="primary">
                      {fav.title}
                    </Typography>
                    <img src={fav.poster} alt={fav.title} />
                  </Grid>
                  <Button
                    color="secondary"
                    variant="contained"
                    disableElevation
                    onClick={() => handleFavs(fav.id)}
                    size="small"
                  >
                    BORRAR
                  </Button>
                </Box>
              );
            })}
        </Grid>
      </Box>
    </>
  );
};
