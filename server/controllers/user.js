const db = require('../models');
const bcrypt = require('bcrypt');

exports.getAll = async (req, res) => {
  const data = await db.User.findAll();
  if (!data) {
    res.send("No results found");
  } else {
    res.send(data);
  }
};

exports.create = async (req, res) => {
  try {
    const { name, email, password, type, discounts } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword", hashedPassword);
    const user = await db.User.create({ name, email, password: hashedPassword, type, discounts });
    res.send(user);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the User.",
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    res.send({ message: "Login successfully", user });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error log in user",
    });
  }
};