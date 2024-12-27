import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
import User from './user.js';
import Product from './product.js';
import Cart from './cart.js';
import CartItem from './cartItem.js';

config();

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

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User(sequelize, Sequelize);
db.Product = Product(sequelize, Sequelize);
db.Cart = Cart(sequelize, Sequelize);
db.CartItem = CartItem(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;