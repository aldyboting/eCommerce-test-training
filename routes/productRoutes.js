const express = require('express');
const { addProduct, getProducts } = require('../js/productService');
const router = express.Router();

router.post('/', (req, res) => {
  const { id, name, price } = req.body;
  try {
    const message = addProduct(id, name, price);
    res.status(201).send(message);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/', (req, res) => {
  res.json(getProducts());
});

module.exports = router;
