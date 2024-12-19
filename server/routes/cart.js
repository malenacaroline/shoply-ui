const controller = require("../controllers/cart");

module.exports = (router) => {
  router.route("/carts").get(controller.getAll);
  router.route("/carts/:id").get(controller.getOne);
  router.route("/carts").post(controller.create);
  router.route("/carts/:id").put(controller.update);
  router.route("/carts/:id").delete(controller.delete);
};