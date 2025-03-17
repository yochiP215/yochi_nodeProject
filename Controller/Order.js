import { orderModel } from "../Models/Order.js";

export async function getAllOrders(req, res) {
    try {
        let result = await orderModel.find();
        res.json(result);
    }
    catch (err) {
        res.status(400).json({ titel: "cannot get all orders", message: err.message })
    }
}
export async function addOrder(req, res) {
    let { body } = req;
    if (body.products.length === 0 || !body.userId)
        return res.status(404).json({ title: "missing data in body", message: "products price are required" });
    try {
        let newOrder = new orderModel(req.body);
        newOrder.finalPrice = newOrder.priceOfSending + newOrder.products.reduce((total, product) => {//חישוב מחיר סופי סכימת כל המוצרים כפול הכמות שלהם
            return total + (product.price * product.cnt);
        }, 0);
        await newOrder.save();
        res.json(newOrder);
    }
    catch (err) {
        res.status(400).json({ title: "can not add order ", message: err.message })
    }
}

export async function deleteOrderById(req, res) {
    let { id } = req.params;
    try {
        // מציאת ההזמנה לפי ID
        let order = await orderModel.findById(id);

        // אם ההזמנה לא נמצאה
        if (!order) {
            return res.status(400).json({ title: "cannot delete by id", message: "no order with such id" });
        }

        // אם ההזמנה כבר יצאה לדרך
        if (order.isGoOut) {
            return res.status(404).json({ title: "can not delete order", message: "the order has already gone out" });
        }

        // אם ההזמנה לא יצאה לדרך, מחק את ההזמנה
        await orderModel.findByIdAndDelete(id);
        res.json({ message: "Order deleted successfully" });

    } catch (err) {
        res.status(400).json({ title: "can not delete order by id", message: err.message });
    }
}


export async function getAllORdersBYUserId(req, res) {
    let {id } = req.params; 
    try {
        if (!id) {
            return res.status(400).json({ title: "Invalid userId", message: "userId is required" });
        }
        const result = await orderModel.find({userId:id});
        if (!result) {
            return res.status(404).json({ title: "cannot get orders by userId", message: "no orders found for this userId" });
        }
        res.json(result);
    }
    catch (err) {
        res.status(400).json({ title: "cannot get orders by userId", message: err.message });
    }
}

export async function updateOrder(req, res) {
    let { id } = req.params;
    try {
        let result = await orderModel.findOneAndUpdate(
            { _id: id, isGoOut: false }, 
            { $set: { isGoOut: true } }, 
            { new: true }  
        );

        if (!result)
            return res.status(400).json({ title: "cannot update by id", message: "no order with such id or isGoOut is not false" });

        res.json(result);
    }
    catch (err) {
        res.status(400).json({ title: "can not update order by id", message: err.message });
    }
}



