const mongoose  = require('mongoose')

const PostModel = mongoose.Schema({
    name : {type:String,required:[true,'name is required']},
    prompt:{type:String,required:[true,'prompt required']},
    photo:{type:String,required:[true,'photo is required']}
})

module.exports=mongoose.model('Post',PostModel)