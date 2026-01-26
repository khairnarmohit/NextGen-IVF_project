var express = require('express');
const router = express.Router();

var adminController = require("../controllers/adminController");

router.get("/", adminController.getAdminDashboard);

router.get("/about-us", adminController.getAboutUsPage);

router.get("/philosophy", adminController.getPhilosophyPage);

router.get("/directors-message", adminController.getDirectorsMessagePage);

router.get("/patient-review", adminController.getPatientReviewPage);

router.get("/gallery", adminController.getGalleryPage);

module.exports = router;