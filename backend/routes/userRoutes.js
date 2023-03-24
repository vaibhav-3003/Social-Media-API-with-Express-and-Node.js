const express = require("express");
const { getAllUsers, signup,login } = require("../controllers/userController");
const router = express.Router();

router.get("/",getAllUsers);

router.post("/signup", signup);

router.post("/login", login);

module.exports = router;