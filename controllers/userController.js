var exe = require("../model/conn.js");

exports.getHomePage = (req, res) => {
  try{
    res.render("user/home");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Home Page Error" });
  }
};

<<<<<<< Updated upstream

exports.getAboutPage = (req, res) => {
  try{
    res.render("user/about");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "About Page Error" });
  }
};

=======
exports.getTreatmentPage = (req,res) => {
  try{
    res.render("user/treatments");
  }catch (error) {
    console.error(error);
    res.status(500).render("error", {message: "Treatment Page Error"})
  }
}
>>>>>>> Stashed changes
