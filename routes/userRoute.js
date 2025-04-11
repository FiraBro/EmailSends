const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const protect = require("../middlewares/protect");

router.post("/register", userController.register);
router.post("/login", userController.login);

router.use(protect);

router.get("/me", (req, res) => {
  res.status(200).json({
    status: "success",
    user: req.user,
  });
});

module.exports = router;
