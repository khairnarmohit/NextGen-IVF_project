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


exports.getTreatmentPage = (req, res) => {
  try {
    var sql = "SELECT * FROM treatments ORDER BY treatment_id DESC";
    exe(sql, [], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).render("error", { message: "Error fetching treatments" });
      } else {
        res.render('admin/treatment', { treatments: result });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Treatment Page Error" });
  }
};



exports.postTreatmentSave = async (req, res) => {
  try {
    const d = req.body;

    // image upload
    let filename = "";

    if (req.files && req.files.treatment_image) {
      const image = req.files.treatment_image;
      filename = Date.now() + "_" + image.name;
      await image.mv("public/uploads/" + filename);
    }

    const sql = `
      INSERT INTO treatments
      (treatment_title, treatment_short, treatment_image, treatment_icon, treatment_long)
      VALUES (?, ?, ?, ?, ?)
    `;

    await exe(sql, [
      d.treatment_title,
      d.treatment_short,
      filename,
      d.treatment_icon,
      d.treatment_long,
    ]);

    res.redirect("/admin/treatment");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Error saving treatment",
    });
  }
};

exports.postTreatmentEdit = async (req, res) => {
  try {
    const id = req.params.id;

    const sql = "SELECT * FROM treatments WHERE treatment_id = ?";
    const result = await exe(sql, [id]);
    // पहिला record edit page ला पाठवतो
    res.render("admin/treatment_edit", {
      treatment: result[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Error editing treatment"
    });
  }
};


exports.postTreatmentUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const d = req.body;

    // image upload
    let filename = "";

    if (req.files && req.files.treatment_image) {
      const image = req.files.treatment_image;
      filename = Date.now() + "_" + image.name;
      await image.mv("public/uploads/" + filename);
    }

    const sql = `
      UPDATE treatments
      SET treatment_title = ?, treatment_short = ?, treatment_image = ?, treatment_icon = ?, treatment_long = ?
      WHERE treatment_id = ?
    `;

    await exe(sql, [
      d.treatment_title,
      d.treatment_short,
      filename,
      d.treatment_icon,
      d.treatment_long,
      id
    ]);

    res.redirect("/admin/treatment");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Error updating treatment"
    });
  }
};

exports.getTreatmentDelete = async (req, res) => {
  try {
    const id = req.params.id;
    const sql = "DELETE FROM treatments WHERE treatment_id = ?";
    await exe(sql, [id]);
    res.redirect("/admin/treatment");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Error deleting treatment"
    });
  }
};

exports.getDoctorsPage = async (req, res) => {
  try {
    const sql = "SELECT * FROM doctors ORDER BY doctor_id DESC";
    const doctors = await exe(sql);

    res.render("admin/doctors", { doctors });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Doctors Page Error"
    });
  }
};



exports.postDoctorSave = async (req, res) => {
  try {
    const d = req.body;
    // image upload
    let filename = "";
    if (req.files && req.files.doctor_photo) {
      const image = req.files.doctor_photo;
      filename = Date.now() + "_" + image.name;
      await image.mv("public/uploads/" + filename);
    }
    const sql = `
      INSERT INTO doctors
      (doctor_name, doctor_qual, doctor_photo, doctor_specialist, doctor_exp)
      VALUES (?, ?, ?, ?, ?)
    `;
    await exe(sql, [
      d.doctor_name,
      d.doctor_qual,
      filename,
      d.doctor_specialist,
      d.doctor_exp
    ]);
    res.redirect("/admin/doctors");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Error saving doctor"
    });
  }
};

exports.getDoctorEdit = async (req, res) => {
  try {
    const id = req.params.id;
    const sql = "SELECT * FROM doctors WHERE doctor_id = ?";
    const result = await exe(sql, [id]);
    res.render("admin/doctor_edit", {
      doctor: result[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { 
      message: "Error editing doctor"
    });
  }
};

exports.postDoctorUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const d = req.body;
    // image upload
    let filename = d.existing_photo;
    if (req.files && req.files.doctor_photo) {
      const image = req.files.doctor_photo;
      filename = Date.now() + "_" + image.name;
      await image.mv("public/uploads/" + filename);
    }
    const sql = `
      UPDATE doctors
      SET doctor_name = ?, doctor_qual = ?, doctor_photo = ?, doctor_specialist = ?, doctor_exp = ?
      WHERE doctor_id = ?
    `;
    await exe(sql, [
      d.doctor_name,
      d.doctor_qual,
      filename,
      d.doctor_specialist,
      d.doctor_exp,
      id
    ]);
    res.redirect("/admin/doctors");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Error updating doctor"
    });
  }
};

exports.getDoctorDelete = async (req, res) => {
  try {
    const id = req.params.id;
    const sql = "DELETE FROM doctors WHERE doctor_id = ?";
    await exe(sql, [id]);
    res.redirect("/admin/doctors");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Error deleting doctor"
    });
  }
};