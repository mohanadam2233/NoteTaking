// const express= require('express');
import express from "express";
import noteRouter from './router/noteRouter.js';
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import rateLimiter from "./middleware/rateLimiter.js";
import path from "path";
dotenv.config();
// console.log(process.env.MONGO_URL);

const app=express();
const port = process.env.PORT || 500;
const __dirname= path.resolve()



//middleware to parse JSON
if(process.env.NODE_ENV !=="production"){
    app.use(cors(
    {
        origin: "http://localhost:5173",
    }
))
}
app.use(express.json());
app.use(rateLimiter);

//calling the noteRouter
app.use("/api/notes",noteRouter);

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../Frontend/dist")));
    app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend","dist","index.html"));
});
}
connectDB().then(() => { 
    app.listen(port,()=>{
    console.log("server is running at port:", port);
});

 });

