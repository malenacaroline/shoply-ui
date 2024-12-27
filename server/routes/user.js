import * as controller from '../controllers/user.js';

export default (router) => {
  router.route("/users").get(controller.getAll);
  router.route("/users/login").post(controller.login);
};