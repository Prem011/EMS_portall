const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Employee'
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    checkInTime: {
        type: String, // HH:mm format
        required: true
    },
    checkOutTime: {
        type: String, // HH:mm format
        required: true
    }
}, {
    timestamps: true
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
