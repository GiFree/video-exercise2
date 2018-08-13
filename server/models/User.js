const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    favorites: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      defaultValue: [],
    }
  });

  User.hook('beforeCreate', (user, options) => {
    return bcrypt.hash(user.hash, 10)
      .then((hash) => {
        user.hash = hash;
      });
  })

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hash);
  }

  User.prototype.generateJWT = function () {
    const payload = {
      id: this.id,
      username: this.username
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24
    });
  }

  return User;
}