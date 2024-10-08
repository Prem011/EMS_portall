const Attendance = require('../models/attendenceSchema');
const mongoose = require('mongoose');

exports.createAttendence = async (req, res) => {
    try {
        const { employeeId, date, status, checkInTime, checkOutTime } = req.body;

        const existingAttendence = await Attendance.findOne({ employeeId, date});

        if(existingAttendence){
            return res.status(409).json({ error: 'Attendance for this employee and date already exists, if you want to  make any changes try to do it from edit option.' });
        }

        const attendance = new Attendance({
            employeeId,
            date,
            status,
            checkInTime,
            checkOutTime
        });

        await attendance.save();
        res.status(201).json({ message: 'Attendance marked successfully', attendance });
    } catch (error) {
        res.status(500).json({ message: 'Error marking attendance', error: error.message });
    }
};


exports.getAttendanceOfSingleEmployee = async (req, res) => {
    try {
        const attendanceRecords = await Attendance.find({ employeeId: req.params.employeeId });

        if (!attendanceRecords.length) {
            return res.status(404).json({ message: 'No attendance records found for this employee' });
        }

        res.status(200).json(attendanceRecords);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving attendance', error: error.message });
    }
};




exports.updateAttendence = async (req, res) => {
    try {
        const { id } = req.params; 
        const { status, checkInTime, checkOutTime } = req.body;

        const attendance = await Attendance.findById(id);

        if (!attendance) {
            return res.status(404).json({ message: 'Attendance not found' });
        }

        attendance.status = status || attendance.status;
        attendance.checkInTime = checkInTime || attendance.checkInTime;
        attendance.checkOutTime = checkOutTime || attendance.checkOutTime;

        await attendance.save();

        res.status(200).json({ message: 'Attendance updated successfully', attendance });
    } catch (error) {
        console.error('Error updating attendance:', error);
        res.status(500).json({ message: 'Error updating attendance', error: error.message });
    }
};


exports.deleteAttendence = async (req, res) => {
    try {
        const attendance = await Attendance.findByIdAndDelete(req.params.id);
        if (!attendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }
        res.status(200).json({ message: 'Attendance record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting attendance', error: error.message });
    }
};


exports.getSingleAttendenceOfSingleEmployee = async (req, res) => {
    try {
        const attendanceId = req.params.attendenceId;

        const attendance = await Attendance.findById(attendanceId);

        if (!attendance) {
            return res.status(404).json({ error: 'Attendance record not found' });
        }

        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving attendance', error: error.message });
    }
};
