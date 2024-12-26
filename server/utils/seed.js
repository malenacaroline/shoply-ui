const db = require("../models");
const bcrypt = require("bcrypt");

const seedDatabase = async () => {
  try {
    // Create users
    const hashedPassword = await bcrypt.hash("password123", 10);
    const users = await db.User.bulkCreate([
      {
        name: "John Doe",
        email: "john@example.com",
        password: hashedPassword,
        type: "common",
        discounts: ["get3For2Discount"],
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        password: hashedPassword,
        type: "vip",
        discounts: ["vipDiscount", "get3For2Discount"],
      },
    ]);

    // Create products
    const products = await db.Product.bulkCreate([
      { name: "T-shirt", price: 35.99},
      { name: "Jeans", price: 65.5},
      { name: "Dress", price: 80.75},
    ]);

    // Create carts
    const carts = await db.Cart.bulkCreate([
      { userId: users[0].id, status: "active", total: 0 },
      { userId: users[1].id, status: "active", total: 0 },
    ]);

    // Create cart items
    await db.CartItem.bulkCreate([
      {
        cartId: carts[0].id,
        productId: products[0].id,
        quantity: 2,
        price: products[0].price,
        subtotal: products[0].price * 2,
      },
      {
        cartId: carts[1].id,
        productId: products[1].id,
        quantity: 3,
        price: products[1].price,
        subtotal: products[1].price * 3,
      },
    ]);

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

module.exports = seedDatabase;
