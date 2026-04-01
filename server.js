require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const mongoose=require("mongoose");

const authRoutes=require("./src/routes/auth");
const orderRoutes=require("./src/routes/order");
const productRoutes=require("./src/routes/product")
const app = express();
app.use(express.json());




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


// Wait for DB before accepting ANY requests
const startServer = async () => {
  await connectDB()  // wait here until connected
  
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
  })
}

startServer()
