require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
// const bcryptjs = require("bcryptjs");
const path = require('path')
const PORT = process.env.PORT || 80;

app.use(cors());
app.use(express.json());


const authRoutes = require("./routes/authRoutes");
const mainRoutes = require("./routes/mainRoutes");

const uri = "mongodb+srv://admin:123passwd321@bb-mongo-1.osmaqiw.mongodb.net/bb-mongo-1?retryWrites=true&w=majority&appName=bb-mongo-1"

mongoose
  .connect(uri, {
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

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
