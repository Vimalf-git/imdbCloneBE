import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import route from './src/Router/index.js'

const app=express();
app.use(express.json())
app.use(cors());
app.use('/',route);  
dotenv.config()
const PORT=process.env.PORT;
app.listen(PORT,()=>console.log(PORT+" engine start"))