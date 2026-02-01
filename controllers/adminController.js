var exe = require("../model/conn.js");

var nodemailer = require("nodemailer");

exports.getLoginPage = (req, res) => {
  try {
    res.render("admin/login", { message: "" });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Login Page Error" });
  }
};

exports.postLogin = async (req, res) => {
  try {
    var { email, password } = req.body;
    var sql = "SELECT * FROM admin WHERE email = ?";
    var admin = await exe(sql, [email]);
    if (admin.length > 0) {
      if (admin[0].password == password) {
        req.session.admin = admin[0].email;
        res.redirect("/admin");
      } else {
        return res
          .status(401)
          .render("admin/login", { message: "Invalid Email or Password" });
      }
    } else {
      return res
        .status(401)
        .render("admin/login", { message: "Invalid Email or Password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Login Page Error" });
  }
};

exports.getAdminDashboard = async (req, res) => {
  try {
    var sql = "SELECT Count(*) AS total_appointments FROM appointments";
    var appointments = await exe(sql);

    var sql2 =
      "SELECT Count(*) As todays_appointments FROM appointments WHERE appointment_date = CURDATE()";
    var todays_appointments = await exe(sql2);

    var sql3 = `SELECT COUNT(*) AS pending_appointments FROM appointments WHERE appointment_date = CURDATE() AND status = 'pending'`;
    var pending_appointments = await exe(sql3);

    var sql4 = "SELECT Count(*) As patients_review FROM patients_review";
    var patient_reviews = await exe(sql4);

    var sql5 = "SELECT Count(*) as enquiry FROM enquiry";
    var enquiry = await exe(sql5);

    var packet = {
      appointments,
      todays_appointments,
      pending_appointments,
      patient_reviews,
      enquiry,
    };

    res.render("admin/dashboard", packet);
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
      res.status(400).render("error", { message: "Update About Us Page Error" });
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
      res.status(400).render("error", { message: "Update Philosophy Page Error" });
    } else {
      res.redirect("/admin/philosophy");
    }
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Update Philosophy Page Error" });
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
    res.status(500).render("error", { message: "Director's Message Page Error" });
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
      res.status(400).render("error", { message: "Failed to update Director's Message" });
    } else {
      res.redirect("/admin/directors-message");
    }
  } catch (error) {
    console.error("Update Director Message Error:", error);
    res.status(500).render("error", { message: "Failed to update Director's Message" });
  }
};

exports.getWhyChooseUsPage = async (req, res) => {
  try {
    var sql = "SELECT * FROM whychooseus WHERE whychooseus_status = 1";
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
      res.status(400).render("error", { message: "Failed to save Why Choose Us" });
    } else {
      res.redirect("/admin/why-choose-us");
    }
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Save Why Choose Us Page Error" });
  }
};

exports.getEditWhyChooseUsPage = async (req, res) => {
  try {
    var id = req.params.id;
    var sql = "SELECT * FROM whychooseus WHERE whychooseus_id = ? AND whychooseus_status = 1";
    var whychooseusone = await exe(sql, [id]);
    if (whychooseusone.length == 0) {
      res.status(404).render("error", { message: "Why Choose Us not found" });
      return;
    }
    var packet = { whychooseusone };
    res.render("admin/edit-why-choose-us", packet);
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Edit Why Choose Us Page Error" });
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
      res.status(400).render("error", { message: "Failed to update Why Choose Us" });
    } else {
      res.redirect("/admin/why-choose-us");
    }
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Update Why Choose Us Page Error" });
  }
};

exports.getDeleteWhyChooseUs = async (req, res) => {
  try {
    var id = req.params.id;
    var sql = "UPDATE whychooseus SET whychooseus_status = 0 WHERE whychooseus_id = ?";
    var result = await exe(sql, [id]);
    if (result.affectedRows == 0) {
      res.status(400).render("error", { message: "Failed to delete Why Choose Us" });
    } else {
      res.redirect("/admin/why-choose-us");
    }
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Delete Why Choose Us Page Error" });
  }
};

exports.getAchievementsPage = async (req, res) => {
  try {
    var sql = "SELECT * FROM achievements WHERE achievement_status = 1";
    var achievements_info = await exe(sql);

    var sql2 = "SELECT * FROM awards WHERE award_status = 1";
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
    var sql = "SELECT * FROM achievements WHERE achievement_id = ? AND achievement_status = 1";
    var achievementone = await exe(sql, [id]);
    var packet = { achievementone };
    res.render("admin/edit-milestones", packet);
  } catch (error) {
    if (achievementone.length == 0) {
      res.status(404).render("error", { message: "Milestone not found" });
      return;
    }
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
      res.status(400).render("error", { message: "Failed to update Milestones" });
    } else {
      res.redirect("/admin/achievements");
    }
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Update Milestones Page Error" });
  }
};

exports.getDeleteMilestones = async (req, res) => {
  try {
    var id = req.params.id;
    var sql = "UPDATE achievements SET achievement_status = 0 WHERE achievement_id = ?";
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
    res.status(500).render("error", { message: "Delete Milestones Page Error" }); 
  }
};

exports.postSaveAwards = async (req, res) => {
  try {
    var data = req.body;

    // image upload
    let filename = "";

    if (req.files && req.files.award_img) {
      const image = req.files.award_img;
      filename = Date.now() + "_" + image.name;
      await image.mv("public/uploads/" + filename);
    }
    var sql =
      "INSERT INTO awards (award_title, award_desc, award_img, award_issue, award_year, award_icon) VALUES (?, ?, ?, ?, ?, ?)";

    await exe(sql, [
      data.award_title,
      data.award_desc,
      filename,
      data.award_issue,
      data.award_year,
      data.award_icon,
    ]);
    var sql =
      "INSERT INTO awards (award_title, award_desc,award_img, award_issue, award_year, award_icon) VALUES (?, ?, ?, ?, ?)";
    var result = await exe(sql, [
      data.award_title,
      data.award_desc,
      data.award_issue,
      data.award_year,
      data.award_icon,
      filename,
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
    var sql = "SELECT * FROM awards WHERE award_id = ? AND award_status = 1";
    var awardone = await exe(sql, [id]);
    var packet = { awardone };
    res.render("admin/edit-awards", packet);
  } catch (error) {
    if (awardone.length == 0) {
      res.status(404).render("error", { message: "Award not found" });
      return;
    }
    console.error(error);
    res.status(500).render("error", { message: "Edit Awards Page Error" });
  }
};

exports.postUpdateAwards = async (req, res) => {
  try {
    var data = req.body;
    let filename = data.old_img;

    if (req.files && req.files.award_img) {
      filename = Date.now() + "-" + req.files.award_img.name;
      await req.files.award_img.mv("public/uploads/" + filename);
    }

    var sql = `
      UPDATE awards SET
        award_title = ?,
        award_img = ?,
        award_desc = ?,
        award_issue = ?,
        award_year = ?,
        award_icon = ?
      WHERE award_id = ?
    `;

    await exe(sql, [
      data.award_title,
      filename,
      data.award_desc,
      data.award_issue,
      data.award_year,
      data.award_icon,
      data.award_id,
    ]);

    res.redirect("/admin/achievements");
  } catch (err) {
    console.log(err);
  }
};

exports.getDeleteAwards = async (req, res) => {
  try {
    var id = req.params.id;
    var sql = "UPDATE awards SET award_status = 0 WHERE award_id = ?";
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
    var sql = "SELECT * FROM gallery";
    var gallery = await exe(sql);
    var packet = { gallery };
    res.render("admin/gallery", packet);
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
      2,
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

exports.getPatientReviewPage = async (req, res) => {
  try {
    var data = await exe(
      `SELECT * FROM patients_review ORDER BY patients_review_id DESC`
    );

    var editData = null;
    if (req.query.edit) {
      var editResult = await exe(
        `SELECT * FROM patients_review WHERE patients_review_id='${req.query.edit}'`
      );
      if (editResult.length > 0) {
        editData = editResult[0];
      }
    }

    res.render("admin/patient-review", { list: data, editData: editData });
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
      var editResult = await exe(
        `SELECT * FROM privacy WHERE privacy_id='${req.query.edit}'`
      );
      if (editResult.length > 0) {
        editData = editResult[0];
      }
    }
    res.render("admin/privacy", { list: data, editData: editData });
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

exports.getGalleryPage = async (req, res) => {
  try {
    var sql = `SELECT * FROM gallery`;
    var gallery = await exe(sql);
    var packet = { gallery };
    res.render("admin/gallery", packet);
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Gallery Page Error" });
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
    const sqlDel = "DELETE FROM gallery WHERE image_id = ?";
    await exe(sqlDel, [image_id]);
    res.redirect("/admin/gallery");
  } catch (err) {
    console.error(err);
    res.status(500).send("Delete failed");
  }
};

exports.getEnquiryPage = async (req, res) => {
  try {
    var sql = `SELECT * FROM enquiry`;
    var enquiry = await exe(sql);
    var packet = { enquiry };
    res.render("admin/enquiry", packet);
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Enquiry Page Error" });
  }
};

exports.getDeleteEnquiry = async (req, res) => {
  try {
    const enquiry_id = req.params.enquiry_id; // 🔥 इथे घ्या
    const sql = "DELETE FROM enquiry WHERE enquiry_id = ?";
    await exe(sql, [enquiry_id]);
    res.redirect("/admin/enquiry");
  } catch (error) {
    console.error(error);
    res.status(500).send("Enquiry delete failed");
  }
};

// faq

exports.getFaqPage = async (req, res) => {
  try {
    const sqlTypes =
      "SELECT faq_type_id, faq_service FROM faq_type ORDER BY faq_service ASC";
    const faqTypes = await exe(sqlTypes);

    const sqlFaqs = `
      SELECT 
        f.faq_id,
        f.faq_title,
        f.faq_desc,
        t.faq_service
      FROM faq f
      LEFT JOIN faq_type t ON f.faq_type_id = t.faq_type_id
      ORDER BY f.faq_id DESC
    `;
    const faqs = await exe(sqlFaqs);

    res.render("admin/faq", { faqTypes, faqs });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading FAQ page");
  }
};

exports.saveFaqType = async (req, res) => {
  try {
    const d = req.body;
    const sql = `INSERT INTO  faq_type (faq_service) VALUES ('${d.faq_service}')`;
    await exe(sql);
    res.redirect("/admin/faq");
  } catch (error) {
    console.error(error);
    res.send("Error saving FAQ Type");
  }
};

exports.saveFaq = async (req, res) => {
  try {
    const d = req.body;
    const sql = `INSERT INTO faq (faq_type_id, faq_title, faq_desc)VALUES ('${d.faq_type_id}', '${d.faq_title}', '${d.faq_desc}')`;
    await exe(sql);
    res.redirect("/admin/faq");
  } catch (error) {
    console.error(error);
    res.send("Error saving FAQ");
  }
};

// Show Edit FAQ Form
exports.editFaqForm = async (req, res) => {
  try {
    const faq_id = req.params.faq_id;
    const faqResult = await exe("SELECT * FROM faq WHERE faq_id = ?", [faq_id]);
    if (faqResult.length === 0) {
      return res.send("FAQ not found");
    }
    const faq = faqResult[0];
    const faqTypes = await exe(
      "SELECT * FROM faq_type ORDER BY faq_service ASC"
    );
    res.render("admin/edit_faq", { faq, faqTypes });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading FAQ for edit");
  }
};
// Update FAQ
exports.updateFaq = async (req, res) => {
  try {
    const faq_id = req.params.faq_id;
    const { faq_type_id, faq_title, faq_desc } = req.body;
    await exe(
      "UPDATE faq SET faq_type_id = ?, faq_title = ?, faq_desc = ? WHERE faq_id = ?",
      [faq_type_id, faq_title, faq_desc, faq_id]
    );
    res.redirect("/admin/faq");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating FAQ");
  }
};

// Delete FAQ
exports.deleteFaq = async (req, res) => {
  try {
    const faq_id = req.params.faq_id;
    const sql = `DELETE FROM faq WHERE faq_id = '${faq_id}'`;
    await exe(sql);
    res.redirect("/admin/faq");
  } catch (error) {
    console.error(error);
    res.send("Error deleting FAQ");
  }
};

exports.getTreatmentPage = (req, res) => {
  try {
    var sql = "SELECT * FROM treatments ORDER BY treatment_id DESC";
    exe(sql, [], (err, result) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .render("error", { message: "Error fetching treatments" });
      } else {
        res.render("admin/treatment", { treatments: result });
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
      treatment: result[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Error editing treatment",
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
      id,
    ]);

    res.redirect("/admin/treatment");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Error updating treatment",
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
      message: "Error deleting treatment",
    });
  }
};

exports.getDoctorsPage = async (req, res) => {
  try {
    const sql = "SELECT * FROM doctors WHERE doctor_status=1 ORDER BY doctor_id DESC";
    const doctors = await exe(sql);
    res.render("admin/doctors", { doctors });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Doctors Page Error",
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
      d.doctor_exp,
    ]);
    res.redirect("/admin/doctors");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Error saving doctor",
    });
  }
};

exports.getDoctorEdit = async (req, res) => {
  try {
    const id = req.params.id;
    const sql = "SELECT * FROM doctors WHERE doctor_id = ?";
    const result = await exe(sql, [id]);
    res.render("admin/doctor_edit", {
      doctor: result[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Error editing doctor",
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
      id,
    ]);
    res.redirect("/admin/doctors");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Error updating doctor",
    });
  }
};

exports.getDoctorDelete = async (req, res) => {
  try {
    const id = req.params.id;
    const sql = "UPDATE doctors SET doctor_status = 0 WHERE doctor_id = ?";
    // const sql = "DELETE FROM doctors WHERE doctor_id = ?";
    await exe(sql, [id]);
    res.redirect("/admin/doctors");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Error deleting doctor",
    });
  }
};

exports.getHeroPage = async (req, res) => {
  try {
    var sql = "SELECT * FROM hero WHERE hero_id = 1";
    var hero_info = await exe(sql);

    if (hero_info.length == 0) {
      hero_info = [{ hero_heading: "", hero_background: "" }];
    } else {
      hero_info = hero_info[0];
    }

    var packet = { hero_info };
    res.render("admin/hero", packet);
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Hero Section Error" });
  }
};

exports.postUpdateHero = async (req, res) => {
  try {
    var data = req.body;
    var old_video = data.old_hero_background;
    var filename = old_video;

    if (req.files && req.files.hero_background) {
      filename = Date.now() + "_" + req.files.hero_background.name;
      await req.files.hero_background.mv("public/uploads/" + filename);
    }

    var checkSql = "SELECT * FROM hero WHERE hero_id = 1";
    var checkResult = await exe(checkSql);

    if (checkResult.length > 0) {
      var sql =
        "UPDATE hero SET hero_heading = ?, hero_background = ? WHERE hero_id = 1";
      await exe(sql, [data.hero_heading, filename]);
    } else {
      var sql =
        "INSERT INTO hero (hero_heading, hero_background) VALUES (?, ?)";
      await exe(sql, [data.hero_heading, filename]);
    }

    res.redirect("/admin/hero");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Update Hero Section Error" });
  }
};

exports.getVisitorDoctorsPage = async (req, res) => {
  try {
    const sql =
      "SELECT * FROM visitor_doctors WHERE visitor_doctor_status = 1  ORDER BY visitor_doctor_id  DESC";
    const visitorDoctors = await exe(sql);
    res.render("admin/visitor-doctors", { visitorDoctors });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Doctors Page Error",
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
      d.visitor_doctor_time,
    ]);
    res.redirect("/admin/visitor-doctors");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Error saving visitor doctor",
    });
  }
};

exports.getVisitorDoctorEdit = async (req, res) => {
  try {
    const id = req.params.id;
    const sql = "SELECT * FROM visitor_doctors WHERE visitor_doctor_id = ?";
    const result = await exe(sql, [id]);
    res.render("admin/visitor-doctors-edit", {
      visitorDoctor: result[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Error editing visitor doctor",
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
        id,
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
        id,
      ];
    }

    await exe(sql, values);
    res.redirect("/admin/visitor-doctors");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Error updating visitor doctor",
    });
  }
};

exports.getVisitorDoctorDelete = async (req, res) => {
  try {
    const id = req.params.id;
    const sql = "UPDATE visitor_doctors SET visitor_doctor_status = 0 WHERE visitor_doctor_id = ?";
    // const sql = "DELETE FROM visitor_doctors WHERE visitor_doctor_id = ?";
    await exe(sql, [id]);
    res.redirect("/admin/visitor-doctors");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Error deleting visitor doctor",
    });
  }
};

exports.getAppointmentsListPage = async (req, res) => {
  try {
    const date = req.query.date;
    const doctor = req.query.doctor;

    // ----------- APPOINTMENT LIST -----------
    let sql = `
      SELECT 
        a.*,
        CASE
          WHEN a.doctor_id IS NOT NULL THEN d.doctor_name
          WHEN a.visitor_doctor_id IS NOT NULL THEN vd.visitor_doctor_name
          ELSE 'N/A'
        END AS doctor_name
      FROM appointments a
      LEFT JOIN doctors d ON a.doctor_id = d.doctor_id
      LEFT JOIN visitor_doctors vd ON a.visitor_doctor_id = vd.visitor_doctor_id
      WHERE a.status = 'pending'
    `;

    let params = [];

    if (date) {
      sql += ` AND DATE(a.appointment_date) = ? `;
      params.push(date);
    }

    sql += ` ORDER BY a.patient_id ASC `;
    const appointments = await exe(sql, params);

    // ----------- DOCTOR SUMMARY -----------
    let summarySql = `
      SELECT 
        CASE
          WHEN a.doctor_id IS NOT NULL THEN d.doctor_name
          WHEN a.visitor_doctor_id IS NOT NULL THEN vd.visitor_doctor_name
          ELSE 'N/A'
        END AS doctor_name,
        COUNT(*) AS total
      FROM appointments a
      LEFT JOIN doctors d ON a.doctor_id = d.doctor_id
      LEFT JOIN visitor_doctors vd ON a.visitor_doctor_id = vd.visitor_doctor_id
      WHERE a.status = 'pending'
    `;

    let summaryParams = [];

    if (date) {
      summarySql += ` AND DATE(a.appointment_date) = ? `;
      summaryParams.push(date);
    }

    summarySql += ` GROUP BY doctor_name `;
    const doctorSummary = await exe(summarySql, summaryParams);

    // ----------- RENDER -----------
    res.render("admin/appointments-list", {
      appointments,
      doctorSummary,
      selectedDate: date,
      selectedDoctor: doctor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Appointments List Page Error",
    });
  }
};

exports.getTermsPage = async (req, res) => {
  try {
    var data = await exe(`SELECT * FROM terms ORDER BY term_id DESC`);

    var editData = null;
    if (req.query.edit) {
      var editResult = await exe(
        `SELECT * FROM terms WHERE term_id='${req.query.edit}'`
      );
      if (editResult.length > 0) {
        editData = editResult[0];
      }
    }

    res.render("admin/terms", { list: data, editData: editData });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Terms Page Error" });
  }
};

exports.saveTerm = async (req, res) => {
  try {
    var d = req.body;

    var sql = `INSERT INTO terms (term_title, term_desc, term_status) VALUES ('${d.term_title}', '${d.term_desc}', 1)`;

    await exe(sql);
    res.redirect("/admin/terms");
  } catch (error) {
    console.log(error);
    res.send("Error saving term");
  }
};

exports.updateTerm = async (req, res) => {
  try {
    var d = req.body;
    var sql = `UPDATE terms SET 
              term_title='${d.term_title}',
              term_desc='${d.term_desc}'
              WHERE term_id='${d.term_id}'`;
    await exe(sql);
    res.redirect("/admin/terms");
  } catch (error) {
    console.log(error);
    res.send("Error updating term");
  }
};

exports.deleteTerm = async (req, res) => {
  try {
    var id = req.params.id;
    var sql = "UPDATE terms SET term_status=0 WHERE term_id=?";
    await exe(sql, [id]);
    res.redirect("/admin/terms");
  } catch (error) {
    console.log(error);
    res.send("Error deleting term");
  }
};

exports.getCancelAppointment = async (req, res) => {
  try {
    const id = req.params.id;
    const sql =
      "UPDATE appointments SET status = 'cancelled' WHERE patient_id = ?";
    await exe(sql, [id]);
    res.redirect("/admin/appointments-list");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Error cancelling appointment",
    });
  }
};

exports.getCompleteAppointment = async (req, res) => {
  try {
    const id = req.params.id;
    const sql =
      "UPDATE appointments SET status = 'completed' WHERE patient_id = ?";
    await exe(sql, [id]);
    res.redirect("/admin/appointments-list");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Error completing appointment",
    });
  }
};

exports.getCompletedAppointmentsPage = async (req, res) => {
  try {
    const date = req.query.date;
    const doctor = req.query.doctor;

    // ----------- APPOINTMENT LIST -----------
    let sql = `
      SELECT 
        a.*,
        CASE
          WHEN a.doctor_id IS NOT NULL THEN d.doctor_name
          WHEN a.visitor_doctor_id IS NOT NULL THEN vd.visitor_doctor_name
          ELSE 'N/A'
        END AS doctor_name
      FROM appointments a
      LEFT JOIN doctors d ON a.doctor_id = d.doctor_id
      LEFT JOIN visitor_doctors vd ON a.visitor_doctor_id = vd.visitor_doctor_id
      WHERE a.status = 'completed'
    `;

    let params = [];

    if (date) {
      sql += ` AND DATE(a.appointment_date) = ? `;
      params.push(date);
    }

    sql += ` ORDER BY a.patient_id ASC `;
    const appointments = await exe(sql, params);

    // ----------- DOCTOR SUMMARY -----------
    let summarySql = `
      SELECT 
        CASE
          WHEN a.doctor_id IS NOT NULL THEN d.doctor_name
          WHEN a.visitor_doctor_id IS NOT NULL THEN vd.visitor_doctor_name
          ELSE 'N/A'
        END AS doctor_name,
        COUNT(*) AS total
      FROM appointments a
      LEFT JOIN doctors d ON a.doctor_id = d.doctor_id
      LEFT JOIN visitor_doctors vd ON a.visitor_doctor_id = vd.visitor_doctor_id
      WHERE a.status = 'completed'
    `;

    let summaryParams = [];

    if (date) {
      summarySql += ` AND DATE(a.appointment_date) = ? `;
      summaryParams.push(date);
    }

    summarySql += ` GROUP BY doctor_name `;
    const doctorSummary = await exe(summarySql, summaryParams);

    // ----------- RENDER -----------
    res.render("admin/appointments-completed", {
      appointments,
      doctorSummary,
      selectedDate: date,
      selectedDoctor: doctor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Appointments List Page Error",
    });
  }
};

// exports.getCancelledAppointmentsPage = async (req, res) => {
//   try {
//     const sql = `

exports.getCancelledAppointmentsPage = async (req, res) => {
  try {
    const date = req.query.date;
    const doctor = req.query.doctor;

    // ----------- APPOINTMENT LIST -----------
    let sql = `
      SELECT 
        a.*,
        CASE
          WHEN a.doctor_id IS NOT NULL THEN d.doctor_name
          WHEN a.visitor_doctor_id IS NOT NULL THEN vd.visitor_doctor_name
          ELSE 'N/A'
        END AS doctor_name
      FROM appointments a
      LEFT JOIN doctors d ON a.doctor_id = d.doctor_id
      LEFT JOIN visitor_doctors vd ON a.visitor_doctor_id = vd.visitor_doctor_id
      WHERE a.status = 'cancelled'
    `;

    let params = [];

    if (date) {
      sql += ` AND DATE(a.appointment_date) = ? `;
      params.push(date);
    }

    sql += ` ORDER BY a.patient_id ASC `;
    const appointments = await exe(sql, params);

    // ----------- DOCTOR SUMMARY -----------
    let summarySql = `
      SELECT 
        CASE
          WHEN a.doctor_id IS NOT NULL THEN d.doctor_name
          WHEN a.visitor_doctor_id IS NOT NULL THEN vd.visitor_doctor_name
          ELSE 'N/A'
        END AS doctor_name,
        COUNT(*) AS total
      FROM appointments a
      LEFT JOIN doctors d ON a.doctor_id = d.doctor_id
      LEFT JOIN visitor_doctors vd ON a.visitor_doctor_id = vd.visitor_doctor_id
      WHERE a.status = 'cancelled'
    `;

    let summaryParams = [];

    if (date) {
      summarySql += ` AND DATE(a.appointment_date) = ? `;
      summaryParams.push(date);
    }

    summarySql += ` GROUP BY doctor_name `;
    const doctorSummary = await exe(summarySql, summaryParams);

    // ----------- RENDER -----------
    res.render("admin/appointments-cancelled", {
      appointments,
      doctorSummary,
      selectedDate: date,
      selectedDoctor: doctor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Appointments List Page Error",
    });
  }
};

// exports.getAppointmentPage = async (req, res) => {
//   try {
//     res.render("admin/appointment-add");
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

    res.render("admin/appointment-add", {
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

exports.postAppointmentSave = async (req, res) => {
  try {
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

    res.redirect("/admin/appointments-list");
  } catch (error) {
    console.error(error);
    res.status(500).send("Appointment insert error");
  }
};

exports.getForgotPasswordPage = async (req, res) => {
  try {
    res.render("admin/forgot-password", { message: "" });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Forgot Password Page Error",
    });
  }
};

exports.postSendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const sql = "SELECT * FROM admin WHERE email = ?";
    const admin = await exe(sql, [email]);

    if (admin.length === 0) {
      return res.status(404).render("admin/forgot-password", {
        message: "Email not found",
      });
    }

    // Generate OTP 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    req.session.otpData = {
      email,
      otp,
      expiry: Date.now() + 5 * 60 * 1000, // 5 minutes
    };

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "magarlalitnandkumar@gmail.com",
        pass: "srkx knhn nzvb kidr",
      },
    });

    let info = await transporter.sendMail({
      from: "NextGen IVF <magarlalitnandkumar@gmail.com>",
      to: email,
      subject: "Your OTP for NextGen IVF Center",
      html: `
    <div style="font-family: Arial, sans-serif;">
      <h3>NextGen IVF Center</h3>

      <p>Your One-Time Password (OTP):</p>

      <p style="font-size:18px; font-weight:bold; letter-spacing:2px;">
        ${otp}
      </p>

      <p>This OTP is valid for 5 minutes.</p>

      <p style="font-size:12px; color:#777;">
        If you did not request this, please ignore this email.
      </p>
    </div>
  `,
    });

    res.redirect("/admin/verify-otp");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "OTP Send Error" });
  }
};

exports.getVerifyOtpPage = async (req, res) => {
  try {
    res.render("admin/verify-otp", { message: "" });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Verify OTP Page Error",
    });
  }
};

exports.postVerifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;

    if (!req.session.otpData) {
      return res.render("admin/verify-otp", {
        message: " Please request OTP again.",
      });
    }

    const { email, expiry, otp: sessionOtp } = req.session.otpData;

    if (expiry < Date.now()) {
      delete req.session.otpData;
      return res.status(400).render("admin/verify-otp", {
        message: "OTP is expired.",
      });
    }

    if (String(sessionOtp).trim() !== String(otp).trim()) {
      return res.render("admin/verify-otp", {
        message: "Invalid OTP",
      });
    }

    req.session.resetEmail = email;

    delete req.session.otpData;
    res.redirect("/admin/change-password");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Verify OTP Error" });
  }
};

exports.getChangePasswordPage = async (req, res) => {
  try {
    if (!req.session.resetEmail) {
      return res.redirect("/admin/forgot-password");
    }
    res.render("admin/change-password");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Change Password Page Error",
    });
  }
};

exports.postResetPassword = async (req, res) => {
  try {
    if (!req.session.resetEmail) {
      return res.redirect("/admin/forgot-password");
    }
    const { new_password } = req.body;
    const email = req.session.resetEmail;

    const sql = "UPDATE admin SET password = ? WHERE email = ?";
    await exe(sql, [new_password, email]);

    delete req.session.resetEmail;
    res.redirect("/admin/login");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Reset Password Error" });
  }
};
