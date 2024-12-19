module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user",
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
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM('common', 'vip'),
        allowNull: false,
        defaultValue: "common",
      },
      discounts: {
        type: Sequelize.ARRAY(Sequelize.ENUM('get3For2Discount', 'vipDiscount')),
        allowNull: false,
        defaultValue: [],
      },
    },
    {
      sequelize,
      tableName: "users",
      timestamps: false,
    }
  );

  User.associate = (models) => {
    User.hasOne(models.Cart, {
      foreignKey: 'userId',
      as: 'cart'
    });
  };

  return User;
};