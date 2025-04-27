const express = require("express");
const {
  getAllUsers,
  registerController,
  loginController,
} = require("../controllers/userController");
const { protectRoute } = require("../middleware/auth.middleware");

//router object
const router = express.Router();

// GET ALL USERS
router.get("/all-users",protectRoute,  getAllUsers);

// CREATE USER 
router.post("/register", registerController);

//LOGIN 
router.post("/login", loginController);

module.exports = router;