const db = require("../models");

exports.getCartByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await db.Cart.findOne({
      where: { userId },
      include: [
        {
          model: db.CartItem,
          as: "items",
          include: [
            {
              model: db.Product,
              as: "product",
              attributes: ["id", "name", "price"],
            },
          ],
        },
      ],
    });

    if (!cart) {
      return res.status(404).send({
        message: "Cart not found",
      });
    }

    const cartData = cart.toJSON();
    let total = cartData.items.reduce((sum, item) => sum + item.subtotal, 0);

    res.status(200).send({
      ...cartData,
      total,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error retrieving cart",
    });
  }
};

exports.updateItemQuantity = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { productId, action } = req.body;

    const [cartItem, created] = await db.CartItem.findOrCreate({
      where: { cartId, productId },
    });

    const product = await db.Product.findByPk(productId, {
      attributes: ["id", "name", "price"],
    });

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    if (created) {
      cartItem.price = product.price;
    }

    if (action === "add") {
      cartItem.quantity += 1;
    } else if (action === "remove") {
      cartItem.quantity -= 1;
      if (cartItem.quantity < 0) {
        return res
          .status(400)
          .send({ message: "Quantity cannot be less than zero" });
      }
    } else {
      return res.status(400).send({ message: "Invalid action" });
    }

    cartItem.subtotal = cartItem.quantity * product.price;
    await cartItem.save();

    await updateCartTotal(cartId);

    res.send(await getCartWithItems(cartId));
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

async function updateCartTotal(cartId) {
  const cart = await db.Cart.findByPk(cartId, {
    include: [
      {
        model: db.User,
        as: "user",
      },
    ],
  });

  const items = await db.CartItem.findAll({
    where: { cartId },
  });

  let total = items.reduce((sum, item) => sum + item.subtotal, 0);

  cart.total = parseFloat(total.toFixed(2));
  await cart.save();
}

async function getCartWithItems(cartId) {
  return db.Cart.findByPk(cartId, {
    include: [
      {
        model: db.CartItem,
        as: "items",
        include: [
          {
            model: db.Product,
            as: "product",
          },
        ],
      },
      {
        model: db.User,
        as: "user",
      },
    ],
  });
}
