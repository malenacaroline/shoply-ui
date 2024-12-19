module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
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
    },
    {
      sequelize,
      tableName: "products",
      timestamps: false,
    }
  );
};
