import{Schema,model}from "mongoose";
const UserSchema=Schema({
    email:String,
    userName:String,
    phone:String,
    password:String,
    role: { type: String, enum: ["user", "admin"], default: "user" },
    dateOfRegistration:{type:Date,default: new Date()}
})
export const userModel=model("User",UserSchema);