const mongoose = require('mongoose');

// Define a schema using Mongoose schema definition
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    regNo: {
        type: String,
        required: true,
        unique: true
    },
    department: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

// Create a model using Mongoose model creation
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
