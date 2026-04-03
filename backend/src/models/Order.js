const mongoose=require("mongoose");

const {Schema}=mongoose;
const orderSchema=new Schema({
    contractorId: { type: Schema.Types.ObjectId, ref: "User" },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },

    Quantity:{type:Number,required:true},
    Status:{type:String,enum:['shipped','dispatched','out for delivery','delivered','pending','cancelled'],default:"pending"},
DeliveryAddress:{type:String,required:true},
DateDelivery:{type:Date}
    
},{timestamps:true})
const Order = mongoose.model("Order", orderSchema)

module.exports=Order