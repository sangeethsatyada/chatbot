const { GoogleGenerativeAI } = require("@google/generative-ai");
const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const dotenv=require('dotenv').config();
app.use(bodyParser.urlencoded({extended:true}))
const cors=require('cors');
app.use(cors());
const API_KEY=process.env.API_KEY;
const PORT=process.env.PORT;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
app.use(bodyParser.json()); 
app.post('/',async (req,res)=>{
    const {prompt}=req.body;
    console.log(prompt);
    console.log('this is function')
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    res.send({response:result.response.text()})
})
app.listen(PORT,console.log('server running on port 5000'))
