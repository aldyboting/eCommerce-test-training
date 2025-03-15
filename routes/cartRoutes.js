const express = require('express');
const { addItem, updateItem, removeItem, getTotal, getCartItems } = require('../js/cartService');
const router = express.Router();

router.post('/', (req, res) => {
  const product = req.body;
  addItem(product);
  res.status(201).send('Item added to cart');
});

router.put('/:id', (req, res) => {
  const productId = req.params.id;
  const quantity = req.body.quantity;
  updateItem(productId, quantity);
  res.send('Item updated in cart');
});

router.delete('/:id', (req, res) => {
  const productId = req.params.id;
  removeItem(productId);
  res.send('Item removed from cart');
});

router.get('/', (req, res) => {
  res.json(getCartItems());
});

router.get('/total', (req, res) => {
  res.json({ total: getTotal() });
});

module.exports = router;
