var express = require('express');
const router = express.Router();

var adminController = require("../controllers/adminController");

router.get("/", adminController.getAdminDashboard);

module.exports = router;