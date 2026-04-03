const express = require("express")
const router = express.Router()
const { register, login, getMe } = require("../controllers/authController")
const validateRegister = require("../middleware/validateRegsiter")
const authMiddleware = require("../middleware/authMiddleware")

router.post("/register", validateRegister, register)
router.post("/login", login)
router.get("/me", authMiddleware, getMe)

module.exports = router
