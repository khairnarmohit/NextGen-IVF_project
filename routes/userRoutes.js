var express = require('express');
const router = express.Router();

var userController = require("../controllers/userController");

router.get("/", userController.getHomePage);

<<<<<<< Updated upstream
router.get("/about", userController.getAboutPage);


=======
router.get("/Treatments" , userController.getTreatmentPage)
>>>>>>> Stashed changes




module.exports = router;