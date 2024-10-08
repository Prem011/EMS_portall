const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Employee'
    },
    salary: {
        type: Number,
        required: true
    },
    bonuses: {
        type: Number,
        default: 0
    },
    deductions: {
        type: Number,
        default: 0
    },
    paymentDate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

const Payroll = mongoose.model('Payroll', payrollSchema);

module.exports =   Payroll;
