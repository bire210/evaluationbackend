const express = require("express");
const { PostModel } = require("../model/model.posts")
const PostRouter = express.Router();

PostRouter.get("/", async (req, res) => {
     //veryfication need
     let query=req.query||undefined
     console.log(query);
     let devicename=query.device||undefined;
     let device1=req.query.device1||undefined;
     let device2=req.query.device2||undefined
     try {
           if(device1!=undefined&&device2!=undefined){
               const notes = await PostModel.find({$or:[{device:device1},{device:device2}]});
               res.json(notes)
           }
          else if(devicename){
               const notes = await PostModel.find({device:devicename});
          res.json(notes)
          } else if(devicename==undefined){
               const posts= await PostModel.find();
               res.json(posts)
          }
          
     } catch (error) {
          console.log(error)
          res.json("Somthing is wrong")
     }
})


PostRouter.post("/create", async (req, res) => {
     //veryfication need
     const post = req.body;
     try {
          const subpost = new PostModel(post);
          await subpost.save();
          res.json("Post is created")
     } catch (error) {
          console.log(error);
          res.json("something is wrong");
     }
})

PostRouter.patch("/update/:id", async (req, res) => {

     const post = await PostModel.findOne({ "_id": req.params.id });
     const userID_in_note = post.userID;
     const userID_Making_re = req.body.userID;
     try {
          if (userID_in_note != userID_Making_re) {
               res.json("You are note Authorise user")
          } else {
               await PostModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
               res.json("Updated");
          }

     } catch (error) {
          res.json("Something is wrong");
          console.log(error)
     }

})

PostRouter.delete("/delete/:id", async (req, res) => {
     const post = await PostModel.findOne({ "_id": req.params.id });
     const userID_in_note = post.userID;
     const userID_Making_re = req.body.userID;
     try {
          if (userID_in_note != userID_Making_re) {
               res.json("You are note Authorise user")
          } else {
               await PostModel.findByIdAndDelete({ _id: req.params.id });
               res.json("Deleted");
          }

     } catch (error) {
          res.json("Something is wrong");
          console.log(error)
     }


})


module.exports = { PostRouter }