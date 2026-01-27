var exe = require("../model/conn.js");

exports.getHomePage = (req, res) => {
  try{
    res.render("user/home");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Home Page Error" });
  }
};




exports.getAboutPage = (req, res) => {
  try{
    res.render("user/about");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "About Page Error" });
  }
};






exports.getTreatmentPage = async (req, res) => {
  try {
    const sql = "SELECT * FROM treatments";
    const treatments = await exe(sql);

    res.render("user/treatments", {
      treatments: treatments
    });

  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Treatment Page Error"
    });
  }
};

exports.getTreatmentDetailsPage = async (req, res) => {
  try {
    const treatmentId = req.params.id;
    const sql = "SELECT * FROM treatments WHERE treatment_id = ?";
    const results = await exe(sql, [treatmentId]);
    if (results.length === 0) {
      res.status(404).render("error", { message: "Treatment Not Found" });
    } else {
      res.render("user/treatment_details", {
        treatment: results[0]
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Treatment Details Page Error" });
  }
};


exports.getDoctorsPage = async (req, res) => {
  try {
    const sql = "SELECT * FROM doctors";
    const doctors = await exe(sql);

    res.render("user/doctors", { doctors });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Doctors Page Error"
    });
  }
};





exports.getContactPage = (req, res) => {
  try{
    res.render("user/contact");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Contact Page Error" });
  }
};




exports.getPatientStoriesPage = (req, res) => {
  try{
    res.render("user/patient_stories");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Patient Stories Page Error" });
  }
};


exports.getFaqPage = (req, res) => {
  try{
    res.render("user/faq");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "FAQ Page Error" });
  }
};

exports.getPrivacyPage = (req, res) => {
  try{
    res.render("user/privacy");
  } catch (error) {
    console.error(error);
    res.status(50).render("error", { message: "Privacy Page Error"});
  }
};


exports.getAppointmentPage = (req, res) => {
  try{
    res.render("user/appointment");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Appointment Page Error" });
  }
};
