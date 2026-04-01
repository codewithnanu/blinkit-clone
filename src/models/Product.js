const mongoose=require("mongoose")
const {Schema}=mongoose;
const productSchema=new Schema({
    name:{type:String,required:true},
    brand:{type:String,required:true},
    category:{type:String,required:true},
   price: { type: Number, required: true },
stock: { type: Number, required: true, default: 0 },

    description:{type:String},
},{timestamps:true})
const Product= mongoose.model("Product", productSchema)
module.exports=Product