const mongoose=require("mongoose");
const postScema=mongoose.Schema({
    title:String,
    body:String,
    device:String,
    userID:String
})

const PostModel=mongoose.model("post",postScema);
module.exports={PostModel}