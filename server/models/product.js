export default (sequelize, Sequelize) => {
  const Product = sequelize.define(
    "product",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'shopping-bag.jpg'
      }
    },
    {
      sequelize,
      tableName: "products",
      timestamps: false,
    }
  );

  Product.associate = function(models) {
    Product.hasMany(models.CartItem, {
      foreignKey: 'productId',
      as: 'cartItems'
    });
  };

  return Product;
};