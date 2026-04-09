/**
 * Lab 11 Exercise 1: Node.js Web Server
 * 
 * This application creates a simple HTTP server using the built-in 'http' module.
 * It handles incoming requests and responds with a basic HTML page.
 * 
 * Features:
 * - Built-in 'http' module usage.
 * - Manual header management.
 * - Console status logging.
 * - Integration with the provided UIEB dataset path reference.
 */

const http = require('http');

// Configuration
const PORT = 3000;
const DATASET_PATH = '/kaggle/input/datasets/ramtirlangi369/uieb-dataset/New/trainA';

// Create the server
const server = http.createServer((req, res) => {
    // Log the incoming request
    console.log(`[${new Date().toISOString()}] Incoming Request: ${req.method} ${req.url}`);

    // Set appropriate response headers
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-Powered-By', 'Node.js-Core');

    // Prepare the response body
    // Using a premium-style HTML response
    const htmlResponse = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Node.js Server - Lab 11</title>
        <style>
            :root {
                --primary: #6366f1;
                --bg: #0f172a;
                --card-bg: #1e293b;
                --text: #f8fafc;
            }
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: var(--bg);
                color: var(--text);
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
            }
            .container {
                background-color: var(--card-bg);
                padding: 2rem;
                border-radius: 1rem;
                box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
                max-width: 600px;
                width: 90%;
                text-align: center;
                border: 1px solid #334155;
            }
            h1 { color: var(--primary); margin-bottom: 0.5rem; }
            p { color: #94a3b8; line-height: 1.6; }
            .status {
                display: inline-block;
                padding: 0.25rem 0.75rem;
                border-radius: 9999px;
                background-color: #065f46;
                color: #34d399;
                font-size: 0.875rem;
                font-weight: 600;
                margin-top: 1rem;
            }
            .path-info {
                margin-top: 1.5rem;
                padding: 1rem;
                background: #0f172a;
                border-radius: 0.5rem;
                font-family: monospace;
                font-size: 0.8rem;
                word-break: break-all;
                color: #60a5fa;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🚀 Node.js Core Server</h1>
            <p>Welcome to Lab 11 Exercise 1. This server is running successfully using the built-in HTTP module without any external frameworks.</p>
            
            <div class="path-info">
                <strong>Dataset Path Reference:</strong><br>
                ${DATASET_PATH}
            </div>

            <div class="status">Server Status: Online</div>
            
            <p style="margin-top: 2rem; font-size: 0.75rem;">
                Request handled at: ${new Date().toLocaleTimeString()}
            </p>
        </div>
    </body>
    </html>
    `;

    // Send the response
    res.write(htmlResponse);
    res.end();
});

// Start the server
server.listen(PORT, () => {
    console.log('\n----------------------------------------');
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📂 Monitoring Dataset: ${DATASET_PATH}`);
    console.log(`📅 Started at: ${new Date().toLocaleString()}`);
    console.log('----------------------------------------\n');
    console.log('Waiting for connections...');
});
