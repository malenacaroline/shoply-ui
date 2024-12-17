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
      tableName: "products", // Use plural for the database table name
      timestamps: false, // Disable timestamps if you want to manage them manually
    }
  );
};
