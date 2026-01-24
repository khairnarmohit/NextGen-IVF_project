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




exports.getTreatmentPage = (req,res) => {
  try{
    res.render("user/treatments");
  }catch (error) {
    console.error(error);
    res.status(500).render("error", {message: "Treatment Page Error"})
  }
}

exports.getDoctorsPage = (req, res) => {
  try{
    res.render("user/doctors");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Doctors Page Error" });
  }
};

<<<<<<< Updated upstream
exports.getContactPage = (req, res) => {
  try{
    res.render("user/contact");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Contact Page Error" });
  }
};




=======
exports.getPatientStoriesPage = (req, res) => {
  try{
    res.render("user/patient_stories");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Patient Stories Page Error" });
  }
};
>>>>>>> Stashed changes
