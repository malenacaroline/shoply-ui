const db = require("./models");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const router = express.Router();
app.use(cookieParser());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(bodyParser.json({ limit: "20mb" }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "Work in progress" });
});

const routes = require("./routes/index");
const HTTP_PORT = process.env.HTTP_PORT || 3002;

routes(router);
app.use("/api", router);

db.sequelize.sync()
  .then(() => {
    console.log("Models synchronized successfully.");
  })
  .catch((error) => {
    console.error("Unable to synchronize the database:", error);
  });

app.listen(HTTP_PORT, "0.0.0.0", () => {
  console.log(`Server ready at http://localhost:${HTTP_PORT}.`);
});