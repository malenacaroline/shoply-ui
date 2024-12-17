const controller = require("../controllers/product");

module.exports = (router) => {
  router.route("/products").get(controller.showAll);
  router.route("/products/:id").post(controller.showOne);
  router.route("/products").post(controller.createRecord);
  router.route("/products").put(controller.updateRecord);
  router.route("/products/:id").delete(controller.deleteRecord);
};


