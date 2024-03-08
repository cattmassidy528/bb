require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
// const bcryptjs = require("bcryptjs");
const { MongoClient, ServerApiVersion } = require('mongodb');
const path = require('path')
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const mainRoutes = require("./routes/mainRoutes");



const uri = "mongodb+srv://admin:123passwd321@bb-mongo-1.osmaqiw.mongodb.net/?retryWrites=true&w=majority&appName=bb-mongo-1";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


// const uri = process.env.MONGODB_URI

// mongoose
//   .connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((error) => {
//     console.error("Error connecting to MongoDB:", error);
//   });


app.use("/api/auth", authRoutes);
app.use("/api/auth/profile", mainRoutes);

app.get("/", (req, res) => {
  res.send({ message: "hello from express nightmare." });
});


app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
