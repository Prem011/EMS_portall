const express = require('express');
const router = express.Router();
const {register, login, logout} = require("../controllers/userController");
const isLoggedIn = require("../middlewares/isLoggedIn");


router.post('/register', register )

router.post("/login", login  );

router.post("/logout", isLoggedIn, logout );

module.exports = router;