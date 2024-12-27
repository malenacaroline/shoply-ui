export default (sequelize, Sequelize) => {
  const CartItem = sequelize.define(
    "cartItem",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      cartId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      subtotal: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      }
    },
    {
      sequelize,
      tableName: "cartItems",
      timestamps: true,
    }
  );

  CartItem.associate = function(models) {
    CartItem.belongsTo(models.Cart, {
      foreignKey: 'cartId',
      as: 'cart'
    });
    CartItem.belongsTo(models.Product, {
      foreignKey: 'productId',
      as: 'product'
    });
  };

  return CartItem;
};