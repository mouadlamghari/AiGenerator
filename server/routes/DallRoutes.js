const express = require('express')
const Router = express.Router()
require('dotenv').config()
const Post = require('../model/Post.js')
const { OpenAI } = require('openai');


const OpenAi = new OpenAI({apiKey:process.env['API']})
Router.post('/',async(req,res)=>{
    try {
        const {prompt}=req.body
       const airesponse = await OpenAi.images.generate(
            {prompt,n:1,size:'1024x1024',response_format:'b64_json'}
          )      
          const image = await airesponse.data[0].b64_json
        res.json({image}) 
    } catch (error) {
        res.send({error:error})
    }
})

module.exports=Router