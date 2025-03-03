import { Router } from "express";
import {
    updateOrder, getAllORdersBYUserId, deleteOrderById, addOrder, getAllOrders
} from "../Controller/Order.js";
import { check } from "../Middlewares/Check.js";



const router = Router();
router.get("/", getAllOrders);
router.get("/:id", getAllORdersBYUserId);
router.delete("/:id",check,deleteOrderById);
router.put("/:id",check, updateOrder);
router.post("/",check, addOrder);
export default router;