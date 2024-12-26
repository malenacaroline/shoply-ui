const controller = require("../controllers/cart");

module.exports = (router) => {
  router.route("/carts").get(controller.getAll);
  router.route("/carts/:cartId/items").post(controller.addItem);
  router.route("/carts/:cartId/items/:itemId").delete(controller.removeItem);
  router.route("/carts/:cartId/items/:itemId").put(controller.updateQuantity);
};