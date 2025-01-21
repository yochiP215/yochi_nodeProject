import { ProductModel } from "../Models/Product.js";
export async function getAllProducts(req, res) {
    try {
        let result = await ProductModel.find();
        res.json(result);
    }
    catch (err) {
        res.status(400).json({ title: "can not found all products", message: err.message })
    }
}
export async function getProductById(req, res) {
    let { id } = req.params;
    try {
        let result = await ProductModel.findById(id);
        if (!result)
            return res.status(400).json({ title: "cannot get by id", message: "no product with such id" });
        res.json(result);
    }
    catch (err) {
        res.status(400).json({ title: "can not found product by id", message: err.message })
    }

}
export async function addProduct(req, res) {
    let { body } = req;
    if(!body.prodName||!body.price)
        return res.status(404).json({title:"missing data in body",message:"name price are required"});
    try {
        let newProduct = new ProductModel(req.body);
            await newProduct.save();
            res.json(newProduct);
    }
    catch (err) {
        res.status(400).json({ title: "can not add product ", message: err.message })
    }
}
export async function deleteProductById(req, res) {
    let { id } = req.params;
    try {
        let result = await ProductModel.findByIdAndDelete(id);
        if (!result)
            return res.status(400).json({ title: "cannot delete by id", message: "no product with such id" });
        res.json(result);
    }
    catch (err) {
        res.status(400).json({ title: "can not delete product by id", message: err.message })
    }

}
export async function updateProduct(req, res) {
    let { id} = req.params;
    let { price } = req.body; 
    if(!price)
        return res.status(404).json({title:"missing data in body",message:"price is required"});
    try {
        let result = await ProductModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!result)
            return res.status(400).json({ title: "cannot update by id", message: "no product with such id" });
        res.json(result);
    }
    catch (err) {
        res.status(400).json({ title: "can not update product by id", message: err.message })
    }
}
