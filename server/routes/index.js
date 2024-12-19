const product = require("./product");
const user = require("./user");
const cart = require("./cart");

module.exports = (router) => {
  product(router);
  user(router);
  cart(router);

  return router;
};