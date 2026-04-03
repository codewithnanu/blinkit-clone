require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const mongoose=require("mongoose");
const cors = require("cors")




const authRoutes=require("./src/routes/auth");
const orderRoutes=require("./src/routes/order");
const productRoutes=require("./src/routes/product")
const app = express();
app.use(express.json());
app.use(cors({
  origin: "*",
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}))

// Lazy DB connection: connect once and reuse across serverless invocations
let dbConnected = false;
app.use(async (req, res, next) => {
  if (!dbConnected) {
    await connectDB();
    dbConnected = true;
  }
  next();
});

app.get("/health", async (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? "ok" : "down"

  if (dbStatus === "down") {
    return res.status(503).json({ status: "unhealthy", db: "down" })
  }

  res.json({ status: "ok", db: "connected" })
})

app.use("/auth",authRoutes);
app.use("/orders", orderRoutes);
app.use("/products",productRoutes);

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: err.message });
});

module.exports=app