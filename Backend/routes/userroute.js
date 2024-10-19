const express = require('express')
const User=require('../models/usermodel')
const router=express.Router();

router.post('/register',async(req,res)=>{
    try{
        const {email,password}=req.body;
     const result= await User.create({
        email,
        password
    })
    res.status(201).json({
        message:"User Created"
    })
}
    catch{
        res.status(400).json({
            message:"Error"
        })
    }
    

})
router.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body
    const result=await User.findOne({email})
     if(!result){
        res.status(401).json({
            message:"User Don't  Exist"
        })
    }
    else if(result.password==password){

        res.status(200).json({
            message:"User Login",
            

        })
    }
    else{
        res.status(401).json({
            message:"Incorrect Password"
        })
    }
    }
    catch{
        res.status(400).json({
            message:"Error"
        })
    }
    

})




module.exports=router;