import { userModel } from "../Models/User.js";
export async function getAllUsers(req, res) {
    try {
        let result = await userModel.find().select("-password");
        res.json(result);
    }
    catch (err) {
        res.status(400).json({ titel: "cannot get all users", message: err.message })
    }
}
export async function getUserById(req, res) {
    let { id } = req.params;
    try {
        let result = await userModel.findById(id).select("-password");
        if (!result)
            return res.status(400).json({ titel: "cannot get user by id", message: "no user with such id" });
        res.json(result);
    }
    catch (err) {
        res.status(400).json({ titel: "cannot get user by id", message: err.message })
    }
}
export async function addUser_singUp(req, res) {
    let { body } = req;
    if (!body.userName || !body.password || !body.phone || !body.email)
        return res.status(404).json({ titel: "missing data in body", message: "userName password email phone are required" });
    try {
        let alreadyUser = await userModel.findOne({ userName: body.userName });
        if (alreadyUser)
            return res.status(409).json({ titel: "userName already exist", message: "change user name" });
        let newU = new userModel(req.body);
        await newU.save();
        res.json(newU);
    }
    catch (err) {
        res.status(400).json({ titel: "cannot add user", message: err.message })
    }
}
export async function updateUser(req, res) {
    let { id } = req.params;
    let { password } = req.body;
    if (password)
        return res.status(404).json({ titel: "cannot update this details in body", message: "password cannot be changed here" });
    try {
        let result = await userModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!result)
            return res.status(404).json({ titel: "cannot update by id", message: "no user with such id" });
        res.json(result);
    }
    catch (err) {
        return res.status(400).json({ titel: "cannot update user by id", message: err.message });
    }
}
export async function updateUserPassword(req, res) {
    let { id } = req.params;
    let { password } = req.body;
    if (!password)
        return res.status(404).json({ titel: "cannot update", message: "password is required" });
    try {
        let result = await userModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!result)
            return res.status(404).json({ titel: "cannot update by id", message: "no user with such id" });
        res.json(result);
    }
    catch (err) {
        return res.status(400).json({ titel: "cannot update user by id", message: err.message });
    }
}
export async function getUserNamePassword_login(req, res) {
    let { userName,password } = req.body;
    if (!userName|| !password)
        return res.status(404).json({ titel: "missing data in body", message: "userName password are required" });
    try {
        let result = await userModel.findOne( { userName:userName });
        if (!result)
            return res.status(404).json({ titel: "cannot login", message: "no user with such userName" });
        if(result.password!=password)
            return res.status(404).json({ titel: "cannot login", message: "wrong password" });
        res.json(result);
    }
    catch (err) {
        return res.status(400).json({ titel: "cannot get user by these details", message: err.message });
    }
}



