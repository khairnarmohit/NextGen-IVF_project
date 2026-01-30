var exe = require("../model/conn.js");

exports.getAboutPage = async (req, res) => {
  try{
    var sql = "SELECT * FROM about WHERE about_id = ?";
    var aboutinfo = await exe(sql, [1]);

    var sql2 = "SELECT * FROM vision_mission WHERE vision_mission_id = ?";
    var vision_mission = await exe(sql2, [1]);

    var sql3 = "SELECT * FROM director_msg WHERE director_msg_id = ?";
    var director_msg = await exe(sql3, [1]);

    var sql4 = "SELECT * FROM whychooseus";
    var whychooseus = await exe(sql4);

    var packet = { aboutinfo, vision_mission, director_msg, whychooseus };
    console.log(packet);
    res.render("user/about", packet);
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


// exports.getDoctorsPage = async (req, res) => {
//   try {
//     const sql = "SELECT * FROM doctors";
//     const doctors = await exe(sql);

//     res.render("user/doctors", { doctors });
//   } catch (error) {
//     console.error(error);
//     res.status(500).render("error", {
//       message: "Doctors Page Error"
//     });
//   }
// };
exports.getDoctorsPage = async (req, res) => {
  try {
    // Normal doctors
    const Sql = "SELECT * FROM doctors";
    const doctors = await exe(Sql);

    // Visiting doctors
    const visitingSql = "SELECT * FROM visitor_doctors ";
    const visitingDoctors = await exe(visitingSql);

    res.render("user/doctors", {
      doctors,
      visitingDoctors
    });

  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Doctors Page Error"
    });
  }
};





exports.getContactPage = async (req, res) => {
  try{
    var sql = "SELECT * FROM contact Where contact_id = 2";
    var contact = await exe(sql);
    var packet = { contact };
    res.render("user/contact", packet);
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



exports.getAppointmentPage = async (req, res) => {
  try {
    // Our Doctors
    const doctorsSql = "SELECT * FROM doctors";
    const doctors = await exe(doctorsSql);

    // Visiting Doctors
    const visitingSql = "SELECT * FROM visitor_doctors";
    const visitingDoctors = await exe(visitingSql);

    res.render("user/appointment", {
      doctors,
      visitingDoctors
    });

  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Appointment Page Error"
    });
  }
};


exports.saveAppointment = async (req, res) => {
  try {
    const {
      patient_fullname,
      patient_email,
      patient_mobile,
      patient_gender,
      patient_age,
      doctor_id,
      appointment_date
    } = req.body;

    let doctorId = null;
    let visitorDoctorId = null;

    if (doctor_id) {
      const [type, id] = doctor_id.split("-");

      if (type === "d") {
        doctorId = parseInt(id);
      } else if (type === "v") {
        visitorDoctorId = parseInt(id);
      }
    }

    const sql = `
      INSERT INTO appointments
      (
        patient_fullname,
        patient_email,
        patient_mobile,
        patient_gender,
        patient_age,
        doctor_id,
        visitor_doctor_id,
        appointment_date
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await exe(sql, [
      patient_fullname,
      patient_email,
      patient_mobile,
      patient_gender,
      patient_age,
      doctorId,
      visitorDoctorId,
      appointment_date
    ]);

    res.redirect("/appointment");

  } catch (error) {
    console.error(error);
    res.status(500).send("Appointment insert error");
  }
};





exports.getHomePage = async (req, res) => {
  try {
    var sql = "SELECT * FROM hero WHERE hero_id = 1";
    var treatment = "SELECT * FROM treatments LIMIT 3";
    var doctors = "SELECT * FROM doctors LIMIT 3";
    var hero_info = await exe(sql);
    var treatments = await exe(treatment);
    var doctors = await exe(doctors);

    if (hero_info.length == 0) {
      hero_info = [{
        hero_heading: "Helping you build of the family of your dreams!",
        hero_background: "baby_crawl_video.mp4" 
      }];
    } else {
      hero_info = hero_info[0];
    }
    res.render("user/home", { hero_info, treatments, doctors });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Home Page Error" });
  }
};









exports.getPatientStoriesPage = async (req, res) => {
  try {
    var sql = "SELECT * FROM patients_review ORDER BY patients_review_id DESC";
    var stories = await exe(sql);
    var packet = {stories};

    // console.log(stories)

    res.render("user/patient_stories", packet);
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Patient Stories Page Error" });
  }
};





exports.getPrivacyPage = async (req, res) => {
  try {
    var data = await exe(`SELECT * FROM privacy ORDER BY privacy_id DESC`);
    res.render("user/privacy", { list: data });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Privacy Page Error" });
  }
};



exports.getTermsPage = async (req, res) => {
  try {
    var data = await exe(`SELECT * FROM terms ORDER BY term_id DESC`);
    res.render("user/terms", { list: data });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Terms Page Error" });
  }
};