const mongoose = require('mongoose')
const connect=mongoose.connectDb=async ()=>{
   await  mongoose.connect(process.env['DATA_BASE_URL'],
   {useUnifiedTopology:true,
    useNewUrlParser:true,
})
}

module.exports=connect