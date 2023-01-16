const mongoose=require("mongoose");

const userSchma=mongoose.Schema({
    name:String,
    email:String,
    gender:String,
    password:String
   
})

const UserModel=mongoose.model("user",userSchma);
module.exports={
    UserModel
}