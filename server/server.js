require("dotenv").config();
const express = require("express");
const http = require('http');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length; // Get the number of CPU cores

const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require('path')
const PORT = process.env.PORT || 5000;

const authRoutes = require("./routes/authRoutes");
const mainRoutes = require("./routes/mainRoutes");

app.use(cors());
app.use(express.json());

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

// If the current process is the master process
if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers equal to the number of CPU cores
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  // Create an HTTP server
  const server = http.createServer(app);

  // Start listening on the specified port
  server.listen(PORT, () => {
    console.log(`Worker ${process.pid} is running on PORT ${PORT}`);
  });

  // Connect to MongoDB
  mongoose
    .connect(process.env.MONGODB_URI || '', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Worker", process.pid, "connected to MongoDB");
    })
    .catch((error) => {
      console.error("Worker", process.pid, "error connecting to MongoDB:", error);
    });

  // Register API routes
  app.use("/api/auth", authRoutes);
  app.use("/api/auth/profile", mainRoutes);

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Internal Server Error");
  });
}
