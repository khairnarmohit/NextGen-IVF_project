var exe = require("../model/conn.js");

exports.getHomePage = (req, res) => {
  try{
    res.render("user/home");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Home Page Error" });
  }
};
