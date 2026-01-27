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

router.get("/contact", adminController.getContactPage);

router.post("/update-contact", adminController.postUpdateContact);


module.exports = router;