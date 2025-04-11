const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/", userController.protect, userController.getAllUser);

router.get("/me", (req, res) => {
  res.status(200).json({
    status: "success",
    user: req.user,
  });
});

module.exports = router;
