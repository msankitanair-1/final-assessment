require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./connection");
const EmployeeModel = require("./model");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

connectDB();

// Test route
app.get("/", (req, res) => res.send("Backend is running"));

// Add employee
app.post("/employees", async (req, res) => {
  try {
    const { EmpName, designation, empId, img_url } = req.body;
    if (!EmpName || !designation || !empId) {
      return res.status(400).send({ message: "EmpName, designation, and empId are required" });
    }
    const exists = await EmployeeModel.findOne({ empId });
    if (exists) return res.status(400).send({ message: "Employee ID already exists" });

    const employee = new EmployeeModel({ EmpName, designation, empId, img_url });
    const result = await employee.save();
    res.status(201).send({ message: "Employee added", data: result });
  } catch (error) {
    console.error("Error adding employee:", error.message);
    res.status(500).send({ message: "Error adding employee" });
  }
});

// Get all employees
app.get("/employees", async (req, res) => {
  try {
    const employees = await EmployeeModel.find();
    res.status(200).send(employees);
  } catch (error) {
    console.error("Error fetching employees:", error.message);
    res.status(500).send({ message: "Error fetching employees" });
  }
});

// Update employee
app.put("/employees/:id", async (req, res) => {
  try {
    const empId = req.params.id;
    const { EmpName, designation, img_url } = req.body;
    const updated = await EmployeeModel.findOneAndUpdate(
      { empId },
      { EmpName, designation, img_url },
      { new: true }
    );
    if (!updated) return res.status(404).send({ message: "Employee not found" });
    res.send({ message: "Employee updated", data: updated });
  } catch (error) {
    console.error("Error updating employee:", error.message);
    res.status(500).send({ message: "Error updating employee" });
  }
});

// Delete employee
app.delete("/employees/:id", async (req, res) => {
  try {
    const empId = req.params.id;
    const deleted = await EmployeeModel.findOneAndDelete({ empId });
    if (!deleted) return res.status(404).send({ message: "Employee not found" });
    res.send({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error.message);
    res.status(500).send({ message: "Error deleting employee" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
