const express = require('express');
const connectDB = require('./config/db'); // Import database connection function
const cors = require('cors');
const characterRoutes = require('./routes/characterRoutes');
const chatRoutes = require('./routes/chatRoutes');
const authenticateToken = require('./middlewares/authMiddleware'); // Import auth middleware
const path = require('path');

const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'build')));

// Database connection
connectDB();  // Call the database connection function

// Routes (Protected route)
app.use('/api/chat', authenticateToken, chatRoutes);
app.use('/api/characters', authenticateToken, characterRoutes);
app.use('/api/users', userRoutes);


// Anything that doesn't match the API routes will return the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + 'build/index.html'));
});

// Start the server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));