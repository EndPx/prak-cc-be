require("dotenv").config();

const { Sequelize } = require("sequelize");

const db = new Sequelize(process.env._DB_NAME, process.env._DB_USER, process.env._DB_PASS, {
  host: process.env._DB_HOST,
  dialect: "mysql",
});

module.exports = db;