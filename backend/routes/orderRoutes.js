import express from "express";
import { createOrder, getUserOrders, getAllOrders, updateOrderStatus, deleteOrder } from "../controllers/orderController.js";
import auth from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/", auth, createOrder); // User creates order
router.get("/my", auth, getUserOrders); // User gets their orders
router.get("/all", adminAuth, getAllOrders); // Admin gets all orders
router.put("/:id/status", adminAuth, updateOrderStatus);
router.delete("/:id", adminAuth, deleteOrder);

export default router;
