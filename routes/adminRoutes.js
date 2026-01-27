var express = require('express');
const router = express.Router();

var adminController = require("../controllers/adminController");

router.get("/", adminController.getAdminDashboard);

router.get("/about-us", adminController.getAboutUsPage);

router.get("/philosophy", adminController.getPhilosophyPage);

router.get("/directors-message", adminController.getDirectorsMessagePage);

router.get("/patient-review", adminController.getPatientReviewPage);

router.get("/gallery", adminController.getGalleryPage);

// privacy page
router.get("/privacy", adminController.getPrivacyPage);


// pateint review
router.get("/patient-review", adminController.getPatientReviewPage);

// router.get("/patient-review/edit/:id", adminController.getEditPatientReviewPage); 
// -----------------------------------------------------

router.post("/patient-review/save", adminController.saveReview);
router.post("/patient-review/update", adminController.updateReview);
router.get("/patient-review/delete/:id", adminController.deleteReview);


// privacy
router.get("/privacy", adminController.getPrivacyPage);
router.post("/privacy/save", adminController.savePrivacy);
router.post("/privacy/update", adminController.updatePrivacy);
router.get("/privacy/delete/:id", adminController.deletePrivacy);





module.exports = router;



























