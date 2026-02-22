import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './Database/dbconnection.js';
import User from './Models/userModel.js';

dotenv.config();
dbConnect(); 

const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  return res.send("this is working");
});

app.listen(port, () => { 
  console.log("App is listening at port: " + port);
});