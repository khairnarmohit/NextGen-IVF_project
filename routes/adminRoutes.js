var express = require('express');
const router = express.Router();

var adminController = require("../controllers/adminController");


function isLoggedIn(req, res, next) {
  if (req.session.admin) {
     next();
  }else{
    res.redirect("/admin/login");
  }
}

router.get("/login", adminController.getLoginPage);

router.post("/login", adminController.postLogin);

router.get("/", isLoggedIn, adminController.getAdminDashboard);

router.get("/about-us", isLoggedIn, adminController.getAboutUsPage);

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


// gallery secrion
router.get("/gallery", adminController.getGalleryPage);

router.get("/privacy", adminController.getPrivacyPage);

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


// enquiry
router.get("/enquiry", adminController.getEnquiryPage);
router.get("/enquiry/delete/:enquiry_id", adminController.getDeleteEnquiry);



router.get("/contact", adminController.getContactPage);

router.post("/update-contact", adminController.postUpdateContact);

router.get("/patient-review", adminController.getPatientReviewPage);

router.post("/patient-review/save", adminController.saveReview);
router.post("/patient-review/update", adminController.updateReview);
router.get("/patient-review/delete/:id", adminController.deleteReview);

router.get("/privacy", adminController.getPrivacyPage);
router.post("/privacy/save", adminController.savePrivacy);
router.post("/privacy/update", adminController.updatePrivacy);
router.get("/privacy/delete/:id", adminController.deletePrivacy);

// faq
router.get("/faq", adminController.getFaqPage);

router.post('/save_faq_type', adminController.saveFaqType);
router.post('/save_faq', adminController.saveFaq);

// Edit FAQ routes
router.get("/edit_faq/:faq_id", adminController.editFaqForm);
router.post("/edit_faq/:faq_id", adminController.updateFaq);


// Delete
router.get("/delete_faq/:faq_id", adminController.deleteFaq);



router.get("/newsletter", adminController.getNewsletterPage);
// router.get("/newsletter/delete/:id", adminController.getDeleteNewsletter);








router.get("/hero", adminController.getHeroPage);
router.post("/update-hero", adminController.postUpdateHero);

router.get("/visitor-doctors", adminController.getVisitorDoctorsPage);

router.post("/visitor_doctor_save", adminController.postVisitorDoctorSave);

router.get('/visitor-doctor-edit/:id', adminController.getVisitorDoctorEdit);

router.post('/visitor_doctor_update/:id', adminController.postVisitorDoctorUpdate);

router.get('/visitor_doctor_delete/:id', adminController.getVisitorDoctorDelete);

// router.post('/appointment-save', adminController.postAppointmentSave); // Commented out - not implemented

router.get('/appointments-list', adminController.getAppointmentsListPage);

router.get("/terms", adminController.getTermsPage);
router.post("/terms/save", adminController.saveTerm);
router.post("/terms/update", adminController.updateTerm);
router.get("/terms/delete/:id", adminController.deleteTerm);


router.get('/appointments_cancel/:id', adminController.getCancelAppointment);

router.get('/appointments_complete/:id', adminController.getCompleteAppointment);

router.get('/appointments-completed', adminController.getCompletedAppointmentsPage);

router.get('/appointments-cancelled', adminController.getCancelledAppointmentsPage);

router.get('/appointment', adminController.getAppointmentPage);

router.post('/appointment-save', adminController.postAppointmentSave);



module.exports = router;


















