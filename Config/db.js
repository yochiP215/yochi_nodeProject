import { connect } from "mongoose";
export const connectToDb = async (req, res) => {
    try {
        let con = await connect(process.env.DB_URL)
        console.log("mongo atlas connected")
    }
    catch (err) {
        console.log("cannot connect mongo atlas", err)
        process.exit(1);
    }
}