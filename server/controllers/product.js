const db = require("../models");
require("dotenv").config();

exports.showAll = async (req, res) => {
  const data = await db.product.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  if (!data) {
    res.send("No results found");
  } else {
    res.send(data);
  }
};

exports.showOne = async (req, res) => {
  const id = req.params.id;
  const data = await db.product.findByPk(id);
  if (data === null) {
    res.status(400).send("Not found!");
  } else {
    res.status(200).send(data);
  }
};

exports.createRecord = async (req, res) => {
  try {
    const check = await db.product.findOne({
      where: getComparator(db, "name", req.body.name),
    });
    if (check) {
      return res.send(`${req.body.name} already exists.`);
    }
    const data = await db.product.create(req.body);
    res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    res.send({ message: "Failed!" });
  }
};

exports.updateRecord = async (req, res) => {
  const updatedData = req.body;
  try {
    const data = await db.product.findByPk(updatedData.id);
    data.set(updatedData);
    await data.save();
    res.status(200).json({ message: data });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed!" });
  }
};

exports.deleteRecord = async (req, res) => {
  const id = req.params.id;
  try {
    const count = await db.product.destroy({
      where: { id: id },
    });
    if (count == 1) {
      res.send({
        message: "Deleted successfully!",
      });
    } else {
      res.send({
        message: "Failed!",
      });
    }
  } catch (err) {
    res.send({
      message: err.message || "Failed!",
    });
  }
};
