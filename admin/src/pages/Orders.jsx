import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:4000/api/orders/all", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      toast.error("Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:4000/api/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Order status updated");
        fetchOrders();
      } else {
        toast.error(data.message || "Failed to update status");
      }
    } catch (error) {
      toast.error("Error updating order status");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-semibold mb-6">All Orders (Admin)</h2>

      {loading ? (
        <p className="text-gray-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-600">No orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order._id} className="p-5 border rounded-lg shadow-sm bg-white">
              <div className="mb-2 font-bold text-indigo-600">Order #{order._id}</div>
              <div className="text-gray-700 mb-1">
                <strong>User:</strong>{" "}
                {order.user ? `${order.user.name} (${order.user.email})` : "N/A"}
              </div>
              <div className="text-gray-600">Date: {new Date(order.createdAt).toLocaleString()}</div>
              <div className="text-gray-700 mb-2">Total: ₹{order.total}</div>
              <div className="mb-2">
                <label className="font-medium mr-2">Status:</label>
                <select
                  value={order.status}
                  onChange={e => handleStatusChange(order._id, e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <ul className="divide-y divide-gray-200 mt-2 text-sm">
                {order.items.map((item, idx) => (
                  <li key={idx} className="py-1 flex justify-between text-gray-700">
                    <span>{item.name} × {item.quantity}</span>
                    <span>₹{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
