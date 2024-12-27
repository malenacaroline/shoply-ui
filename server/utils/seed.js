import db from "../models/index.js";
import bcrypt from "bcrypt";
import user from "../models/user.js";

const seedDatabase = async () => {
  try {
    const hashedPassword = await bcrypt.hash("12345", 10);
    const users = await db.User.bulkCreate([
      {
        name: "John Doe",
        email: "john@test.com",
        password: hashedPassword,
        type: "common",
        discounts: ["get3For2Discount"],
      },
      {
        name: "Jane Smith",
        email: "jane@test.com",
        password: hashedPassword,
        type: "vip",
        discounts: ["vipDiscount", "get3For2Discount"],
      },
    ]);

    // Create products
    await db.Product.bulkCreate([
      { name: "T-shirt", price: 35.99, image: "shopping-bag.jpg" },
      { name: "Jeans", price: 65.5, image: "shopping-bag.jpg" },
      { name: "Dress", price: 80.75, image: "shopping-bag.jpg" },
    ]);

    // Create carts
    await db.Cart.bulkCreate(users.map((user) => ({ userId: user.id })));

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

export default seedDatabase;
