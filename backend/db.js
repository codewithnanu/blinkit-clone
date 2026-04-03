const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("MongoDB connected")
  } catch (err) {
    console.error("Connection failed:", err.message)
    throw err
  }
}



module.exports = connectDB;
