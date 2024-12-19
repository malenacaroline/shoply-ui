const controller = require("../controllers/product");

module.exports = (router) => {
  router.route("/products").get(controller.getAll);
  router.route("/products/:id").post(controller.getOne);
  router.route("/products").post(controller.create);
  router.route("/products").put(controller.update);
  router.route("/products/:id").delete(controller.delete);
};


