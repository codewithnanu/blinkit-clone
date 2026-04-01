

const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const saltRounds = 10;

const {Schema}=mongoose;
const userSchema=new Schema({
    name:{type:String,required:true},
    
    phone:{type:String,required:true,unique:true},
    password:{type:String,required:true,select:false},
  role: { type: String, enum: ["CONTRACTOR", "SUPPLIER"], default: "CONTRACTOR" },

    companyName:{type:String,required:false},
 
  isActive: { type: Boolean, default: true }
},{   timestamps: true })
userSchema.pre('save', async function() {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  
});
const User = mongoose.model("User", userSchema)

module.exports=User