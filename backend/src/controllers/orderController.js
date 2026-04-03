
const Order=require("../models/Order");

const Product = require("../models/Product")
const createOrder=async(req,res)=>{

    try{
       const {productId,Quantity,DeliveryAddress}=req.body;
       const contractorId=req.user.id;
      // check product exists
const product = await Product.findOneAndUpdate(
  { _id: productId, stock: { $gte: Quantity } },  // find product WITH enough stock
  { $inc: { stock: -Quantity } },                  // deduct stock
  { new: true }
)

if (!product) {
  return res.status(400).json({ error: "insufficient stock" })
}

       
       
    await Order.create({contractorId:contractorId,productId:productId,Quantity: Quantity,DeliveryAddress:DeliveryAddress})
     return res.status(201).json({ message: "order created successfully" })

    }
    catch(err){
return res.status(400).json({error:"something went wrong"})
    }
}
const getOrders=async(req,res)=>{
    
    try{
        const userorders=await Order.find({ contractorId: req.user.id}).populate("productId");
return res.status(200).json({userorders })

    }
    catch(err){
return res.status(400).json({error:"something went wrong"})
    }
}
const getOrderById=async(req,res)=>{
    const contractorId=req.user.id
    const orderId=req.params.id

      try{
        
  const userorder=await Order.findById(orderId).populate("productId");
      
        if (!userorder) {
  return res.status(404).json({ error: "order not found" })

}
  if (userorder.contractorId.toString() !== contractorId) {
  return res.status(403).json({ error: "unauthorized" })
        }
  else{
return res.status(200).json({userorder})
  }
}

  catch(err){
return res.status(400).json({error:"something went wrong"})
    }
}
const cancelOrderById=async(req,res)=>{
    const contractorId=req.user.id
    const orderId=req.params.id
            try{
                 const userorder=await Order.findById(orderId);
                    
        if (!userorder) {
  return res.status(404).json({ error: "order not found" })

}
if (userorder.contractorId.toString() !== contractorId) {
  return res.status(403).json({ error: "unauthorized" })
        }

if (userorder.Status === "out for delivery" || userorder.Status === "delivered") {
  return res.status(400).json({ error: "cannot cancel this order" })
}

  await userorder.updateOne(
     { $set: { Status:"cancelled"} }
  );
  return res.status(200).json({ message: "order cancelled successfully" })

            }
            catch(err){
              return res.status(400).json({error:"something went wrong"})  
            }

    

}
module.exports={createOrder,getOrders,getOrderById,cancelOrderById}