import express from 'express';
import dotenv from 'dotenv'

dotenv.config();

const app=express();
const port=process.env.PORT;

app.get('/',(req,res)=>{
    return res.send("this is working")
})

app.listen(port,()=>{
    console.log("app is listing at port no: "+port);
    
})