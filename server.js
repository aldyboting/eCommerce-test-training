require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const nodemailer = require('nodemailer');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();
app.use(bodyParser.json());
app.use(session({ secret: 'ecommerce-secret', saveUninitialized: true, resave: true }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// Use modular routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

// Order processing remains in server.js or can also be modularized further if needed
app.post('/checkout', (req, res) => {
  if (!req.session.user) {
    return res.status(401).send('Please login to checkout');
  }

  const order = {
    user: req.session.user.username,
    items: req.body.items,
    total: req.body.total,
    date: new Date(),
  };

  // For demonstration, orders are stored in-memory
  // (In production, you would use a database)

  if (process.env.NODE_ENV === 'production') {
    // Sending email only in production using environment variables for credentials
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: req.session.user.username,
      subject: 'Order Confirmation',
      text: `Thank you for your order! Your total is Rp ${req.body.total}.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  } else {
    // In non-production, skip sending the email and log the order
    console.log('Skipping email sending (non-production environment).');
    console.log('Order details:', order);
  }

  res.status(201).send('Order placed');
});

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

module.exports = app;
