const express=require("express");
require('dotenv').config();
const cors=require("cors")
const {UserRouter}=require("./route/users.route");
const  { PostRouter }=require("./route/posts.route")
const {connection}=require("./config/db")
const {authenticate}=require("./midileware/auth.midleware")
const app=express();
app.use(express.json())
app.use(cors({origin:"*"}))
app.use("/users",UserRouter)
app.use(authenticate)
app.use("/posts",PostRouter)

app.listen(process.env.port,async()=>{

    try {
        await connection;
        console.log("Database is connected")
    } catch (error) {
        console.log("Database is not connected");
        
    }
    console.log(`server is runnig over ${process.env.port}`);
})