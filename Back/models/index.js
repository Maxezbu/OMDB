const User = require("./User");
const Favorites = require("./Favorites");

Favorites.belongsTo(User, { as: "fav" });
User.hasMany(Favorites);

module.exports = { User, Favorites };
