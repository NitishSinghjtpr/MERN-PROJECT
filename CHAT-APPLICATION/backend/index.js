import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './Database/dbconnection.js';
import authRouter from './rout/authUser.js';
import messageRouter from './rout/messageRout.js'
import cookieParser from 'cookie-parser';


const app=express();



dotenv.config();
dbConnect(); 
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRouter)
app.use('/api/message',messageRouter)

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  return res.send("this is working");
});

app.listen(port, () => { 
  console.log("App is listening at port: " + port);
});