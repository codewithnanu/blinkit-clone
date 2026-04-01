const requireSupplier = (req, res, next) => {
  if (req.user.role !== "SUPPLIER") {
    return res.status(403).json({ error: "Access denied" })
  }
  next()
}
module.exports=requireSupplier