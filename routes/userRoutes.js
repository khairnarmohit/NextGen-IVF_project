var express = require('express');
const router = express.Router();

var userController = require("../controllers/userController");

router.get("/", userController.getHomePage);
router.get("/about", userController.getAboutPage);
router.get("/doctors", userController.getDoctorsPage);
router.get("/Treatments", userController.getTreatmentPage);
module.exports = router;