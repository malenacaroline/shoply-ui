import db from "./models/index.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import seedDatabase from "./utils/seed.js";
import { config } from "dotenv";

config();
const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

db.sequelize
  .sync()
  .then(async () => {
    console.log("Models synchronized successfully.");

    const userCount = await db.User.count();
    const productCount = await db.Product.count();
    const cartCount = await db.Cart.count();

    if (userCount === 0 && productCount === 0 && cartCount === 0) {
      await seedDatabase();
    }
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

export default app;
