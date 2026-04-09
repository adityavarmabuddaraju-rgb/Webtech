/**
 * VIT-AP UNIVERSITY, ANDHRA PRADESH
 * Lab Sheet 12: Structured Backend with Express
 * Branch/ Class: B.Tech/M.Tech
 * Faculty Name: Prof. S.Gopikrishnan
 * School: SCOPE
 * 
 * Exercise 1: RESTful API for User Management.
 * This server uses Express.js to provide endpoints for GET, POST, PUT, and DELETE.
 */

const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 5000;

// Middleware to parse JSON data
app.use(express.json());

// Log incoming requests
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} request to ${req.url}`);
    next();
});

// Use the modular user routes
app.use('/api/users', userRoutes);

// Root route
app.get('/', (req, res) => {
    res.send(`
        <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
            <h1 style="color: #6366f1;">🚀 Lab 12 REST API Server</h1>
            <p>The server is running successfully using Express.js.</p>
            <p>Access the API at <code>/api/users</code></p>
        </div>
    `);
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong on the server!'
    });
});

// Start the server
app.listen(PORT, () => {
    console.log('\n----------------------------------------');
    console.log(`🚀 REST API Server running at http://localhost:${PORT}`);
    console.log(`👥 Resource managed: Users`);
    console.log('----------------------------------------\n');
});
