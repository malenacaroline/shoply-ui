const product = require("./product");

module.exports = (router) => {
  product(router);

  return router;
};
