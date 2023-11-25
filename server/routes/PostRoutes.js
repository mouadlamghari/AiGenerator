const express = require('express')
const Post = require('../model/Post.js')
const {v2:cloudinary} = require('cloudinary')
const Router = express.Router()
require('dotenv').config()

cloudinary.config({ 
  cloud_name: 'doh9hxodu', 
  api_key: process.env['CLOUD_KEY'], 
  api_secret: process.env['CLOUD_SECRET'] 
});

Router.get('/',async(req,res)=>{
    try{
        const data = await Post.find().exec()
        res.json({data})
    }
    catch(error){
        res.status(404).json({error})
    }
})


Router.post('/',async(req,res,next)=>{

    try {
        const {photo}=req.body
        const saveImage =await cloudinary.uploader.upload(photo)
        req.photo= await saveImage.url
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:error})
    }
},async(req,res,next)=>{
    try {
        const {name,prompt}=req.body
        const newPost = await Post.create({
            name,
            prompt,
            photo:req.photo
        })
        res.status(201).json({success:true,data:newPost})

    } catch (error) {
        console.log(error,req.photo)
        res.status(500).json({success:false,message:error})
    }
    finally{
        next()
    }
    
})

module.exports=Router