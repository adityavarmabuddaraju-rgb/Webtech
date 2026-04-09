const http = require('http');

const options = (method, path, data) => ({
    hostname: 'localhost',
    port: 6000,
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
            res.on('end', () => {
                try {
                    resolve(JSON.parse(body));
                } catch (e) {
                    resolve(body);
                }
            });
        });
        req.on('error', reject);
        if (data) req.write(JSON.stringify(data));
        req.end();
    });
};

async function runTests() {
    try {
        console.log('--- Database API CRUD Test ---');

        // 1. POST: Create a student
        console.log('\nTesting POST /api/students...');
        const studentData = {
            name: 'Aditya Varma',
            regNo: '21BCE001',
            department: 'SCOPE',
            marks: 95
        };
        const createRes = await makeRequest('POST', '/api/students', studentData);
        console.log('Create Response:', JSON.stringify(createRes, null, 2));

        if (!createRes.success) {
            console.log('Skipping further tests as creation failed (is MongoDB running?).');
            return;
        }

        const id = createRes.data._id;

        // 2. GET: Retrieve all
        console.log('\nTesting GET /api/students...');
        const allRes = await makeRequest('GET', '/api/students');
        console.log(`Retrieved ${allRes.count} records.`);

        // 3. PUT: Update
        console.log(`\nTesting PUT /api/students/${id}...`);
        const updateRes = await makeRequest('PUT', `/api/students/${id}`, { marks: 98 });
        console.log('Update Response:', JSON.stringify(updateRes, null, 2));

        // 4. DELETE: Delete
        console.log(`\nTesting DELETE /api/students/${id}...`);
        const deleteRes = await makeRequest('DELETE', `/api/students/${id}`);
        console.log('Delete Response:', JSON.stringify(deleteRes, null, 2));

        console.log('\nCRUD Cycle Verification Complete.');
    } catch (error) {
        console.error('Test Encountered Error:', error.message);
    }
}

runTests();
