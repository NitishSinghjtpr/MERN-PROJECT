import express from 'express'
import isLogin from '../middleware/isLogin.js';
import { getUserBySearch } from './../routControlers/userHandler.js';

const router=express.Router();

router.get('/search',isLogin,getUserBySearch)

export default router;