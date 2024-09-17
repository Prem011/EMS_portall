const express = require('express');
const router = express.Router();


const {createEmployee
    , readEmployee
    , updateEmployee
    , deleteEmployee
    , toggleActiveStatus
    , employeeDp
    , employeeDpUpload
    , getSingleEmployee
    } = require("../controllers/employeesController");
const upload = require('../utils/multer');

router.post("/createEmployee", createEmployee)

router.get("/employeeData", readEmployee)

router.get("/updateEmployee/:id", getSingleEmployee);

router.post("/updateEmployee/:id", updateEmployee)

router.post("/deleteEmployee/:id", deleteEmployee)

router.post('/toggleStatus/:id', toggleActiveStatus);

router.get('/dpImage/:filename', employeeDp);

router.post('/dpImage/upload', upload.single('image'), employeeDpUpload);

module.exports = router;

// `/api/employees/dpImage/${filename}`
// `/api/employees/dpImage/upload