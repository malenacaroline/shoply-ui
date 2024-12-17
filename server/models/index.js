const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB,
  process.env.USERNAME,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: process.env.dialect,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Require the models
db.product = require("./product")(sequelize, Sequelize);

module.exports = db;