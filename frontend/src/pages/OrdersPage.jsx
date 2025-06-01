import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FiPackage, FiCheckCircle, FiClock, FiDollarSign, FiImage } from "react-icons/fi";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:4000/api/orders/my", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) throw new Error("Failed to fetch orders");

        const data = await response.json();
        if (data.success) {
          const processedOrders = data.orders
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by newest
            .map(order => ({
              ...order,
              items: order.items.map(item => ({
                ...item,
                imageUrl: item.imageUrl || ''
              }))
            }));
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

    if (location.state?.orderPlaced) {
      setOrderSuccess(true);
      const timer = setTimeout(() => setOrderSuccess(false), 5000);
      return () => clearTimeout(timer);
    }

    fetchOrders();
  }, [location.state]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-[#e4e4e4]">
      <div className="flex items-center gap-3 mb-6">
        <FiPackage className="text-2xl text-indigo-600" />
        <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
      </div>

      {orderSuccess && (
        <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
          <FiCheckCircle className="text-green-500 text-xl" />
          <span className="text-green-700 font-medium">Order placed successfully!</span>
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-100 rounded-lg p-4 h-32"></div>
          ))}
        </div>
      ) : error ? (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12">
          <FiPackage className="mx-auto text-4xl text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-600">No orders yet</h3>
          <p className="text-gray-500 mt-1">Your order history will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order._id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
                <div>
                  <span className="font-medium">Order #</span>
                  <span className="text-indigo-600 ml-1">{order._id.substring(0, 8)}</span>
                </div>
                <span className={`px-2 py-1 bg-green-400 rounded-full text-xs font-medium ${getStatusColor(order.status || 'processing')}`}>
                  {order.status || 'Processing'}
                </span>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <FiClock className="text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <p className="text-sm font-medium">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div>
                      <p className="text-xs text-gray-500">Total</p>
                      <p className="text-sm font-medium">Rs {order.total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                <h4 className="text-sm font-medium mb-2">Items:</h4>
                <ul className="space-y-2">
                  {order.items.map((item, idx) => (
                    <li key={`${order._id}-${idx}`} className="flex justify-between items-center py-2 border-b last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                          {item.imageUrl ? (
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/placeholder-product.jpg';
                              }}
                            />
                          ) : (
                            <FiImage className="text-gray-400" />
                          )}
                        </div>
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {item.quantity} × Rs {item.price.toFixed(2)}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
