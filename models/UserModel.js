const { Sequelize } = require( "sequelize");
const db = require( "../config/Database.js");

const User = db.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

db.sync().then(() => console.log("Database synced"));

module.exports = User;
