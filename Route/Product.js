import { Router } from "express";
import {
    updateProduct, deleteProductById, addProduct, getProductById, getAllProducts
} from "../Controller/Product.js"
const router = Router();
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.post("/", addProduct);
router.delete("/:id", deleteProductById);
export default router;