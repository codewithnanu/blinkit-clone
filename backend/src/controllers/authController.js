const bcrypt=require("bcryptjs")

const User = require("../models/User")
const {generateToken}=require("../services/jwtService")

const register = async (req, res) => {
  try {
    const { name, phone, password, role } = req.body;

    // step 1: check duplicate phone
if(await User.findOne({phone:phone})){
   return  res.status(400).json({error:"invalid phone number"})
}
    // step 2: save user
const allowedRoles = ["CONTRACTOR", "SUPPLIER"]
const userRole = allowedRoles.includes(role) ? role : "CONTRACTOR"
await User.create({name: name, phone: phone, password: password, role: userRole});
return res.status(201).json({message:"user registered successfully"})
  } catch (err) {
   return res.status(500).json({ error: "Server error" })
  }
}
const login=async(req,res)=>{
try{
    const {phone,password}=req.body;
   const userphone= await User.findOne({phone:phone}).select("+password")

   if(!userphone){
    return res.status(400).json({message:"invalid credentials"})
   }
        const userpass=  await bcrypt.compare(password,userphone.password)
     



   if(!userpass){
    return res.status(400).json({message:"invalid credentials"})
   }
        
    // Step 3: Generate JWT using jwtService
    const token = generateToken({ id: userphone._id, role: userphone.role });



return res.status(200).json({message:"user logged in successfully",token})
     
    

}

catch(err){
    return res.status(400).json({ error: "invalid credentials" })
}
}

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) return res.status(404).json({ message: "User not found" })
    return res.status(200).json({ user })
  } catch (err) {
    return res.status(400).json({ message: "Something went wrong" })
  }
}

module.exports = { register, login, getMe }
