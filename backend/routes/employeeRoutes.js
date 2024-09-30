const express = require('express');
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const multer = require("multer");
var uploader = multer({
    storage: multer.diskStorage({}),
    limits: {fileSize:  5 * 1024 * 1024}
});

const {createEmployee
    , readEmployee
    , updateEmployee
    , deleteEmployee
    , toggleActiveStatus
    , employeeDp
    , employeeDpUpload
    , getSingleEmployee
    , uploadIMG
    } = require("../controllers/employeesController");

const upload = require('../utils/multer');

router.post("/createEmployee", uploader.single("image"), createEmployee)

router.get("/employeeData", readEmployee)

router.get("/updateEmployee/:id", getSingleEmployee);

router.post("/updateEmployee/:id",uploader.single("image"), updateEmployee)

router.post("/deleteEmployee/:id", deleteEmployee)

router.post('/toggleStatus/:id', toggleActiveStatus);



module.exports = router;
