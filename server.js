const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Import utility functions
const { handleError, parseBody, getContentType, serveStaticFile } = require('./utility/helpfunction');

// Middleware to parse JSON and URL-encoded data
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

const usersFile = path.join(__dirname, 'user.json');

// Import and use routes
const routes = require('./routes/LOGroutes');
app.use('/', routes);

// Logger Middleware - Logs request details (IP, method, URL, status code, response time)
const morgan = require('morgan');
app.use(morgan('combined'));

// Security Middleware - Adds security headers to responses
const helmet = require('helmet');
app.use(helmet());

// CORS Middleware - Enables Cross-Origin Resource Sharing for all routes
const cors = require('cors');
app.use(cors());

// Rate Limiting Middleware - Limits requests per IP to prevent abuse
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Max 100 requests per 15 minutes per IP
    message: 'Too many requests from this IP, please try again later',
});
app.use(limiter);

// Async Error Handling Middleware - Catches async errors automatically
const asyncHandler = require('express-async-handler');
app.get('/users', asyncHandler(async (req, res, next) => {
    const users = await getUsersFromDB(); // Example async function
    res.json(users);
}));

// 404 Error Handling - Handles requests to undefined routes
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

// Start the server on port 8080
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
