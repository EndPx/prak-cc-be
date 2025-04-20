const { Sequelize } = require("sequelize");

const db = new Sequelize("notes_db", "root", "",
  {
    host: "34.42.153.66",
    dialect: "mysql",
  }
);

module.exports = db;