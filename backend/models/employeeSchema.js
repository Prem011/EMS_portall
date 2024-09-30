const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const employeeSchema = new mongoose.Schema({
    active: {
        type: Boolean,
        default: true
    },
    image: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    designation: {
        type: String,
        enum: ["HR", "Manager", "sales"],
        required: true
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Others"],
        required: true
    },
    course: {
        type: [String], 
        enum: ["MCA", "BCA", "BSC"],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Auto increment the employee ID (eId)
employeeSchema.plugin(AutoIncrement, { inc_field: 'eId' });

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
