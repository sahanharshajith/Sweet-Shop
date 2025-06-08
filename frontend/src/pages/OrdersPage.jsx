import { useEffect, useState } from "react";
import { FiPackage, FiCheckCircle, FiClock, FiImage, FiChevronDown, FiChevronUp } from "react-icons/fi";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_BASE_URL}/api/orders/my`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) throw new Error("Failed to fetch orders");

        const data = await response.json();
        if (data.success) {
          const processedOrders = data.orders
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map(order => {
              const orderAge = Date.now() - new Date(order.createdAt).getTime();
              const status = order.status?.toLowerCase() === "pending" && orderAge > 86400000
                ? "Delivered"
                : order.status;
              return {
                ...order,
                status: status,
                items: order.items.map(item => ({
                  ...item,
                  imageUrl: item.imageUrl || item.image || '/placeholder-product.jpg'
                }))
              };
            });
          setOrders(processedOrders);
        } else {
          throw new Error(data.message || "Failed to load orders");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const toggleExpand = (id) => {
    setExpandedOrderId(prev => (prev === id ? null : id));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-[#a5a5a5] min-h-screen">
      <div className="flex justify-center mb-6">
          <h2 className="text-red-600 text-2xl font-semibold border-t border-b border-red-500 inline-block px-4 py-1">
            My Orders
          </h2>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading orders...</p>
      ) : error ? (
        <div className="p-4 bg-red-50 border border-red-200 rounded text-red-600">{error}</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12">
          <FiPackage className="mx-auto text-4xl text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-600">No orders yet</h3>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order._id} className="border rounded-lg shadow-sm bg-white transition">
              {/* Order Header */}
              <div
                className="px-4 py-3 border-b flex justify-between items-center cursor-pointer hover:bg-gray-50"
                onClick={() => toggleExpand(order._id)}
              >
                <div>
                  <span className="font-medium text-gray-700">Order #</span>
                  <span className="text-indigo-600 ml-1">{order._id.substring(0, 8)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-semibold ${getStatusStyle(order.status || "processing")}`}
                  >
                    {order.status || "Processing"}
                  </span>
                  {expandedOrderId === order._id ? (
                    <FiChevronUp className="text-gray-500" />
                  ) : (
                    <FiChevronDown className="text-gray-500" />
                  )}
                </div>
              </div>

              {/* Order Details */}
              {expandedOrderId === order._id && (
                <div className="p-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <FiClock className="text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Date</p>
                        <p className="text-sm font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                        <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleTimeString()}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Total</p>
                      <p className="text-sm font-medium">Rs {order.total.toFixed(2)}</p>
                    </div>
                  </div>

                  <h4 className="text-sm font-semibold mb-2 text-gray-700">Items</h4>
                  <ul className="divide-y">
                    {order.items.map((item, idx) => (
                      <li
                        key={`${order._id}-${idx}`}
                        className="flex justify-between items-center py-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/placeholder-product.jpg';
                              }}
                            />
                          </div>
                          <span className="text-sm text-gray-700">{item.name}</span>
                        </div>
                        <div className="text-sm text-gray-600 whitespace-nowrap">
                          {item.quantity} × Rs {item.price.toFixed(2)}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
