const express = require('express');
const { updatePayroll, readpayroll, deletePayroll, createPayroll, getSinglePayroll } = require('../controllers/payrollController');
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn")

router.post('/createPayroll', isLoggedIn, createPayroll);

router.get('/readPayroll/:employeeId',isLoggedIn, readpayroll);

router.get('/getSinglePayroll/:id',isLoggedIn, getSinglePayroll);

router.post('/updatePayroll/:id',isLoggedIn, updatePayroll);

router.post('/deletePayroll/:id', isLoggedIn ,deletePayroll);


module.exports = router;
