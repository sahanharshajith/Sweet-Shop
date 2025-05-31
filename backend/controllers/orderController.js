import Order from "../models/orderModel.js";

export const createOrder = async (req, res) => {
    try {
        const { items, total } = req.body;
        const order = new Order({
            user: req.user.id,
            items,
            total
        });
        await order.save();
        res.json({ success: true, order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id });
        res.json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("user", "name email");
        res.json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.json({ success: true, order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Order deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};