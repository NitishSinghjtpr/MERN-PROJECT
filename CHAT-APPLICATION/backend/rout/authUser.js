
import express from 'express';
import { userRegister } from '../routControlers/userRoutControler.js';

const router=express.Router();

router.post('/register',userRegister);

export default router;