const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// Database connection
const dbUri = process.env.MONGO_URI;

if (!dbUri) {
  console.error('Error: MONGO_URI is not defined in the environment variables.');
  process.exit(1); // Exit the app if DB URI is missing
}

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Database not connected:', err));

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'], // Allow the necessary HTTP methods
  credentials: true, // Allow cookies or authentication headers
};

// Apply CORS configuration to Express app
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/', require('./routes/authRoutes'));

// Server Setup
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server is running on port ${port}`));
