const express = require('express');
const router = express.Router();

// Mock data: In-memory user store
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

// GET: Retrieve all users
router.get('/', (req, res) => {
    res.json({
        success: true,
        data: users
    });
});

// GET: Retrieve a single user by ID (Route Parameter)
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: `User with ID ${id} not found`
        });
    }

    res.json({
        success: true,
        data: user
    });
});

// POST: Create a new user (Body Parsing)
router.post('/', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            success: false,
            message: 'Please provide name and email'
        });
    }

    const newUser = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        name,
        email
    };

    users.push(newUser);
    res.status(201).json({
        success: true,
        data: newUser
    });
});

// PUT: Update an existing user
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
        return res.status(404).json({
            success: false,
            message: `User with ID ${id} not found`
        });
    }

    // Update only the provided fields
    if (name) users[userIndex].name = name;
    if (email) users[userIndex].email = email;

    res.json({
        success: true,
        message: 'User updated successfully',
        data: users[userIndex]
    });
});

// DELETE: Remove a user
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = users.length;
    users = users.filter(u => u.id !== id);

    if (users.length === initialLength) {
        return res.status(404).json({
            success: false,
            message: `User with ID ${id} not found`
        });
    }

    res.json({
        success: true,
        message: `User with ID ${id} deleted successfully`
    });
});

module.exports = router;
