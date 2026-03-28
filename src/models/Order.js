const mongoose=require("mongoose");

const {Schema}=mongoose;
const orderSchema=new Schema({
    contractorId: { type: Schema.Types.ObjectId, ref: "User" },
    productName:{type:String,required:true},
    price:{type:Number},
    Brand:{type:String,required:true},
    Quantity:{type:Number,required:true},
    Status:{type:String,enum:['shipped','dispatched','out for delivery','delivered','pending'],default:"pending"},
DeliveryAddress:{type:String,required:true},
DateDelivery:{type:Date}
    
},{timestamps:true})
const Order = mongoose.model("Order", orderSchema)

module.exports=Order