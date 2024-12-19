const db = require('../models');

exports.getAll = async (req, res) => {
  try {
    const carts = await db.Cart.findAll();
    res.send(carts);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving carts.",
    });
  }
};

exports.getOne = async (req, res) => {
  const id = req.params.id;
  try {
    const cart = await db.Cart.findByPk(id);
    if (cart) {
      res.send(cart);
    } else {
      res.status(404).send({
        message: `Cannot find Cart with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error retrieving Cart with id=" + id,
    });
  }
};

exports.create = async (req, res) => {
  try {
    const cart = await db.Cart.create(req.body);
    res.send(cart);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Cart.",
    });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const [updated] = await db.Cart.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedCart = await db.Cart.findByPk(id);
      res.send(updatedCart);
    } else {
      res.send({
        message: `Cannot update Cart with id=${id}. Maybe Cart was not found or req.body is empty!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error updating Cart with id=" + id,
    });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const count = await db.Cart.destroy({
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
    res.status(500).send({
      message: err.message || "Failed!",
    });
  }
};