
const mongoose = require("mongoose"); 

// Define the schema
const schema = new mongoose.Schema({
  EmpName: { type: String, required: true },
  designation: { type: String, required: true },
  empId: { type: String, required: true },
  img_url: { type: String },
});

// Create the model
const BlogModel = mongoose.model("Employee", schema);

module.exports = BlogModel;
