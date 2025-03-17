import { Schema, Types, model } from "mongoose";
const miniProducrSchema = Schema({
    prodName: String,
    price: Number,
    cnt: {
        type: Number,
        default: 1
    }
})
const orderSchema = Schema({
    date: { type: Date, default: new Date() },
    targetDate: { type: Date, default: new Date() },
    address: String,
    userId: { type: Types.ObjectId },
    products: [miniProducrSchema],
    isGoOut: { type: Boolean, default: false },
    priceOfSending: { type: Number, default: 40 },
    finalPrice: Number
})
export const orderModel = model("Order", orderSchema);