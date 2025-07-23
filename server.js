const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config({ path: './config.env' });

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  console.log('Continuing without MongoDB - using in-memory storage');
});

// Order Schema
const orderSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  streetAddress: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String }, // Optional for countries without states
  zipCode: { type: String, required: true }, // Will store ZIP or Postal Code
  country: { type: String, required: true, default: 'USA' },
  mintAnonymously: { type: Boolean, default: false },
  walletAddress: { type: String, required: true },
  transactionHash: { type: String },
  mintedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'minted', 'failed'], default: 'pending' }
});

const Order = mongoose.model('Order', orderSchema);

// In-memory storage fallback
let inMemoryOrders = [];
let orderCounter = 0;

// API Routes
app.get('/api/orders', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const orders = await Order.find().sort({ mintedAt: -1 });
      res.json(orders);
    } else {
      res.json(inMemoryOrders);
    }
  } catch (error) {
    res.json(inMemoryOrders);
  }
});

app.get('/api/orders/count', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const count = await Order.countDocuments();
      res.json({ count });
    } else {
      res.json({ count: inMemoryOrders.length });
    }
  } catch (error) {
    res.json({ count: inMemoryOrders.length });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const {
      fullName,
      email,
      streetAddress,
      city,
      state,
      zipCode,
      country,
      mintAnonymously,
      walletAddress
    } = req.body;

    const orderData = {
      _id: `mem_${++orderCounter}`,
      fullName,
      email,
      streetAddress,
      city,
      state,
      zipCode,
      country: country || 'USA',
      mintAnonymously: mintAnonymously || false,
      walletAddress,
      mintedAt: new Date(),
      status: 'pending'
    };

    if (mongoose.connection.readyState === 1) {
      const order = new Order(orderData);
      await order.save();
      res.status(201).json(order);
    } else {
      inMemoryOrders.push(orderData);
      res.status(201).json(orderData);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

app.put('/api/orders/:id/transaction', async (req, res) => {
  try {
    const { transactionHash } = req.body;
    
    if (mongoose.connection.readyState === 1) {
      const order = await Order.findByIdAndUpdate(
        req.params.id,
        { 
          transactionHash,
          status: 'minted'
        },
        { new: true }
      );
      res.json(order);
    } else {
      const orderIndex = inMemoryOrders.findIndex(order => order._id === req.params.id);
      if (orderIndex !== -1) {
        inMemoryOrders[orderIndex].transactionHash = transactionHash;
        inMemoryOrders[orderIndex].status = 'minted';
        res.json(inMemoryOrders[orderIndex]);
      } else {
        res.status(404).json({ error: 'Order not found' });
      }
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// Serve static files from React build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 