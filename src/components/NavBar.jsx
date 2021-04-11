import React from "react";
import { Link, BrowserRouter } from "react-router-dom";
import { Button } from "@material-ui/core";
import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  menubutton: {
    marginRight: theme.spacing(2),
  },
  sigIn: {
    flexGrow: 1,
  },
}));

export const Navbar = () => {
  const classes = useStyles();
  return (
    <div>
      <AppBar>
        <Toolbar>
          <Typography variant="h4" className={classes.sigIn}>
            OMDB
          </Typography>
          <BrowserRouter></BrowserRouter>
        </Toolbar>
      </AppBar>

      <div className={classes.offset}> </div>
    </div>
  );
};
