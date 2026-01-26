var exe = require("../model/conn.js");


exports.getAdminDashboard = (req, res) => {
  try {
  res.render('admin/dashboard');
  } catch (error) {
    console.error( error );
    res.status(500).render("error", { message: "Admin Dashboard Page Error" });
  }
};


exports.getAboutUsPage = (req, res) => {
  try {
    res.render('admin/about-us');
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "About Us Page Error" });
  }
};

exports.getPhilosophyPage = (req, res) => {
  try {
    res.render('admin/philosophy');
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Philosophy Page Error" });
  }
};


exports.getDirectorsMessagePage = (req, res) => {
  try {
    res.render('admin/directors-message');
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Director's Message Page Error" });
  }
};


exports.getPatientReviewPage = (req, res) => { 
  try {
    res.render('admin/patient-review');
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Patient Review Page Error" });
  }
};


exports.getGalleryPage = (req, res) => {
  try {
    res.render('admin/gallery');
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Gallery Page Error" });
  }
};


