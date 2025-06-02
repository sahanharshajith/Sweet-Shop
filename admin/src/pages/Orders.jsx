import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:4000/api/orders/all", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (err) {
      toast.error("Failed to fetch orders");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await axios.put(`http://localhost:4000/api/orders/${id}/status`, { status });
      if (res.data.success) {
        toast.success("Status updated");
        fetchOrders();
      }
    } catch {
      toast.error("Failed to update status");
    }
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/orders/${id}`);
      toast.success("Order deleted");
      fetchOrders();
    } catch {
      toast.error("Failed to delete order");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className="border p-4 mb-4 rounded shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Order ID: {order._id}</span>
            <select
              value={order.status}
              onChange={(e) => updateStatus(order._id, e.target.value)}
              className="border px-2 py-1 rounded"
            >
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
          </div>
          <p><strong>User:</strong> {order.user?.name} ({order.user?.email})</p>
          <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          <p><strong>Total:</strong> Rs.{order.total}</p>
          <ul className="ml-4 list-disc mt-2">
            {order.items.map((item, i) => (
              <li key={i}>{item.name} × {item.quantity} – Rs.{item.price}</li>
            ))}
          </ul>
          <button
            onClick={() => deleteOrder(order._id)}
            className="mt-3 text-red-600 hover:underline"
          >
            Delete Order
          </button>
        </div>
      ))}
    </div>
  );
};

export default Orders;
