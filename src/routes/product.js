const express = require("express")
const router = express.Router()
const authMiddleware=require("../middleware/authMiddleware")
const requireSupplier=require("../middleware/roleMiddleware")
const { createProduct,getProducts } = require("../controllers/productController")


router.post("/", authMiddleware, requireSupplier, createProduct)
router.get("/", getProducts)


module.exports=router;