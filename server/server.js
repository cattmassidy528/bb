require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require('path')
const PORT = process.env.PORT || 5000;

const authRoutes = require("./routes/authRoutes");
const mainRoutes = require("./routes/mainRoutes");
const API = process.env.NODE_ENV === 'production' ? 'https://bad-bank-matthew-cassidy-709735df14a5.herokuapp.com/' : 'http://localhost:5000/api';

app.use(cors());
app.use(express.json());


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

// const uri = "mongodb+srv://admin:123passwd321@bb-mongo-1.osmaqiw.mongodb.net/bb-mongo-1?retryWrites=true&w=majority&appName=bb-mongo-1"

mongoose
  .connect(process.env.MONGODB_URI, {
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



// app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});


app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});



