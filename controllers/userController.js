var exe = require("../model/conn.js");

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

exports.saveEnquiry = async (req, res) => {
  try {
    const {
      enquiry_first,
      enquiry_last,
      enquiry_email,
      enquiry_number,
      enquiry_subject,
      enquiry_message
    } = req.body;

    // First + Last combine
    const enquiry_name = enquiry_first + " " + enquiry_last;

    const sql = `
      INSERT INTO enquiry
      (enquiry_name, enquiry_email, enquiry_number, enquiry_subject, enquiry_message)
      VALUES (?, ?, ?, ?, ?)
    `;

    await exe(sql, [
      enquiry_name,
      enquiry_email,
      enquiry_number,
      enquiry_subject,
      enquiry_message
    ]);

    // success redirect
    res.redirect("/contact");

  } catch (error) {
    console.error(error);
    res.status(500).send("Enquiry insert error");
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

exports.getHomePage = async (req, res) => {
  try {
    var sql = "SELECT * FROM hero WHERE hero_id = 1";
    var hero_info = await exe(sql);

    if (hero_info.length == 0) {
      hero_info = [{
        hero_heading: "Helping you build of the family of your dreams!",
        hero_background: "baby_crawl_video.mp4" 
      }];
    } else {
      hero_info = hero_info[0];
    }
    res.render("user/home", { hero_info });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Home Page Error" });
  }
};



