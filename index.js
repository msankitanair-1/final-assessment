require("dotenv").config();         // Load .env variables
const express = require("express");
const cors = require("cors");

const connectDB = require("./connection"); // MongoDB connection
const BlogModel = require("./model");      // Employee model

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// POST API to add an employee
app.post("/add", async (req, res) => {
  try {
    console.log(req.body);
    const result = await BlogModel(req.body).save();
    res.status(201).send({ message: "Employee added", data: result });
  } catch (error) {
    console.error("Error adding employee:", error.message);
    res.status(500).send({ message: "Error adding employee" });
  }
});

// GET API to test backend
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`${PORT} is up and running`);
});
