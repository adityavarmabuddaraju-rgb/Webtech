/**
 * VIT-AP UNIVERSITY, ANDHRA PRADESH
 * Lab Sheet 11: Node JS basics
 * Branch/ Class: B.Tech/M.Tech
 * Faculty Name: Prof. S.Gopikrishnan
 * School: SCOPE
 * 
 * Exercise 3: Develop a Node.js application that demonstrates 
 * event-driven programming using events and listeners.
 */

// 1. Import the events module using the require() function
const EventEmitter = require('events');

// 2. Create an event emitter object using EventEmitter instance
const myEmitter = new EventEmitter();

console.log('--- Event-Driven Programming Demo ---');

// 3. Register event listeners using the on() method
// Handling multiple listeners for a single event
myEmitter.on('login', (username) => {
    console.log(`[Listener 1]: User '${username}' has logged in.`);
});

myEmitter.on('login', (username) => {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[Listener 2]: Logging login for '${username}' at ${timestamp}.`);
});

// Another event with data passing
myEmitter.on('dataReceived', (data) => {
    console.log(`[Data Listener]: Received data packet:`, data);
});

// 4. Register a listener for an asynchronous demonstration
myEmitter.on('processComplete', () => {
    console.log('[Status]: All asynchronous processing finished.');
});

// 5. Define custom events and trigger them using the emit() method
console.log('\nTriggering events synchronously:');
myEmitter.emit('login', 'Aditya'); // Passes data through events

// Passing an object as data
myEmitter.emit('dataReceived', { id: 101, status: 'Processing', content: 'Sample payload' });

// 6. Demonstrate asynchronous behavior using event-driven architecture
console.log('\nTriggering an asynchronous event after 2 seconds:');
setTimeout(() => {
    myEmitter.emit('processComplete');
}, 2000);

console.log('The script continues to execute while waiting for the async event...\n');
