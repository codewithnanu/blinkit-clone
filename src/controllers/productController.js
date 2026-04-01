const Product=require("../models/Product")
const createProduct=async(req,res)=>{
    try{
const {name,brand,category,price,stock}=req.body
const product=await Product.create({name:name,brand:brand,category:category,price:price,stock:stock})
if(product){
return res.status(201).json({message:"product was created successfully"})

}

    }
    catch(err){
return res.status(400).json({message:"something went wrong"})
    }
}
const getProducts=async(req,res)=>{
        try{
            const products=await Product.find();
    return res.status(200).json({products})
    
        }
        catch(err){
    return res.status(400).json({error:"something went wrong"})
        }
}
module.exports={createProduct,getProducts}