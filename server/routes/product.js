import * as controller from '../controllers/product.js';

export default (router) => {
  router.get('/products', controller.getAll);
};