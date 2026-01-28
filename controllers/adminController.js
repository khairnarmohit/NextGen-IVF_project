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




exports.getGalleryPage = (req, res) => {
  try {
    res.render('admin/gallery');
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Gallery Page Error" });
  }
};



exports.getPatientReviewPage = async (req, res) => { 
  try {
    var data = await exe(`SELECT * FROM patients_review ORDER BY patients_review_id DESC`);

    var editData = null;
    if(req.query.edit) {
        var editResult = await exe(`SELECT * FROM patients_review WHERE patients_review_id='${req.query.edit}'`);
        if(editResult.length > 0) {
            editData = editResult[0];
        }
    }

    res.render('admin/patient-review', { "list": data, "editData": editData });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Patient Review Page Error" });
  }
};

exports.saveReview = async (req, res) => {
  try {
    var d = req.body;
    var filename = "";
    if (req.files && req.files.patients_review_photo) {
      var file = req.files.patients_review_photo;
      filename = Date.now() + file.name;
      file.mv("public/uploads/" + filename);
    } else {
      filename = "default.jpg";
    }
    var sql = `INSERT INTO patients_review 
              (patients_review_name, patients_review_photo, patients_review_desc, patients_review_address, patients_review_date) 
              VALUES ('${d.patients_review_name}', '${filename}', '${d.patients_review_desc}', '${d.patients_review_address}', '${d.patients_review_date}')`;
    await exe(sql);
    res.redirect("/admin/patient-review"); 
  } catch (error) {
    console.log(error);
    res.send("Error saving review");
  }
};

exports.updateReview = async (req, res) => {
  try {
    var d = req.body;
    var filename = d.old_photo;
    if (req.files && req.files.patients_review_photo) {
      var file = req.files.patients_review_photo;
      filename = Date.now() + file.name;
      file.mv("public/uploads/" + filename);
    }
    var sql = `UPDATE patients_review SET 
              patients_review_name='${d.patients_review_name}',
              patients_review_photo='${filename}',
              patients_review_desc='${d.patients_review_desc}',
              patients_review_address='${d.patients_review_address}',
              patients_review_date='${d.patients_review_date}'
              WHERE patients_review_id='${d.patients_review_id}'`;
    await exe(sql);
    res.redirect("/admin/patient-review");
  } catch (error) {
    console.log(error);
    res.send("Error updating review");
  }
};

exports.deleteReview = async (req, res) => {
  try {
    var id = req.params.id;
    var sql = `DELETE FROM patients_review WHERE patients_review_id='${id}'`;
    await exe(sql);
    res.redirect("/admin/patient-review");
  } catch (error) {
    console.log(error);
    res.send("Error deleting review");
  }
};


exports.getPrivacyPage = async (req, res) => {
  try {
    var data = await exe(`SELECT * FROM privacy ORDER BY privacy_id DESC`);

    var editData = null;
    if (req.query.edit) {
      var editResult = await exe(`SELECT * FROM privacy WHERE privacy_id='${req.query.edit}'`);
      if (editResult.length > 0) {
        editData = editResult[0];
      }
    }

    res.render('admin/privacy', { "list": data, "editData": editData });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Privacy Page Error" });
  }
};

exports.savePrivacy = async (req, res) => {
  try {
    var d = req.body;
    var sql = `INSERT INTO privacy (privacy_title, privacy_desc) VALUES ('${d.privacy_title}', '${d.privacy_desc}')`;
    await exe(sql);
    res.redirect("/admin/privacy");
  } catch (error) {
    console.log(error);
    res.send("Error saving privacy section");
  }
};

exports.updatePrivacy = async (req, res) => {
  try {
    var d = req.body;
    var sql = `UPDATE privacy SET 
              privacy_title='${d.privacy_title}',
              privacy_desc='${d.privacy_desc}'
              WHERE privacy_id='${d.privacy_id}'`;
    await exe(sql);
    res.redirect("/admin/privacy");
  } catch (error) {
    console.log(error);
    res.send("Error updating privacy section");
  }
};

exports.deletePrivacy = async (req, res) => {
  try {
    var id = req.params.id;
    var sql = `DELETE FROM privacy WHERE privacy_id='${id}'`;
    await exe(sql);
    res.redirect("/admin/privacy");
  } catch (error) {
    console.log(error);
    res.send("Error deleting privacy section");
  }
};

