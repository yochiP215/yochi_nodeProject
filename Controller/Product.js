import jwt from 'jsonwebtoken';
import { ProductModel } from "../Models/Product.js";


export async function getAllProducts(req, res) {
    let l = parseInt(req.query.limit) || 10;
    let page = parseInt(req.query.page) || 1;

    try {
        let result = await ProductModel.find()
            .skip((page - 1) * l)
            .limit(l);

        res.json(result);
    } catch (err) {
        res.status(400).json({ title: "Cannot fetch products", message: err.message });
    }
}


export const getTotalPages = async (req, res) => {
    let l = parseInt(req.query.limit) || 10;
    try {
        let result = await ProductModel.countDocuments();
        res.json({
            totalCount: result,
            pages: Math.ceil(result / l),
            limit: l
        });
    } catch (err) {
        res.status(400).json({ title: "Cannot get total pages", message: err.message });
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
    const token = req.headers.tkn;
    if (!token) {
        return res.status(401).json({ title: "Unauthorized", message: "No token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log('Decoded user:', decoded);

        if (!body.prodName || !body.price)
            return res.status(404).json({ title: "missing data in body", message: "name price are required" });

        let newProduct = new ProductModel(req.body);
        await newProduct.save();
        res.json(newProduct);
    }
    catch (err) {
        res.status(400).json({ title: "can not add product", message: err.message });
    }
}

export async function deleteProductById(req, res) {
    let { id } = req.params;
    const token = req.headers.tkn;
    if (!token) {
        return res.status(401).json({ title: "Unauthorized", message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log('Decoded user:', decoded);

        let result = await ProductModel.findByIdAndDelete(id);
        if (!result)
            return res.status(400).json({ title: "cannot delete by id", message: "no product with such id" });

        res.json(result);
    }
    catch (err) {
        res.status(400).json({ title: "can not delete product by id", message: err.message });
    }
}




export async function updateProduct(req, res) {
    let { id } = req.params;
    let { price } = req.body;
    const token = req.headers.tkn;
    if (!token) {
        return res.status(401).json({ title: "Unauthorized", message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log('Decoded user:', decoded);

        if (!price)
            return res.status(404).json({ title: "missing data in body", message: "price is required" });

        let result = await ProductModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!result)
            return res.status(400).json({ title: "cannot update by id", message: "no product with such id" });

        res.json(result);
    }
    catch (err) {
        res.status(400).json({ title: "can not update product by id", message: err.message });
    }
}