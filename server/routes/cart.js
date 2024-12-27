import * as controller from '../controllers/cart.js';

export default (router) => {
  router.get('/carts/:userId', controller.getCartByUserId);
  router.post('/carts/:cartId', controller.updateItemQuantity);
};