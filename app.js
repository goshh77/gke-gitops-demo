const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

const port = process.env.PORT || 8080;

const BACKEND_URL =
  process.env.BACKEND_URL || "http://my-backend-service";

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: "UP" });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Get Products
app.get('/api/products', async (req, res) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/products`);
    res.json(response.data);
  } catch (err) {
    console.error("Error fetching products:", err.message);
    res.status(500).json({ error: "Backend unavailable" });
  }
});

// Get Cart
app.get('/api/cart', async (req, res) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/cart`);
    res.json(response.data);
  } catch (err) {
    console.error("Error fetching cart:", err.message);
    res.status(500).json({ error: "Backend unavailable" });
  }
});

// Add to Cart
app.post('/api/cart', async (req, res) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/cart`,
      req.body
    );

    res.json(response.data);

  } catch (err) {
    console.error("Error adding to cart:", err.message);
    res.status(500).json({ error: "Backend unavailable" });
  }
});

// Clear Cart
app.delete('/api/cart', async (req, res) => {
  try {
    const response = await axios.delete(`${BACKEND_URL}/api/cart`);
    res.json(response.data);

  } catch (err) {
    console.error("Error clearing cart:", err.message);
    res.status(500).json({ error: "Backend unavailable" });
  }
});

app.listen(port, () => {
  console.log(`Frontend server started successfully on port ${port}`);
  console.log(`Backend URL: ${BACKEND_URL}`);
});