const { Sequelize } = require("sequelize");

const sq = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.HOST,
  dialect: "mysql",
});

module.exports = sq;
