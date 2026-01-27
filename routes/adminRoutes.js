var express = require('express');
const router = express.Router();

var adminController = require("../controllers/adminController");

router.get("/", adminController.getAdminDashboard);

router.get("/about-us", adminController.getAboutUsPage);

router.get("/philosophy", adminController.getPhilosophyPage);

router.get("/directors-message", adminController.getDirectorsMessagePage);

router.get("/patient-review", adminController.getPatientReviewPage);

router.get("/gallery", adminController.getGalleryPage);

router.get("/treatment", adminController.getTreatmentPage);

router.post("/treatment_save", adminController.postTreatmentSave);

router.get("/treatment_edit/:id", adminController.postTreatmentEdit);

router.post("/treatment_update/:id", adminController.postTreatmentUpdate);

router.get("/treatment_delete/:id", adminController.getTreatmentDelete);

router.get("/doctors", adminController.getDoctorsPage);

router.post("/doctor_save", adminController.postDoctorSave);    

router.get("/doctor_edit/:id", adminController.getDoctorEdit);

router.post("/doctor_update/:id", adminController.postDoctorUpdate);

router.get("/doctor_delete/:id", adminController.getDoctorDelete);

module.exports = router;