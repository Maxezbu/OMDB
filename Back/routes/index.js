const express = require("express");
const route = express.Router();
const { User, Favorites } = require("../models/index");
const passport = require("passport");

route.post("/register", (req, res) => {
  User.create(req.body).then((data) => res.status(201).send(data));
});

route.post("/login", passport.authenticate("local"), (req, res) => {
  res.send(req.user);
});

route.post("/movies/logout", (req, res) => {
  req.logOut();

  res.sendStatus(200);
});

route.get("/favorites/:id", (req, res) => {
  if (req.user) {
    return Favorites.findAll({
      where: {
        favId: req.params.id,
      },
    }).then((mess) => res.status(200).json(mess));
  }
});

route.post("/favorites", (req, res) => {
  Favorites.create(req.body)
    .then((data) => sendStatus(201).send(data))
    .catch((err) => res.send(err));
});

route.delete("/favorites/:id", (req, res) => {
  Favorites.findByPk(req.params.id)
    .then((data) => data.destroy())

    .then(() => res.sendStatus(200))
    .catch((err) => res.send(err));
});

route.get("/me", (req, res) => {
  if (req.user) {
    res.send(req.user);
  }
  res.sendStatus(401);
});

module.exports = route;
