import { Router } from "express";
import {
    updateProduct, deleteProductById, addProduct, getProductById, getAllProducts
} from "../Controller/Product.js";
import { checkManager } from "../Middlewares/Check.js";


const router = Router();
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id",checkManager, updateProduct);
router.post("/",checkManager, addProduct);
router.delete("/:id",checkManager, deleteProductById);
export default router;