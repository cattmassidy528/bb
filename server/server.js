const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require('path')
const PORT = process.env.PORT || 5000;

const authRoutes = require("./routes/authRoutes");
const mainRoutes = require("./routes/mainRoutes");

// Use CORS middleware
const corsOptions = {
  origin: 'https://matt-cassidy-bad-bank-5cc76dcf76cf.herokuapp.com/',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Define API routes
app.use("/api/auth", authRoutes);
app.use("/api/auth/profile", mainRoutes);

// Serve the React app for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
