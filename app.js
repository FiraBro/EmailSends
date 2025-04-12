const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoute");
const emailRoutes = require("./routes/emailRoutes");
const courseRoutes = require("./routes/courseRouter");
mongoose.connect("mongodb://localhost:27017/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const app = express();
app.use(bodyParser.json());
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/emails", emailRoutes);
app.use("/api/v1/courses", courseRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
