const express = require("express")
const router = express.Router()
const authMiddleware=require("../middleware/authMiddleware")
const {createOrder,getOrders,getOrderById,cancelOrderById}=require("../controllers/orderController")
router.post("/",authMiddleware,createOrder)
router.get("/",authMiddleware,getOrders)
router.get("/:id",authMiddleware,getOrderById)
router.patch("/:id/cancel",authMiddleware,cancelOrderById)


module.exports=router;