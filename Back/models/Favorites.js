const S = require("sequelize");
const db = require("../db/db");

class Favorites extends S.Model {}

Favorites.init(
  {
    title: {
      type: S.STRING,
      allowNull: false,
    },
    year: {
      type: S.STRING,
      allowNull: false,
    },
    poster: {
      type: S.STRING,
    },
  },
  { sequelize: db, nameModel: "favorite", timestamps: false }
);

module.exports = Favorites;
