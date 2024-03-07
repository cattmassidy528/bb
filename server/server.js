require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
// const bcryptjs = require("bcryptjs");
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const authRoutes = require("./routes/authRoutes");
const mainRoutes = require("./routes/mainRoutes");

mongoose
  .connect("mongodb://mongo:27017/bb-userdata", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });


app.use("/api/auth", authRoutes);
app.use("/api/auth/profile", mainRoutes);

app.get("/", (req, res) => {
  res.send({ message: "hello from express nightmare." });
});


app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', '../client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
