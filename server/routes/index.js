import product from './product.js';
import user from './user.js';
import cart from './cart.js';

export default (router) => {
  product(router);
  user(router);
  cart(router);

  return router;
};