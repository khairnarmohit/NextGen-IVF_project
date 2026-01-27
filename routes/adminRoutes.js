var express = require('express');
const router = express.Router();

var adminController = require("../controllers/adminController");

router.get("/", adminController.getAdminDashboard);

router.get("/about-us", adminController.getAboutUsPage);

router.post("/update-about", adminController.postUpdateAbout);

router.get("/philosophy", adminController.getPhilosophyPage);

router.post("/update-philosophy", adminController.postUpdatePhilosophy);

router.get("/directors-message", adminController.getDirectorsMessagePage);

router.post("/update-directors-message", adminController.postUpdateDirectorsMessage);

router.get("/why-choose-us", adminController.getWhyChooseUsPage);

router.post("/save-why-choose-us", adminController.postSaveWhyChooseUs);

router.get("/edit-why-choose-us/:id", adminController.getEditWhyChooseUsPage);

router.post("/update-why-choose-us", adminController.postUpdateWhyChooseUs);

router.get("/delete-why-choose-us/:id", adminController.getDeleteWhyChooseUs);

router.get("/achievements", adminController.getAchievementsPage);

router.post("/save-milestones", adminController.postSaveMilestones);

router.get("/edit-milestones/:id", adminController.getEditMilestonesPage);

router.post("/update-milestones", adminController.postUpdateMilestones);

router.get("/delete-milestones/:id", adminController.getDeleteMilestones);

router.post("/save-awards", adminController.postSaveAwards);

router.get("/edit-awards/:id", adminController.getEditAwardsPage);

router.post("/update-awards", adminController.postUpdateAwards);

router.get("/delete-awards/:id", adminController.getDeleteAwards);

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

router.post("/save-gallery", adminController.postGalleryImage);

router.post("/gallery/delete/:image_id", adminController.deleteGalleryImage);

router.get("/enquiry", adminController.getEnquiryPage);


router.get("/contact", adminController.getContactPage);

router.post("/update-contact", adminController.postUpdateContact);




// privacy page
// router.get("/privacy", adminController.getPrivacyPage);


// pateint review
router.get("/patient-review", adminController.getPatientReviewPage);

// router.get("/patient-review/edit/:id", adminController.getEditPatientReviewPage);  // Function not defined
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
































