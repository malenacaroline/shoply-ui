const controller = require("../controllers/user");

module.exports = (router) => {
  router.route("/users").get(controller.getAll);
  router.route("/users").post(controller.create);
  router.route("/users/login").post(controller.login);
};