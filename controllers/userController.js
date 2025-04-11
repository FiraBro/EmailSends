const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, passwordConfirm, role } = req.body;

    if (!name || !email || !password || !passwordConfirm || !role) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide all required fields",
      });
    }
    if (password !== passwordConfirm) {
      return res.status(400).json({
        status: "fail",
        message: "Passwords do not match",
      });
    }
    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    if (!user) {
      return res.status(500).json({
        status: "fail",
        message: "Failed to create user",
      });
    }
    const token = jwt.sign({ id: user._id }, "your-secret-key");
    res.status(201).json({
      status: "success",
      token,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({
        status: "fail",
        message: "Please provide email and password",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "Incorrect email or password",
      });
    }
    if (password !== user.password) {
      return res.status(404).json({
        status: "fail",
        message: "Incorrect email or password",
      });
    }
    const token = jwt.sign({ id: user._id }, "your-secret-key");
    res.status(200).json({
      status: "success",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "You are not logged in. Please log in to get access.",
      });
    }
    const decoded = jwt.verify(token, "your-secret-key");
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: "fail",
        message: "The user belonging to this token no longer exists.",
      });
    }
    req.user = currentUser;
    next();
  } catch (error) {
    res.status(401).json({
      status: "fail",
      message: "Invalid token. Please log in again.",
    });
  }
};
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "fail",
        message: "You do not have permission to perform this action",
      });
    }
    next();
  };
};
exports.getAllUser = async (req, res, next) => {
  try {
    const user = await User.find();
    res.status(200).json({
      status: "success",
      data: {
        user: user,
      },
    });
  } catch (error) {}
};
