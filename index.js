// import dotenv from "dotenv";
// dotenv.config();
console.log('--- In index.js ---');
console.log('The value of OPENAI_API_KEY is:', process.env.OPENAI_API_KEY);
console.log('-------------------');
import { connectToDb } from "./Config/db.js";
import UserRouter from "./Route/User.js";
import ProductRouter from "./Route/Product.js";
import OrderRouter from "./Route/Order.js";
import cors from "cors";
import express from "express";
import { logToFileMiddleware } from "./Middlewares/LogToFile.js"
import ragRoute from "./Route/Rag.js";
connectToDb();
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json())
app.use(logToFileMiddleware)
app.use("/api/Product", ProductRouter)
app.use("/api/User", UserRouter)
app.use("/api/Order", OrderRouter)
app.use("/api", ragRoute);
const port = process.env.PORT

app.listen(port, () => {
    console.log("app is listening on port " + port)
})