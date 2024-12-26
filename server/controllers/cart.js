const db = require('../models');


exports.getAll = async (req, res) => {
  try {
    const carts = await db.Cart.findAll({
      include: [
        {
          model: db.User,
          as: 'user',
          attributes: ['id', 'name', 'type', 'discounts']
        },
        {
          model: db.CartItem,
          as: 'items',
          include: [{
            model: db.Product,
            as: 'product',
            attributes: ['id', 'name', 'price']
          }]
        }
      ]
    });

    if (!carts || carts.length === 0) {
      return res.status(404).send({ 
        message: "No carts found" 
      });
    }

    const formattedCarts = carts.map(cart => {
      const cartData = cart.toJSON();
      let total = cartData.items.reduce((sum, item) => 
        sum + item.subtotal, 0
      );

      // Apply user discounts
      if (cartData.user.discounts.includes('vipDiscount')) {
        total *= 0.9; // 10% VIP discount
      }

      if (cartData.user.discounts.includes('get3For2Discount')) {
        cartData.items.forEach(item => {
          const discountQty = Math.floor(item.quantity / 3);
          total -= (discountQty * item.price);
        });
      }

      return {
        ...cartData,
        total: parseFloat(total.toFixed(2))
      };
    });

    res.send(formattedCarts);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error retrieving carts"
    });
  }
};

exports.addItem = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { productId, quantity } = req.body;

    // Find or create cart item
    const [cartItem, created] = await db.CartItem.findOrCreate({
      where: { cartId, productId },
      defaults: {
        quantity,
        price: (await db.Product.findByPk(productId)).price,
      }
    });

    if (!created) {
      cartItem.quantity += quantity;
      cartItem.subtotal = cartItem.price * cartItem.quantity;
      await cartItem.save();
    }

    // Recalculate cart total
    await updateCartTotal(cartId);

    res.send(await getCartWithItems(cartId));
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.removeItem = async (req, res) => {
  try {
    const { cartId, itemId } = req.params;
    
    await db.CartItem.destroy({
      where: { id: itemId, cartId }
    });

    await updateCartTotal(cartId);
    
    res.send(await getCartWithItems(cartId));
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.updateQuantity = async (req, res) => {
  try {
    const { cartId, itemId } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
      return this.removeItem(req, res);
    }

    const cartItem = await db.CartItem.findOne({
      where: { id: itemId, cartId }
    });

    cartItem.quantity = quantity;
    cartItem.subtotal = cartItem.price * quantity;
    await cartItem.save();

    await updateCartTotal(cartId);

    res.send(await getCartWithItems(cartId));
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Helper functions
async function updateCartTotal(cartId) {
  const cart = await db.Cart.findByPk(cartId, {
    include: [{
      model: db.User,
      as: 'user'
    }]
  });

  const items = await db.CartItem.findAll({
    where: { cartId }
  });

  let total = items.reduce((sum, item) => sum + item.subtotal, 0);

  // Apply discounts
  if (cart.user.discounts.includes('vipDiscount')) {
    total *= 0.9; // 10% off
  }

  if (cart.user.discounts.includes('get3For2Discount')) {
    items.forEach(item => {
      const discountQty = Math.floor(item.quantity / 3);
      total -= (discountQty * item.price);
    });
  }

  cart.total = parseFloat(total.toFixed(2));
  await cart.save();
}

async function getCartWithItems(cartId) {
  return db.Cart.findByPk(cartId, {
    include: [
      {
        model: db.CartItem,
        as: 'items',
        include: [{
          model: db.Product,
          as: 'product'
        }]
      },
      {
        model: db.User,
        as: 'user'
      }
    ]
  });
}