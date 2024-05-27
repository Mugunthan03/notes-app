const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv')

const app = express();
dotenv.config()
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
require('./db/connection')

app.use(express.json())
app.use(cors())

// Routes
app.use(require('./router/route'))

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Server is working');
});
