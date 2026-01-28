var express = require('express');
const router = express.Router();

var userController = require("../controllers/userController");

router.get("/", userController.getHomePage);
router.get("/about", userController.getAboutPage);
router.get("/doctors", userController.getDoctorsPage);
router.get("/Treatments", userController.getTreatmentPage);

router.get("/about", userController.getAboutPage);

router.get("/treatments" , userController.getTreatmentPage)

router.get("/doctors", userController.getDoctorsPage);

router.get("/contact", userController.getContactPage);


router.post("/save-enquiry", userController.saveEnquiry);





router.get("/patient-stories", userController.getPatientStoriesPage);

router.get("/faq", userController.getFaqPage);

router.get("/privacy", userController.getPrivacyPage);

router.get("/appointment", userController.getAppointmentPage);

router.post("/save-appointment", userController.saveAppointment);

router.get('/treatment-details/:id', userController.getTreatmentDetailsPage);

module.exports = router;
