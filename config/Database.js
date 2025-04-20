const { Sequelize } = require("sequelize");

const db = new Sequelize("notes_db", "admin", "praktikumtcc",
  {
    host: "34.173.149.93",
    dialect: "mysql",
  }
);

module.exports = db;