/**
 * VIT-AP UNIVERSITY, ANDHRA PRADESH
 * Lab Sheet 12: Structured Backend with Express
 * Branch/ Class: B.Tech/M.Tech
 * Faculty Name: Prof. S.Gopikrishnan
 * School: SCOPE
 * 
 * Exercise 2: Express Middleware functionality demonstration.
 * This application shows how global and route-level middleware handle flow control.
 */

const express = require('express');
const app = express();
const PORT = 4000;

// 1. Custom Global Middleware: Logger
// Logs request details (method, URL, timestamp)
const loggerMiddleware = (req, res, next) => {
    const timestamp = new Date().toLocaleString();
    console.log(`[LOGGER]: ${req.method} request to ${req.url} | Time: ${timestamp}`);
    next(); // Pass control to the next middleware or route handler
};

// 2. Custom Global Middleware: Simple Execution Flow tracker
const trackerMiddleware = (req, res, next) => {
    console.log('[TRACKER]: Request preprocessing start...');
    // We can add data to the request object to pass it downstream
    req.requestStart = Date.now();
    next();
};

// 3. Custom Route-Level Middleware: Admin Area Check
const adminAuthMiddleware = (req, res, next) => {
    console.log('[AUTH]: Checking access for admin route...');
    const isAdmin = req.query.admin === 'true';
    
    if (isAdmin) {
        console.log('[AUTH]: Access Granted.');
        next();
    } else {
        console.log('[AUTH]: Access Denied. Flow interrupted.');
        res.status(403).send('<h1>Access Denied</h1><p>You must be an admin to access this page.</p>');
    }
};

// Apply Global Middleware using app.use()
app.use(loggerMiddleware);
app.use(trackerMiddleware);

// --- Routes ---

// Public Route (Uses only global middleware)
app.get('/', (req, res) => {
    res.send('<h1>Home Page</h1><p>Welcome to the Middleware Demo.</p>');
});

// Another Public Route
app.get('/public', (req, res) => {
    res.send('<h1>Public Info</h1><p>This page is open to everyone.</p>');
});

// Admin Route (Uses both Global and Route-level middleware)
app.get('/admin', adminAuthMiddleware, (req, res) => {
    res.send('<h1>Admin Dashboard</h1><p>Welcome, Administrator. You have full access.</p>');
});

// Middleware for handling 404 (applied at the end)
app.use((req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>');
});

// Start the server
app.listen(PORT, () => {
    console.log('\n----------------------------------------');
    console.log(`🚀 Middleware Demo running at http://localhost:${PORT}`);
    console.log(`📝 Global Middleware: Logger, Tracker`);
    console.log(`🔐 Route Middleware: Admin Authentication`);
    console.log('----------------------------------------\n');
});
