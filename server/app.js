const express = require('express');
const connectDB = require('./config/db'); // Import database connection function
const cors = require('cors');
// const characterRoutes = require('./routes/characterRoutes');
// const authenticateToken = require('./middlewares/authMiddleware'); // Import auth middleware

const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDB();  // Call the database connection function

// Routes (Protected route)
// app.use('/api/characters', authenticateToken, characterRoutes);
app.use('/api/users', userRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));