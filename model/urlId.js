const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
{
    id:{
        type: String,
        required: true,
        unique:true,
    },
    dateCreated:{
        type: Date,
        default: Date.now,
    }
},{timestamps: true})

const UrlId= mongoose.model("UrlId",userSchema)

module.exports=UrlId;