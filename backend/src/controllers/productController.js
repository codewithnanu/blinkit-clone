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
         
    const { category, name } = req.query
const filter = {}

if (category) filter.category = category
if (name) filter.name = name

const products = await Product.find(filter)
return res.status(200).json({ products })

        }
        catch(err){
    return res.status(400).json({error:"something went wrong"})
        }
}

const getProductById=async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id)
        if(!product) return res.status(404).json({message:"Product not found"})
        return res.status(200).json({product})
    }
    catch(err){
        return res.status(400).json({message:"something went wrong"})
    }
}

module.exports={createProduct,getProducts,getProductById}