const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

// Temporary in-memory database
let cart = [];

const products = [
  { id: 1, name: "Cloud Expert Shirt", price: 25 },
  { id: 2, name: "Kubernetes Hoodie", price: 50 },
  { id: 3, name: "GitLab CI Cap", price: 15 }
];

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: "UP" });
});

// Get Products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get Cart
app.get('/api/cart', (req, res) => {
  res.json(cart);
});

// Add to Cart
app.post('/api/cart', (req, res) => {
  const item = req.body;
  cart.push(item);

  console.log("Added to cart:", item);

  res.status(201).json(cart);
});

// Clear Cart
app.delete('/api/cart', (req, res) => {
  cart = [];
  res.json({ message: "Cart cleared" });
});

app.listen(port, () => {
  console.log(`Backend server started successfully on port ${port}`);
});