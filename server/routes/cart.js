const controller = require("../controllers/cart");

module.exports = (router) => {
  router.get('/carts/:userId', controller.getCartByUserId);
  router.route("/carts/:cartId").post(controller.updateItemQuantity);
};