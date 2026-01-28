var exe = require("../model/conn.js");

exports.getAdminDashboard = (req, res) => {
  try {

    res.render('admin/dashboard');

    

  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Admin Dashboard Page Error" });
  }
};

exports.getAboutUsPage = async (req, res) => {
  try {
    var sql = "SELECT * FROM about WHERE about_id = 1";
    var about_info = await exe(sql);
    var packet = { about_info };
    res.render("admin/about-us", packet);
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "About Us Page Error" });
  }
};

exports.postUpdateAbout = async (req, res) => {
  try {
    var data = req.body;
    var about_image_old = data.about_image_old;

    if (req.files && req.files.about_image) {
      var filename = Date.now() + "-" + req.files.about_image.name;
      req.files.about_image.mv("public/uploads/" + filename);
    } else {
      filename = about_image_old;
    }
    var sql =
      "UPDATE about SET about_title = ?, about_image = ?, about_desc = ? WHERE about_id = ?";
    var result = await exe(sql, [
      data.about_title,
      filename,
      data.about_desc,
      1,
    ]);
    if (result.affectedRows == 0) {
      res
        .status(400)
        .render("error", { message: "Update About Us Page Error" });
    } else {
      res.redirect("/admin/about-us");
    }
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Update About Us Page Error" });
  }
};

exports.getPhilosophyPage = async (req, res) => {
  try {
    var sql = "SELECT * FROM vision_mission WHERE vision_mission_id = 1";
    var vision_mission_info = await exe(sql);
    var packet = { vision_mission_info };
    res.render("admin/philosophy", packet);
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Philosophy Page Error" });
  }
};

exports.postUpdatePhilosophy = async (req, res) => {
  try {
    var data = req.body;
    if (req.files && req.files.philosophy_image) {
      var filename = Date.now() + "-" + req.files.philosophy_image.name;
      req.files.philosophy_image.mv("public/uploads/" + filename);
    }

    var sql =
      "UPDATE vision_mission SET philosophy_image = ?, vision_desc = ?, mission_desc = ? WHERE vision_mission_id = ?";
    var result = await exe(sql, [
      filename,
      data.vision_desc,
      data.mission_desc,
      1,
    ]);

    if (result.affectedRows == 0) {
      res
        .status(400)
        .render("error", { message: "Update Philosophy Page Error" });
    } else {
      res.redirect("/admin/philosophy");
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .render("error", { message: "Update Philosophy Page Error" });
  }
};



exports.getDirectorsMessagePage = async (req, res) => {

  try {
    var sql = "SELECT * FROM director_msg WHERE director_msg_id = 1";
    var director_msg_info = await exe(sql);
    var packet = { director_msg_info };
    res.render("admin/directors-message", packet);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .render("error", { message: "Director's Message Page Error" });
  }
};

exports.postUpdateDirectorsMessage = async (req, res) => {
  try {
    var data = req.body;
    let filename = data.old_director_image;

    if (req.files && req.files.director_image) {
      filename = Date.now() + "-" + req.files.director_image.name;
      await req.files.director_image.mv("public/uploads/" + filename);
    }

    var sql = `
      UPDATE director_msg 
      SET director_image = ?, 
          director_title = ?,  
          director_desc = ?,  
          director_name = ?, 
          director_designation = ?
      WHERE director_msg_id = ?
    `;

    var result = await exe(sql, [
      filename,
      data.director_title,
      data.director_desc,
      data.director_name,
      data.director_designation,
      1,
    ]);

    if (result.affectedRows == 0) {
      res
        .status(400)
        .render("error", { message: "Failed to update Director's Message" });
    } else {
      res.redirect("/admin/directors-message");
    }
  } catch (error) {
    console.error("Update Director Message Error:", error);
    res
      .status(500)
      .render("error", { message: "Failed to update Director's Message" });
  }
};

exports.getWhyChooseUsPage = async (req, res) => {
  try {
    var sql = "SELECT * FROM whychooseus";
    var whychooseus_info = await exe(sql);
    var packet = { whychooseus_info };
    res.render("admin/why-choose-us", packet);
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Why Choose Us Page Error" });
  }
};

exports.postSaveWhyChooseUs = async (req, res) => {
  try {
    var data = req.body;
    var sql =
      "INSERT INTO whychooseus (whychooseus_name, whychooseus_icon ,whychooseus_desc) VALUES (?, ?, ?)";
    var result = await exe(sql, [
      data.whychooseus_name,
      data.whychooseus_icon,
      data.whychooseus_desc,
    ]);
    if (result.affectedRows == 0) {
      res
        .status(400)
        .render("error", { message: "Failed to save Why Choose Us" });
    } else {
      res.redirect("/admin/why-choose-us");
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .render("error", { message: "Save Why Choose Us Page Error" });
  }
};

exports.getEditWhyChooseUsPage = async (req, res) => {
  try {
    var id = req.params.id;
    var sql = "SELECT * FROM whychooseus WHERE whychooseus_id = ?";
    var whychooseusone = await exe(sql, [id]);
    var packet = { whychooseusone };
    res.render("admin/edit-why-choose-us", packet);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .render("error", { message: "Edit Why Choose Us Page Error" });
  }
};

exports.postUpdateWhyChooseUs = async (req, res) => {
  try {
    var data = req.body;
    var sql =
      "UPDATE whychooseus SET whychooseus_name = ?, whychooseus_icon = ?, whychooseus_desc = ? WHERE whychooseus_id = ?";
    var result = await exe(sql, [
      data.whychooseus_name,
      data.whychooseus_icon,
      data.whychooseus_desc,
      data.whychooseus_id,
    ]);
    if (result.affectedRows == 0) {
      res
        .status(400)
        .render("error", { message: "Failed to update Why Choose Us" });
    } else {
      res.redirect("/admin/why-choose-us");
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .render("error", { message: "Update Why Choose Us Page Error" });
  }
};

exports.getDeleteWhyChooseUs = async (req, res) => {
  try {
    var id = req.params.id;
    var sql = "DELETE FROM whychooseus WHERE whychooseus_id = ?";
    var result = await exe(sql, [id]);
    if (result.affectedRows == 0) {
      res
        .status(400)
        .render("error", { message: "Failed to delete Why Choose Us" });
    } else {
      res.redirect("/admin/why-choose-us");
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .render("error", { message: "Delete Why Choose Us Page Error" });
  }
};

exports.getAchievementsPage = async (req, res) => {
  try {
    var sql = "SELECT * FROM achievements";
    var achievements_info = await exe(sql);

    var sql2 = "SELECT * FROM awards";
    var awards_info = await exe(sql2);

    var packet = { achievements_info, awards_info };
    res.render("admin/achievements", packet);
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Achievements Page Error" });
  }
};

exports.postSaveMilestones = async (req, res) => {
  try {
    var data = req.body;
    var sql =
      "INSERT INTO achievements (achievement_title, achievement_counter, achievement_icon) VALUES (?, ?, ?)";
    var result = await exe(sql, [
      data.achievement_title,
      data.achievement_counter,
      data.achievement_icon,
    ]);
    if (result.affectedRows == 0) {
      res
        .status(400)
        .render("error", { message: "Failed to save Achievements" });
    } else {
      res.redirect("/admin/achievements");
    }
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Save Milestones Page Error" });
  }
};

exports.getEditMilestonesPage = async (req, res) => {
  try {
    var id = req.params.id;
    var sql = "SELECT * FROM achievements WHERE achievement_id = ?";
    var achievementone = await exe(sql, [id]);
    var packet = { achievementone };
    res.render("admin/edit-milestones", packet);
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Edit Milestones Page Error" });
  }
};

exports.postUpdateMilestones = async (req, res) => {
  try {
    var data = req.body;
    var sql =
      "UPDATE achievements SET achievement_title = ?, achievement_counter = ?, achievement_icon = ? WHERE achievement_id = ?";
    var result = await exe(sql, [
      data.achievement_title,
      data.achievement_counter,
      data.achievement_icon,
      data.achievement_id,
    ]);
    if (result.affectedRows == 0) {
      res
        .status(400)
        .render("error", { message: "Failed to update Milestones" });
    } else {
      res.redirect("/admin/achievements");
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .render("error", { message: "Update Milestones Page Error" });
  }
};

exports.getDeleteMilestones = async (req, res) => {
  try {
    var id = req.params.id;
    var sql = "DELETE FROM achievements WHERE achievement_id = ?";
    var result = await exe(sql, [id]);
    if (result.affectedRows == 0) {
      res
        .status(400)
        .render("error", { message: "Failed to delete Milestones" });
    } else {
      res.redirect("/admin/achievements");
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .render("error", { message: "Delete Milestones Page Error" });
  }
};

exports.postSaveAwards = async (req, res) => {
  try {
    var data = req.body;
    var sql =
      "INSERT INTO awards (award_title, award_desc, award_issue, award_year, award_icon) VALUES (?, ?, ?, ?, ?)";
    var result = await exe(sql, [
      data.award_title,
      data.award_desc,
      data.award_issue,
      data.award_year,
      data.award_icon,
    ]);
    if (result.affectedRows == 0) {
      res.status(400).render("error", { message: "Failed to save Awards" });
    } else {
      res.redirect("/admin/achievements");
    }
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Save Awards Page Error" });
  }
};

exports.getEditAwardsPage = async (req, res) => {
  try {
    var id = req.params.id;
    var sql = "SELECT * FROM awards WHERE award_id = ?";
    var awardone = await exe(sql, [id]);
    var packet = { awardone };
    res.render("admin/edit-awards", packet);
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Edit Awards Page Error" });
  }
};

exports.postUpdateAwards = async (req, res) => {
  try {
    var data = req.body;
    var sql =
      "UPDATE awards SET award_title = ?, award_desc = ?, award_issue = ?, award_year = ?, award_icon = ? WHERE award_id = ?";
    var result = await exe(sql, [
      data.award_title,
      data.award_desc,
      data.award_issue,
      data.award_year,
      data.award_icon,
      data.award_id,
    ]);
    if (result.affectedRows == 0) {
      res.status(400).render("error", { message: "Failed to update Awards" });
    } else {
      res.redirect("/admin/achievements");
    }
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Update Awards Page Error" });
  }
};

exports.getDeleteAwards = async (req, res) => {
  try {
    var id = req.params.id;
    var sql = "DELETE FROM awards WHERE award_id = ?";
    var result = await exe(sql, [id]);
    if (result.affectedRows == 0) {
      res.status(400).render("error", { message: "Failed to delete Awards" });
    } else {
      res.redirect("/admin/achievements");
    }
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Delete Awards Page Error" });
  }
};

exports.getPatientReviewPage = (req, res) => {
  try {
    res.render("admin/patient-review");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Patient Review Page Error" });
  }
};



exports.getGalleryPage = async (req, res) => {
  try {
    var sql ="SELECT * FROM gallery";
   var gallery = await exe(sql);
   var packet = {gallery};
    res.render("admin/gallery",packet);
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Gallery Page Error" });
  }
};

exports.getContactPage = async (req, res) => {
  try {
    var sql = "SELECT * FROM contact WHERE contact_id = ?";
    var contact = await exe(sql, [2]);
    var packet = { contact };
    res.render("admin/contact", packet);
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Contact Page Error" });
  }
};


exports.postUpdateContact = async (req, res) => {
  try {
    var data = req.body;

    // Remove height and width from map iframe or URL
    var map = data.map_address
      .replace(/height\s*=\s*["']?\d+["']?/gi, "")
      .replace(/width\s*=\s*["']?\d+["']?/gi, "")
      .replace(/height=\d+&?/gi, "")
      .replace(/width=\d+&?/gi, "");

    // Update contact information in the database
    var sql =
      "UPDATE contact SET phone = ?, email = ?, address = ?, mon_start = ?, mon_end = ?, sat_start = ?, sat_end = ?, sun_start = ?, sun_end = ?, map_address = ?, facebook = ?, instagram = ?, youtube = ?, twitter = ? WHERE contact_id = ?";
    var result = await exe(sql, [
      data.phone,
      data.email,
      data.address,
      data.mon_start,
      data.mon_end,
      data.sat_start,
      data.sat_end,
      data.sun_start,
      data.sun_end,
      map,
      data.facebook,
      data.instagram,
      data.youtube,
      data.twitter,
      2
    ]);
    if (result.affectedRows == 0) {
      res.status(400).render("error", { message: "Failed to update Contact" });
    } else {
      res.redirect("/admin/contact");
    }
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Update Contact Page Error" });
  }
};

// 
// exports.getPrivacyPage = (req, res) => {
//   try {
//     res.render('admin/privacy');
//   } catch (error) {
//     console.error(error);
//     res.status(500).render("error", { message: "privacy Page Error" });
//   }
// };




// pateint-review

// var exe = require("../model/conn.js");

// ... existing functions ...

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




// privacy
// ... existing imports ...

// ... existing functions (getAdminDashboard, etc.) ...

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


exports.postGalleryImage = async (req, res) => {
  try {
    let filename = "";
if (req.files && req.files.image_name) {
      filename = Date.now() + "_" + req.files.image_name.name;
      await req.files.image_name.mv("public/uploads/" + filename);
    }
    const sql = `INSERT INTO gallery (image_name) VALUES (?)`;
    await exe(sql, [filename]);
res.redirect("/admin/gallery");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Gallery Image Upload Failed",
    });
  }
};

exports.deleteGalleryImage = async (req, res) => {
    try {
        const image_id = req.params.image_id;

        // DB मधून row delete करा
        const sqlDel = "DELETE FROM gallery WHERE image_id = ?";
        await exe(sqlDel, [image_id]);

        res.redirect("/admin/gallery");

    } catch (err) {
        console.error(err);
        res.status(500).send("Delete failed");
    }
};





exports.getEnquiryPage = (req, res) => {
  try {
    res.render('admin/enquiry');
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Enquiry Page Error" });
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

exports.getVisitorDoctorsPage = async (req, res) => {
  try {
    const sql = "SELECT * FROM visitor_doctors  ORDER BY visitor_doctor_id  DESC";
    const visitorDoctors = await exe(sql);
    res.render("admin/visitor-doctors", { visitorDoctors });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Doctors Page Error"
    });
  }
};

exports.postVisitorDoctorSave = async (req, res) => {
  try {
    const d = req.body;
    // image upload
    let filename = "";
    if (req.files && req.files.visitor_doctor_photo) {
      const image = req.files.visitor_doctor_photo;
      filename = Date.now() + "_" + image.name;
      await image.mv("public/uploads/" + filename);
    }
    const sql = `
      INSERT INTO visitor_doctors
      (visitor_doctor_name, visitor_doctor_qual, visitor_doctor_photo, visitor_doctor_date, visitor_doctor_time)
      VALUES (?, ?, ?, ?, ?)
    `;
    await exe(sql, [
      d.visitor_doctor_name,
      d.visitor_doctor_qual,
      filename,
      d.visitor_doctor_date,
      d.visitor_doctor_time
    ]);
    res.redirect("/admin/visitor-doctors");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Error saving visitor doctor"
    });
  }
};

exports.getVisitorDoctorEdit = async (req, res) => {
  try {
    const id = req.params.id;
    const sql = "SELECT * FROM visitor_doctors WHERE visitor_doctor_id = ?";
    const result = await exe(sql, [id]);
    res.render("admin/visitor-doctors-edit", {
      visitorDoctor: result[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { 
      message: "Error editing visitor doctor"
    });
  }
};

exports.postVisitorDoctorUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const d = req.body;
    let sql, values;

    if (req.files && req.files.visitor_doctor_photo) {
      // New photo uploaded
      const image = req.files.visitor_doctor_photo;
      const filename = Date.now() + "_" + image.name;
      await image.mv("public/uploads/" + filename);

      sql = `
        UPDATE visitor_doctors
        SET visitor_doctor_name = ?, visitor_doctor_qual = ?, visitor_doctor_photo = ?, visitor_doctor_date = ?, visitor_doctor_time = ?
        WHERE visitor_doctor_id = ?
      `;
      values = [
        d.visitor_doctor_name,
        d.visitor_doctor_qual,
        filename,
        d.visitor_doctor_date,
        d.visitor_doctor_time,
        id
      ];
    } else {
      // No new photo, update other fields only
      sql = `
        UPDATE visitor_doctors
        SET visitor_doctor_name = ?, visitor_doctor_qual = ?, visitor_doctor_date = ?, visitor_doctor_time = ?
        WHERE visitor_doctor_id = ?
      `;
      values = [
        d.visitor_doctor_name,
        d.visitor_doctor_qual,
        d.visitor_doctor_date,
        d.visitor_doctor_time,
        id
      ];
    }

    await exe(sql, values);
    res.redirect("/admin/visitor-doctors");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Error updating visitor doctor"
    });
  }
};

exports.getVisitorDoctorDelete = async (req, res) => {
  try {
    const id = req.params.id;
    const sql = "DELETE FROM visitor_doctors WHERE visitor_doctor_id = ?";
    await exe(sql, [id]);
    res.redirect("/admin/visitor-doctors");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Error deleting visitor doctor"
    });
  }
};

exports.postAppointmentSave = async (req, res) => {
  try {
    const d = req.body;
    const sql = `
      INSERT INTO appointments
      (patient_fullname, patient_email, patient_mobile,
       patient_gender, patient_age, doctor_id,
       appointment_date)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    await exe(sql, [
      d.patient_fullname,
      d.patient_email,
      d.patient_mobile,
      d.patient_gender,
      d.patient_age,
      d.doctor_id || null,
      d.appointment_date,
    ]);

    res.redirect("/appointment");

  } catch (error) {
    console.error(error);
    res.status(500).send("Appointment Save Error");
  }
};

exports.getAppointmentsListPage = async (req, res) => {
  try {
    const sql = `
      SELECT a.*, d.doctor_name
      FROM appointments a
      LEFT JOIN doctors d ON a.doctor_id = d.doctor_id
      ORDER BY a.patient_id  DESC
    `;
    const appointments = await exe(sql);
    res.render("admin/appointments-list", { appointments });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Appointments List Page Error"
    });
  }
};