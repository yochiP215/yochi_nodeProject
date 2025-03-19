import { Schema, model } from "mongoose";
import Joi from "joi";

const UserSchema = new Schema({
    email: { type: String, required: true },
    userName: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    dateOfRegistration: { type: Date, default: new Date() }
});

export const userModel = model("User", UserSchema);

export const userValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    userName: Joi.string().min(3).max(30).required(),
    phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("user", "admin"),
    dateOfRegistration: Joi.date()
});