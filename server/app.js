const db = require("./models");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const routes = require("./routes/index");
const seedDatabase = require('./utils/seed');
require("dotenv").config();

const app = express();
const router = express.Router();

app.use(cookieParser());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

db.sequelize
  .sync({ force: true })
  .then(async () => {
    console.log("Models synchronized successfully.");
    await seedDatabase();
  })
  .catch((error) => {
    console.error("Unable to synchronize the database:", error);
  });

routes(router);
app.use("/api", router);

const HTTP_PORT = process.env.HTTP_PORT || 3002;

app.listen(HTTP_PORT, () => {
  console.log(`Server ready at http://localhost:${HTTP_PORT}.`);
});
