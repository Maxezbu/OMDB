const S = require("sequelize");
const db = require("../db/db");
const bcrypt = require("bcrypt");

class User extends S.Model {}

User.init(
  {
    email: {
      type: S.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: S.TEXT,
      allowNull: false,
    },
    salt: {
      type: S.STRING,
    },
  },
  { sequelize: db, nameModel: "user", timestamps: false }
);

User.prototype.hash = function (password, salt) {
  return bcrypt.hash(password, salt);
};

User.beforeCreate((user) => {
  return bcrypt
    .genSalt(16)
    .then((salt) => {
      user.salt = salt;
      return user.hash(user.password, user.salt);
    })
    .then((hash) => {
      user.password = hash;
    });
});

module.exports = User;
