import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './Database/dbconnection.js';
import authRouter from './rout/authUser.js';


const app=express();


dotenv.config();
dbConnect(); 
app.use(express.json());

app.use('/api/auth',authRouter)

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  return res.send("this is working");
});

app.listen(port, () => { 
  console.log("App is listening at port: " + port);
});