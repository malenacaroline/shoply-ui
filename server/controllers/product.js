const db = require("../models");

exports.getAll = async (req, res) => {
  const data = await db.Product.findAll();
  if (!data) {
    res.send("No results found");
  } else {
    res.send(data);
  }
};

exports.getOne = async (req, res) => {
  const id = req.params.id;
  const data = await db.Product.findByPk(id);
  if (data === null) {
    res.status(400).send("Not found!");
  } else {
    res.status(200).send(data);
  }
};

exports.create = async (req, res) => {
  try {
    const check = await db.Product.findOne({
      where: getComparator(db, "name", req.body.name),
    });
    if (check) {
      return res.send(`${req.body.name} already exists.`);
    }
    const data = await db.Product.create(req.body);
    res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    res.send({ message: "Failed!" });
  }
};

exports.update = async (req, res) => {
  const updatedData = req.body;
  try {
    const data = await db.Product.findByPk(updatedData.id);
    data.set(updatedData);
    await data.save();
    res.status(200).json({ message: data });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed!" });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const count = await db.Product.destroy({
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
