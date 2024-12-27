import db from '../models/index.js';
import bcrypt from 'bcrypt';

export const getAll = async (req, res) => {
  try {
    const data = await db.User.findAll();

    if (!data || data.length === 0) {
      res.status(404).send({ message: "No results found" });
    } else {
      res.status(200).send({ users: data });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error retrieving users",
    });
  }
};

export const login = async (req, res) => {
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
