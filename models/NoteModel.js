const { Sequelize } = require( "sequelize");
const db = require( "../config/Database.js");

const Note = db.define("note", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  userId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

db.sync().then(() => console.log("Database synced"));

module.exports = Note;
