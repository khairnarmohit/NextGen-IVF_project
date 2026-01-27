var exe = require("../model/conn.js");


exports.getAdminDashboard = (req, res) => {
  try {
    res.render('admin/dashboard');
  } catch (error) {
    console.error(error);
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








