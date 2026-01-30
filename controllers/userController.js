var exe = require("../model/conn.js");
var nodemailer = require("nodemailer");

exports.getAboutPage = async (req, res) => {
  try {
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
      treatments: treatments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Treatment Page Error",
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
        treatment: results[0],
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .render("error", { message: "Treatment Details Page Error" });
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
      visitingDoctors,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Doctors Page Error",
    });
  }
};

exports.getContactPage = async (req, res) => {
  try {
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
      enquiry_message,
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
      enquiry_message,
    ]);

    // success redirect
    res.redirect("/contact");
  } catch (error) {
    console.error(error);
    res.status(500).send("Enquiry insert error");
  }
};

exports.getPatientStoriesPage = (req, res) => {
  try {
    res.render("user/patient_stories");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Patient Stories Page Error" });
  }
};

exports.getFaqPage = (req, res) => {
  try {
    res.render("user/faq");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "FAQ Page Error" });
  }
};

exports.getPrivacyPage = (req, res) => {
  try {
    res.render("user/privacy");
  } catch (error) {
    console.error(error);
    res.status(50).render("error", { message: "Privacy Page Error" });
  }
};

// exports.getAppointmentPage = async (req, res) => {
//   try{
//     var sql = "SELECT * FROM doctors";
//     const doctors = await exe(sql);
//     res.render("user/appointment", { doctors });
//   } catch (error) {
//     console.error(error);
//     res.status(500).render("error", { message: "Appointment Page Error" });
//   }
// };
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
      visitingDoctors,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Appointment Page Error",
    });
  }
};

// exports.saveAppointment = async (req, res) => {
//   try {
//     const {
//       patient_fullname,
//       patient_email,
//       patient_mobile,
//       patient_gender,
//       patient_age,
//       doctor_id,
//       appointment_date
//     } = req.body;

//     // Parse doctor_id: 'd-1' for doctors, 'v-2' for visiting doctors
//     let parsedDoctorId = null;
//     if (doctor_id) {
//       const [type, id] = doctor_id.split('-');
//       parsedDoctorId = parseInt(id);  // store positive ID for both types
//     }

//     const sql = `
//       INSERT INTO appointments
//       (patient_fullname, patient_email, patient_mobile, patient_gender, patient_age, doctor_id, appointment_date)
//       VALUES (?, ?, ?, ?, ?, ?, ?)
//     `;

//     await exe(sql, [
//       patient_fullname,
//       patient_email,
//       patient_mobile,
//       patient_gender,
//       patient_age,
//       parsedDoctorId,
//       appointment_date
//     ]);

//     res.redirect("/appointment");

//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Appointment insert error");
//   }
// };

exports.saveAppointment = async (req, res) => {
  try {
    var patientemail = req.body.patient_email;
    const {
      patient_fullname,
      patient_email,
      patient_mobile,
      patient_gender,
      patient_age,
      doctor_id,
      appointment_date,
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

    // Insert Appointment
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
      appointment_date,
    ]);

    // Get Doctor / Visitor Doctor Name
    let doctor_name = "Not Assigned";

    if (doctorId) {
      var sql2 = "SELECT doctor_name FROM doctors WHERE doctor_id = ?";
      var doctor = await exe(sql2, [doctorId]);
      doctor_name = doctor[0].doctor_name;
    } else if (visitorDoctorId) {
      var sql2 =
        "SELECT visitor_doctor_name FROM visitor_doctors WHERE visitor_doctor_id = ?";
      var doctor = await exe(sql2, [visitorDoctorId]);
      doctor_name = doctor[0].visitor_doctor_name;
    }

    // Format Appointment Date
    const formattedDate = new Date(appointment_date).toDateString();

    // Nodemailer Transport (FIXED PORT)
    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587, // ✅ Correct Port
      secure: false,
      auth: {
        user: "magarlalitnandkumar@gmail.com",
        pass: "srkx knhn nzvb kidr", // App Password
      },
    });

    // Designed Email
    const mailOptions = {
      from: "NextGen IVF Center <magarlalitnandkumar@gmail.com>",
      to: patientemail,
      subject: "Your Apointment Book Successfully - NextGen IVF Center",
      html: `
        <div style="font-family: Arial, sans-serif; background:#f9f9f9; padding:20px;">
          <div style="max-width:600px; margin:auto; background:#ffffff; padding:25px; border-radius:8px; box-shadow:0 0 10px rgba(0,0,0,0.1);">
            
            <h2 style="color:#0d6efd; text-align:center;">
              Appointment Confirmed ✅
            </h2>

            <p>Dear <strong>${patient_fullname}</strong>,</p>

            <p>Your appointment is Booked successfully scheduled at 
            <strong>NextGen IVF Center</strong>. Please find the details below:</p>

            <table style="width:100%; border-collapse:collapse; margin-top:15px;">
             <tr>
                <td style="padding:8px; border:1px solid #ddd;"><strong>Patient Name</strong></td>
                <td style="padding:8px; border:1px solid #ddd;">${patient_fullname}</td>
              </tr>
              <tr>
                <td style="padding:8px; border:1px solid #ddd;"><strong>Doctor</strong></td>
                <td style="padding:8px; border:1px solid #ddd;">${doctor_name}</td>
              </tr>
              <tr>
                <td style="padding:8px; border:1px solid #ddd;"><strong>Appointment Date</strong></td>
                <td style="padding:8px; border:1px solid #ddd;">${formattedDate}</td>
              </tr>
             
            </table>

            <p style="margin-top:20px;">
              Please arrive 10 minutes early and carry any previous medical reports if available.
            </p>

            <p>
              If you have any questions, feel free to contact us.
            </p>

            <hr>

            <p style="font-size:13px; color:#666; text-align:center;">
              Thank you for choosing <strong>NextGen IVF Center</strong><br>
              📞 +91-7020399653 | 📧 lalitmagar1729@gmail.com
            </p>

          </div>
        </div>
      `,
    };

    // Send Email (ONLY ONCE)
    await transporter.sendMail(mailOptions);

    res.redirect("/appointment");
  } catch (error) {
    console.error(error);
    res.status(500).send("Appointment insert error");
  }
};

exports.getTermsPage = (req, res) => {
  try {
    res.render("user/terms");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Terms Page Error" });
  }
};

exports.getHomePage = async (req, res) => {
  try {
    var sql = "SELECT * FROM hero WHERE hero_id = 1";
    var hero_info = await exe(sql);

    if (hero_info.length == 0) {
      hero_info = [
        {
          hero_heading: "Helping you build of the family of your dreams!",
          hero_background: "baby_crawl_video.mp4",
        },
      ];
    } else {
      hero_info = hero_info[0];
    }
    res.render("user/home", { hero_info });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Home Page Error" });
  }
};

exports.getPatientStoriesPage = async (req, res) => {
  try {
    var sql = "SELECT * FROM patients_review ORDER BY patients_review_id DESC";
    var stories = await exe(sql);
    var packet = { stories };

    console.log(stories);

    res.render("user/patient_stories", packet);
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Patient Stories Page Error" });
  }
};
