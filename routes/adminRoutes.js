var express = require("express");
const router = express.Router();

var adminController = require("../controllers/adminController");

function isLoggedIn(req, res, next) {
  if (req.session.admin) {
    next();
  } else {
    res.redirect("/admin/login");
  }
}

router.get("/login", adminController.getLoginPage);

router.post("/login", adminController.postLogin);

router.get("/", isLoggedIn, adminController.getAdminDashboard);

router.get("/about-us", isLoggedIn, adminController.getAboutUsPage);

router.post("/update-about", isLoggedIn, adminController.postUpdateAbout);

router.get("/philosophy", isLoggedIn, adminController.getPhilosophyPage);

router.post(
  "/update-philosophy",
  isLoggedIn,
  adminController.postUpdatePhilosophy
);

router.get(
  "/directors-message",
  isLoggedIn,
  adminController.getDirectorsMessagePage
);

router.post(
  "/update-directors-message",
  isLoggedIn,
  adminController.postUpdateDirectorsMessage
);

router.get("/why-choose-us", isLoggedIn, adminController.getWhyChooseUsPage);

router.post(
  "/save-why-choose-us",
  isLoggedIn,
  adminController.postSaveWhyChooseUs
);

router.get(
  "/edit-why-choose-us/:id",
  isLoggedIn,
  adminController.getEditWhyChooseUsPage
);

router.post(
  "/update-why-choose-us",
  isLoggedIn,
  adminController.postUpdateWhyChooseUs
);

router.get(
  "/delete-why-choose-us/:id",
  isLoggedIn,
  adminController.getDeleteWhyChooseUs
);

router.get("/achievements", isLoggedIn, adminController.getAchievementsPage);

router.post("/save-milestones", isLoggedIn, adminController.postSaveMilestones);

router.get(
  "/edit-milestones/:id",
  isLoggedIn,
  adminController.getEditMilestonesPage
);

router.post(
  "/update-milestones",
  isLoggedIn,
  adminController.postUpdateMilestones
);

router.get(
  "/delete-milestones/:id",
  isLoggedIn,
  adminController.getDeleteMilestones
);

router.post("/save-awards", isLoggedIn, adminController.postSaveAwards);

router.get("/edit-awards/:id", isLoggedIn, adminController.getEditAwardsPage);

router.post("/update-awards", isLoggedIn, adminController.postUpdateAwards);

router.get("/delete-awards/:id", isLoggedIn, adminController.getDeleteAwards);

router.get("/patient-review", isLoggedIn, adminController.getPatientReviewPage);

// gallery secrion
router.get("/gallery", isLoggedIn, adminController.getGalleryPage);

router.get("/privacy", isLoggedIn, adminController.getPrivacyPage);

router.get("/treatment", isLoggedIn, adminController.getTreatmentPage);

router.post("/treatment_save", isLoggedIn, adminController.postTreatmentSave);

router.get(
  "/treatment_edit/:id",
  isLoggedIn,
  adminController.postTreatmentEdit
);

router.post(
  "/treatment_update/:id",
  isLoggedIn,
  adminController.postTreatmentUpdate
);

router.get(
  "/treatment_delete/:id",
  isLoggedIn,
  adminController.getTreatmentDelete
);

router.get("/doctors", isLoggedIn, adminController.getDoctorsPage);

router.post("/doctor_save", isLoggedIn, adminController.postDoctorSave);

router.get("/doctor_edit/:id", isLoggedIn, adminController.getDoctorEdit);

router.post("/doctor_update/:id", isLoggedIn, adminController.postDoctorUpdate);

router.get("/doctor_delete/:id", isLoggedIn, adminController.getDoctorDelete);

router.post("/save-gallery", isLoggedIn, adminController.postGalleryImage);
router.post(
  "/gallery/delete/:image_id",
  isLoggedIn,
  adminController.deleteGalleryImage
);

// enquiry
router.get("/enquiry", isLoggedIn, adminController.getEnquiryPage);
router.get(
  "/enquiry/delete/:enquiry_id",
  isLoggedIn,
  adminController.getDeleteEnquiry
);

router.get("/contact", isLoggedIn, adminController.getContactPage);

router.post("/update-contact", isLoggedIn, adminController.postUpdateContact);

router.get("/patient-review", isLoggedIn, adminController.getPatientReviewPage);

router.post("/patient-review/save", isLoggedIn, adminController.saveReview);

router.post("/patient-review/update", isLoggedIn, adminController.updateReview);
router.get(
  "/patient-review/delete/:id",
  isLoggedIn,
  adminController.deleteReview
);

router.get("/privacy", isLoggedIn, adminController.getPrivacyPage);
router.post("/privacy/save", isLoggedIn, adminController.savePrivacy);
router.post("/privacy/update", isLoggedIn, adminController.updatePrivacy);
router.get("/privacy/delete/:id", isLoggedIn, adminController.deletePrivacy);

// faq
router.get("/faq", isLoggedIn, adminController.getFaqPage);

router.post("/save_faq_type", isLoggedIn, adminController.saveFaqType);
router.post("/save_faq", isLoggedIn, adminController.saveFaq);

// Edit FAQ routes
router.get("/edit_faq/:faq_id", isLoggedIn, adminController.editFaqForm);
router.post("/edit_faq/:faq_id", isLoggedIn, adminController.updateFaq);

// Delete
router.get("/delete_faq/:faq_id", isLoggedIn, adminController.deleteFaq);

router.get("/hero", isLoggedIn, adminController.getHeroPage);
router.post("/update-hero", isLoggedIn, adminController.postUpdateHero);

router.get(
  "/visitor-doctors",
  isLoggedIn,
  adminController.getVisitorDoctorsPage
);

router.post(
  "/visitor_doctor_save",
  isLoggedIn,
  adminController.postVisitorDoctorSave
);

router.get(
  "/visitor-doctor-edit/:id",
  isLoggedIn,
  adminController.getVisitorDoctorEdit
);

router.post(
  "/visitor_doctor_update/:id",
  isLoggedIn,
  adminController.postVisitorDoctorUpdate
);

router.get(
  "/visitor_doctor_delete/:id",
  isLoggedIn,
  adminController.getVisitorDoctorDelete
);

// router.post('/appointment-save', isLoggedIn, adminController.postAppointmentSave); // Commented out - not implemented

router.get(
  "/appointments-list",
  isLoggedIn,
  adminController.getAppointmentsListPage
);

router.get("/terms", isLoggedIn, adminController.getTermsPage);
router.post("/terms/save", isLoggedIn, adminController.saveTerm);
router.post("/terms/update", isLoggedIn, adminController.updateTerm);
router.get("/terms/delete/:id", isLoggedIn, adminController.deleteTerm);

router.get(
  "/appointments_cancel/:id",
  isLoggedIn,
  adminController.getCancelAppointment
);

router.get(
  "/appointments_complete/:id",
  isLoggedIn,
  adminController.getCompleteAppointment
);

router.get(
  "/appointments-completed",
  isLoggedIn,
  adminController.getCompletedAppointmentsPage
);

router.get(
  "/appointments-cancelled",
  isLoggedIn,
  adminController.getCancelledAppointmentsPage
);

router.get("/appointment", isLoggedIn, adminController.getAppointmentPage);

router.post(
  "/appointment-save",
  isLoggedIn,
  adminController.postAppointmentSave
);


router.get("/forgot-password", adminController.getForgotPasswordPage);

router.post("/send-otp", adminController.postSendOtp);

router.get("/verify-otp", adminController.getVerifyOtpPage);

router.post("/verify-otp", adminController.postVerifyOtp);

router.get("/change-password", adminController.getChangePasswordPage);

router.post("/reset-password", adminController.postResetPassword);




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
