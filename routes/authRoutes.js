const express = require('express');
const { registerUser, loginUser } = require('../js/authService');
const router = express.Router();

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  try {
    const message = registerUser(username, password);
    res.status(201).send(message);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  try {
    const message = loginUser(username, password);
    req.session.user = { username };
    res.send(message);
  } catch (error) {
    res.status(401).send(error.message);
  }
});

module.exports = router;
