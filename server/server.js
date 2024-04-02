const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require('path')
const PORT = process.env.PORT || 5000;

const authRoutes = require("./routes/authRoutes");
const mainRoutes = require("./routes/mainRoutes");

app.use(cors({ origin: "*" })); // Allow all origins (*) temporarily for testing purposes
const whitelist = ["http://localhost:3000", "https://bb-mattyc-a82e02218b07.herokuapp.com/"];

let corsOptions = {};
// if (process.env.NODE_ENV === "production") {
corsOptions = {
  origin: whitelist,
};
// } else {
// corsOptions = {
// origin: "*",
// };
// }

app.use(cors(corsOptions));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

// Serve static files from the React build directory

app.use("/api/auth", authRoutes);
app.use("/api/auth/profile", mainRoutes);

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, + '/../client/build/index.html'));
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
