import { useState, useEffect } from 'react';
import { ShoppingCart, ArrowLeft, Trash2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem('sweetCart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCartItems(parsedCart);
      updateCartCount(parsedCart);
    }
  }, []);

  const updateCartCount = (items) => {
    const count = items.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  };

  useEffect(() => {
    localStorage.setItem('sweetCart', JSON.stringify(cartItems));
    updateCartCount(cartItems);
    const event = new CustomEvent('cartUpdated');
    window.dispatchEvent(event);
  }, [cartItems]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };
  
  const removeItem = (id) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    toast.success('Item removed from cart');
  };

  const removeAllItems = () => {
    setCartItems([]);
    toast.success('All items removed from cart');
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to place an order');
      return;
    }
    if (cartItems.length === 0) {
      toast.error('Cart is empty');
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            productId: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price
          })),
          total: Number(calculateTotal())
        })
      });
      const data = await res.json();
      if (data.success) {
        setCartItems([]);
        toast.success('Order placed successfully!');
        navigate("/orders", { state: { orderPlaced: true } });
      } else {
        toast.error(data.message || 'Order failed');
      }
    } catch (error) {
      toast.error('Order failed');
    }
  };

  const goBackToShop = () => {
    window.location.href = '/menu';
  };

  // After successful order placement

  return (
    <>
      <Toaster position="top-right" />
      <div className="bg-[#a5a5a5] min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="text-center mb-8">
            <h2 className="text-red-600 text-xl sm:text-2xl font-semibold border-t border-b border-red-500 inline-block px-4 py-1 my-2 sm:my-4">
              Sweet Cart
            </h2>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
              <h3 className="text-2xl sm:text-3xl text-black font-bold">Your Items</h3>
              <div className="relative">
                <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <ShoppingCart className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400" />
                    <span className="absolute top-0 right-0 text-xl sm:text-2xl text-gray-400">?</span>
                  </div>
                </div>
                <p className="text-gray-500 text-sm sm:text-base">No items in the cart.</p>
              </div>
            ) : (
              <>
                <div className="hidden sm:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-2">Item</th>
                        <th className="text-center py-3 px-2">Qty</th>
                        <th className="text-right py-3 px-2">Amount</th>
                        <th className="text-right py-3 px-2">Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <tr key={item.id} className="border-b border-gray-200">
                          <td className="py-4 px-2">
                            <div className="flex items-center">
                              {item.image && (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover mr-3 sm:mr-4"
                                />
                              )}
                              <div>
                                <h3 className="font-medium text-gray-800 text-sm sm:text-base">{item.name}</h3>
                                <p className="text-gray-500 text-xs sm:text-sm">Rs {item.price.toFixed(2)}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-2">
                            <div className="flex items-center justify-center">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="bg-gray-200 px-2 py-1 rounded-l text-sm"
                              >
                                -
                              </button>
                              <span className="px-3 sm:px-4 py-1 bg-gray-100 text-sm sm:text-base">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="bg-gray-200 px-2 py-1 rounded-r text-sm"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="py-4 px-2 text-right text-sm sm:text-base">
                            Rs {(item.price * item.quantity).toFixed(2)}
                          </td>
                          <td className="py-4 px-2 text-right">
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 border-gray-200">
                        <td colSpan="2" className="py-4 text-right font-medium text-sm sm:text-base">Total Price</td>
                        <td className="py-4 px-2 text-right font-medium text-sm sm:text-base">Rs {calculateTotal()}</td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div className="sm:hidden space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="border-b border-gray-200 pb-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-10 h-10 rounded object-cover mr-3"
                            />
                          )}
                          <div>
                            <h3 className="font-medium text-gray-800 text-sm">{item.name}</h3>
                            <p className="text-gray-500 text-xs">Rs {item.price.toFixed(2)}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="bg-gray-200 px-2 py-1 rounded-l text-xs"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 bg-gray-100 text-xs">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="bg-gray-200 px-2 py-1 rounded-r text-xs"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-sm font-medium">
                          Rs {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <span className="font-medium text-sm">Total Price</span>
                    <span className="font-medium text-sm">Rs {calculateTotal()}</span>
                  </div>
                </div>

                {cartItems.length > 0 && (
                  <div className="text-right mt-4">
                    <button
                      onClick={removeAllItems}
                      className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 sm:px-4 rounded-md text-sm sm:text-base"
                    >
                      Remove All Items
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={goBackToShop}
              className="bg-gray-900 hover:bg-gray-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-md flex items-center justify-center transition-colors sm:flex-1 text-sm sm:text-base"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              BACK TO SHOP
            </button>

            {cartItems.length > 0 && (
              <Link to="/payment">
                <button
                onClick={handleCheckout}
                className="bg-amber-500 hover:bg-amber-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-md transition-colors text-sm sm:text-base sm:w-48"
              >
                CHECKOUT
              </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}