const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://msankitanair_db_user:T4ytpJLkYR0yb0cO@finalassessment.e7pvlyn.mongodb.net/?appName=FinalAssessment");
    console.log("Connected to DB");
  } catch (error) {
    console.error("DB connection failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
