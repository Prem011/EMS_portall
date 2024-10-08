const express = require('express');
const { createAttendence, updateAttendence, deleteAttendence, getSingleAttendenceOfSingleEmployee, getAttendanceOfSingleEmployee } = require('../controllers/attendenceController');
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn")

router.post('/createAttendence', isLoggedIn, createAttendence);

router.get('/readAttendance/:employeeId',isLoggedIn, getAttendanceOfSingleEmployee);

router.get('/updateAttendence/:attendenceId', isLoggedIn,  getSingleAttendenceOfSingleEmployee);

router.post('/updateAttendence/:id', isLoggedIn,  updateAttendence);

router.post('/deleteAttendence/:id', isLoggedIn, deleteAttendence);

module.exports = router;

