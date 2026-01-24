var express = require('express');
const router = express.Router();

var userController = require("../controllers/userController");

router.get("/", userController.getHomePage);

router.get("/about", userController.getAboutPage);

router.get("/Treatments" , userController.getTreatmentPage)

router.get("/doctors", userController.getDoctorsPage);

router.get("/contact", userController.getContactPage);


module.exports = router;