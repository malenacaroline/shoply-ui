import db from "../models/index.js";

export const getAll = async (req, res) => {
  try {
    const products = await db.Product.findAll();

    if (!products || products.length === 0) {
      return res.status(404).send({
        message: "No products found",
      });
    }

    res.status(200).send(products);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error retrieving products",
    });
  }
};
