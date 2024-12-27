export default (sequelize, Sequelize) => {
  const Cart = sequelize.define(
    "cart",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      total: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      }
    },
    {
      sequelize,
      tableName: "carts",
      timestamps: true,
    }
  );

  Cart.associate = function(models) {
    Cart.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    Cart.hasMany(models.CartItem, {
      foreignKey: 'cartId',
      as: 'items'
    });
  };

  return Cart;
};