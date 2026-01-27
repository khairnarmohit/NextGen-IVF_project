var exe = require("../model/conn.js");

exports.getAdminDashboard = (req, res) => {
  try {
    res.render("admin/dashboard");
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

exports.getGalleryPage = (req, res) => {
  try {
    res.render("admin/gallery");
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
