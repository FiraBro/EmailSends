const app = require("./app");
const mongoose = require("mongoose");
const port = 6000;

mongoose
  .connect("mongodb://localhost:27017/pree")
  .then((con) => {
    console.log("DB connected successfully");
    app.listen(port, () => {
      console.log(`Server is started on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if there's an error
  });
