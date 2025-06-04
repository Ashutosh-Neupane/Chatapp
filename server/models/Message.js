import mongoose from "mongoose";
const MessageSchema = mongoose.Schema({
    message:{type:String},
    image:{type:String},
    sender:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    reciver:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    seen:{type:Boolean,default:false},
    

},{Timestamps:true}) 
const Message = mongoose.model("Message",MessageSchema)
export  default Message