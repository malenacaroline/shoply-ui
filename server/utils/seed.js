const db = require("../models");
const bcrypt = require("bcrypt");

const seedDatabase = async () => {
  try {
    const products = [
      { name: "T-shirt", price: 35.99 },
      { name: "Jeans", price: 65.5 },
      { name: "Dress", price: 80.75 },
    ];

    await db.Product.bulkCreate(products);
    console.log("Products added successfully.");

    const users = [
      {
        name: "John Doe",
        email: "john@user.com",
        password: "12345",
        type: "common",
        discounts: ["get3For2Discount"],
      },
      {
        name: "Jane Smith",
        email: "jane@user.com",
        password: "12345",
        type: "vip",
        discounts: ["get3For2Discount", "vipDiscount"],
      },
      {
        name: "Alan Smith",
        email: "alan@user.com",
        password: "12345",
        type: "vip",
        discounts: ["get3For2Discount", "vipDiscount"],
      },
    ];

    for (let user of users) {
      user.password = await bcrypt.hash(user.password, 10);
    }

    await db.User.bulkCreate(users);
    console.log("Users added successfully.");
  } catch (error) {
    console.error("Error adding data:", error);
  }
};

module.exports = seedDatabase;
