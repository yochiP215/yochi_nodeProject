import{Schema,model}from "mongoose";
const productSchema=Schema({
    prodName:String,
    description:String,
    dateOfCreation:{type:Date,default: new Date()},
    imageUrl: { type: String, required: true },
    price: Number,
    materials:[String],
    weight:Number,
    madeIn:String
})
export const ProductModel=model("Product",productSchema);