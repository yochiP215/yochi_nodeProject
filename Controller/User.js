import bcrypt from 'bcryptjs';
import { userModel } from "../Models/User.js";
import { generateToken } from '../Utils/jwt.js';



import { userValidationSchema } from "../Models/User.js";

export async function getAllUsers(req, res) {
    try {
        let result = await userModel.find().select("-password");
        res.json(result);
    } catch (err) {
        res.status(400).json({ title: "cannot get all users", message: err.message });
    }
}

export async function getUserById(req, res) {
    let { id } = req.params;
    try {
        let result = await userModel.findById(id).select("-password");
        if (!result)
            return res.status(400).json({ title: "cannot get user by id", message: "no user with such id" });
        res.json(result);
    } catch (err) {
        res.status(400).json({ title: "cannot get user by id", message: err.message });
    }
}




export async function addUser_singUp(req, res) {
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ title: "Invalid input", message: error.details[0].message });
    }

    try {
        const { userName, email, password, phone } = req.body;
        const alreadyUser = await userModel.findOne({ userName }).lean();
        if (alreadyUser) {
            return res.status(409).json({ title: "userName already exists", message: "change user name" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            userName,
            email,
            phone,
            password: hashedPassword,
            role: "user",
            dateOfRegistration: new Date(), 
        });

        await newUser.save();
        const { password: _, ...userDetails } = newUser.toObject();
        userDetails.token = generateToken(newUser);

        res.status(201).json(userDetails);
    } catch (err) {
        res.status(500).json({ title: "Cannot add user", message: err.message });
    }
}


export async function updateUser(req, res) {
    let { id } = req.params;
    let { password } = req.body;
    if (password)
        return res.status(404).json({ title: "cannot update password here", message: "password cannot be changed here" });

    try {
        let result = await userModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!result)
            return res.status(404).json({ title: "cannot update by id", message: "no user with such id" });
        res.json(result);
    } catch (err) {
        return res.status(400).json({ title: "cannot update user by id", message: err.message });
    }
}

export async function updateUserPassword(req, res) {
    let { id } = req.params;
    let { password } = req.body;
    if (!password)
        return res.status(404).json({ title: "cannot update", message: "password is required" });
    try {
        let result = await userModel.findByIdAndUpdate(id, { password }, { new: true });
        if (!result)
            return res.status(404).json({ title: "cannot update by id", message: "no user with such id" });
        res.json(result);
    } catch (err) {
        return res.status(400).json({ title: "cannot update user by id", message: err.message });
    }
}

export async function getUserNamePassword_login(req, res) {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            return res.status(400).json({ title: "missing data", message: "userName and password are required" });
        }

        let result = await userModel.findOne({ userName }).select("+password").lean(); // מבטיח שהסיסמה תישלף

        if (!result) {
            return res.status(404).json({ title: "cannot login", message: "no user with such userName" });
        }

        if (!result.password) {
            return res.status(500).json({ title: "server error", message: "password is missing from database" });
        }

        const isPasswordValid = await bcrypt.compare(password, result.password);
        if (!isPasswordValid) {
            return res.status(401).json({ title: "cannot login", message: "wrong password" });
        }

        let { password: _, ...userDetails } = result; // מוחק את הסיסמה מהתשובה
        userDetails.token = generateToken(result);

        res.json(userDetails);
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ title: "cannot get user with such details", message: err.message });
    }

}