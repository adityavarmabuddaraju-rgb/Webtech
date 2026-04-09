const http = require('http');

const options = (method, path, data) => ({
    hostname: 'localhost',
    port: 5000,
    path: path,
    method: method,
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data ? Buffer.byteLength(JSON.stringify(data)) : 0
    }
});

const makeRequest = (method, path, data) => {
    return new Promise((resolve, reject) => {
        const req = http.request(options(method, path, data), (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => resolve(JSON.parse(body)));
        });
        req.on('error', reject);
        if (data) req.write(JSON.stringify(data));
        req.end();
    });
};

async function runTests() {
    try {
        console.log('Testing GET /api/users...');
        const allUsers = await makeRequest('GET', '/api/users');
        console.log('GET all users response:', JSON.stringify(allUsers, null, 2));

        console.log('\nTesting POST /api/users...');
        const newUser = await makeRequest('POST', '/api/users', { name: 'Aditya', email: 'aditya@example.com' });
        console.log('POST new user response:', JSON.stringify(newUser, null, 2));

        const userId = newUser.data.id;

        console.log(`\nTesting GET /api/users/${userId}...`);
        const singleUser = await makeRequest('GET', `/api/users/${userId}`);
        console.log(`GET user ${userId} response:`, JSON.stringify(singleUser, null, 2));

        console.log(`\nTesting PUT /api/users/${userId}...`);
        const updatedUser = await makeRequest('PUT', `/api/users/${userId}`, { name: 'Aditya Varma' });
        console.log(`PUT user ${userId} response:`, JSON.stringify(updatedUser, null, 2));

        console.log(`\nTesting DELETE /api/users/1...`);
        const deletedUser = await makeRequest('DELETE', `/api/users/1`);
        console.log('DELETE user 1 response:', JSON.stringify(deletedUser, null, 2));

        console.log('\nAll tests completed successfully!');
    } catch (error) {
        console.error('Test failed:', error);
    }
}

runTests();
