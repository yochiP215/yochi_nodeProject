import { Router } from "express";
import {
    updateOrder, getAllORdersBYUserId, deleteOrderById, addOrder, getAllOrders
} from "../Controller/Order.js"
const router = Router();
router.get("/", getAllOrders);
router.get("/:id", getAllORdersBYUserId);
router.delete("/:id",deleteOrderById)
router.put("/:id", updateOrder);
router.post("/", addOrder);
export default router;