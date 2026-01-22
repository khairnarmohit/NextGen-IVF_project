var express = require('express');
const router = express.Router();

var userController = require("../controllers/userController");

router.get("/", userController.getHomePage);




module.exports = router;