const express = require('express');
const Payroll = require('../models/payrollSchema'); // Assuming the Payroll model is exported from the Employee file

exports.createPayroll = async (req, res) => {
    try {
        const { employeeId, salary, bonuses, deductions, paymentDate } = req.body;

        const payroll = new Payroll({
            employeeId,
            salary,
            bonuses,
            deductions,
            paymentDate
        });

        await payroll.save();
        
        res.status(201).json({ message: 'Payroll created successfully', payroll });
    } catch (error) {
        res.status(500).json({ message: 'Error creating payroll', error: error.message });
    }
};

exports.readpayroll = async (req, res) => {
    try {
        const payrolls = await Payroll.find({ employeeId: req.params.employeeId });
        if (!payrolls.length) {
            return res.status(404).json({ message: 'No payroll records found for this employee' });
        }
        res.status(200).json(payrolls);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving payroll', error: error.message });
    }
};

exports.updatePayroll = async (req, res) => {
    try {
        const payroll = await Payroll.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!payroll) {
            return res.status(404).json({ message: 'Payroll record not found' });
        }
        res.status(200).json({ message: 'Payroll updated successfully', payroll });
    } catch (error) {
        res.status(500).json({ message: 'Error updating payroll', error: error.message });
    }
};

exports.deletePayroll = async (req, res) => {
    try {
        const payroll = await Payroll.findByIdAndDelete(req.params.id);
        if (!payroll) {
            return res.status(404).json({ message: 'Payroll record not found' });
        }
        res.status(200).json({ message: 'Payroll record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting payroll', error: error.message });
    }
};

exports.getSinglePayroll = async(req, res) => {

  try {

    const payroll = await Payroll.findById(req.params.id);
    
    if (!payroll) {
      return res.status(404).json({ error: 'Payroll not found' });
    }
    
    res.json({ message: 'payroll data retrieved', payroll });
  } catch (error) {
    res.status(500).json({ error: 'Server error', error: error.message });
  }

}