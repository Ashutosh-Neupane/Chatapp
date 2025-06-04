import mongoose from "mongoose";
const UserSchema = mongoose.Schema({
    email:{type:String,required:true,unique:true},
    fullName:{type:String,required:true},
    password:{type:String,required:true,minlength:8},
    bio:{type:String,},
    profilePic:{type:String, default:""},
})
const User = mongoose.model ("User",UserSchema);
export default User