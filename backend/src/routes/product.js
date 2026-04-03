const express = require("express")
const router = express.Router()
const authMiddleware=require("../middleware/authMiddleware")
const requireSupplier=require("../middleware/roleMiddleware")
const { createProduct,getProducts,getProductById } = require("../controllers/productController")


router.post("/", authMiddleware, requireSupplier, createProduct)
router.get("/", getProducts)
router.get("/:id", getProductById)


module.exports=router;