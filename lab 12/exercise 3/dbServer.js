/**
 * VIT-AP UNIVERSITY, ANDHRA PRADESH
 * Lab Sheet 12: Structured Backend with Express
 * Branch/ Class: B.Tech/M.Tech
 * Faculty Name: Prof. S.Gopikrishnan
 * School: SCOPE
 * 
 * Exercise 3: Backend persistence using MongoDB and Mongoose.
 * This server provides a full CRUD API for Student management.
 */

const express = require('express');
const mongoose = require('mongoose');
const Student = require('./models/student');

const app = express();
const PORT = 6000;
const MONGO_URI = 'mongodb://127.0.0.1:27017/lab12_db';

// Middleware
app.use(express.json());

// Manage database connection using connection handling in Mongoose
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB successfully.'))
    .catch(err => {
        console.error('❌ MongoDB connection error:', err.message);
        console.log('Ensure MongoDB is running locally at: ' + MONGO_URI);
    });

// --- CRUD Routes ---

// 1. Create: Insert data into the database using save()
app.post('/api/students', async (req, res) => {
    try {
        const { name, regNo, department, marks } = req.body;
        const newStudent = new Student({ name, regNo, department, marks });
        const savedStudent = await newStudent.save();
        res.status(201).json({ success: true, data: savedStudent });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// 2. Read: Retrieve data using find() method
app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json({ success: true, count: students.length, data: students });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// 3. Update: Update records using findByIdAndUpdate()
app.put('/api/students/:id', async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedStudent) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }
        res.json({ success: true, message: 'Record updated', data: updatedStudent });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// 4. Delete: Delete records using findByIdAndDelete()
app.delete('/api/students/:id', async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }
        res.json({ success: true, message: 'Record deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Root route
app.get('/', (req, res) => {
    res.send('<h1>MongoDB Persistence API</h1><p>Running on Port 6000</p>');
});

// Start the server
app.listen(PORT, () => {
    console.log('\n----------------------------------------');
    console.log(`🚀 persistence Server running at http://localhost:${PORT}`);
    console.log(`📦 Database: MongoDB (${MONGO_URI})`);
    console.log('----------------------------------------\n');
});
