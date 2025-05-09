import { useState, useEffect } from 'react';
import { ShoppingCart, ArrowLeft, Trash2 } from 'lucide-react';
import Footer from '../components/Footer';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

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
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? {...item, quantity: newQuantity} : item
    ));
  };

  const handleCheckout = () => {
    alert('Proceeding to checkout!');
  };

  const goBackToShop = () => {
    window.location.href = '/menu';
  };

  return (
    <>
      <div className="bg-[#e4e4e4] min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h2 className="text-red-600 text-2xl font-semibold border-t border-b border-red-500 inline-block px-4 py-1 my-4">
              Sweet Cart
            </h2>
            <div className="flex justify-center items-center">
              <h3 className="text-3xl text-black font-bold">Your Items</h3>
              <div className="relative ml-4">
                <ShoppingCart className="h-6 w-6 text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <ShoppingCart className="h-16 w-16 text-gray-400" />
                    <span className="absolute top-0 right-0 text-2xl text-gray-400">?</span>
                  </div>
                </div>
                <p className="text-gray-500">No items in the cart.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3">Item</th>
                      <th className="text-center py-3">Qty</th>
                      <th className="text-right py-3">Amount</th>
                      <th className="text-right py-3">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id} className="border-b border-gray-200">
                        <td className="py-4">
                          <div className="flex items-center">
                            {item.image && (
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-12 h-12 rounded object-cover mr-4"
                              />
                            )}
                            <div>
                              <h3 className="font-medium text-gray-800">{item.name}</h3>
                              <p className="text-gray-500 text-sm">Rs {item.price.toFixed(2)}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center justify-center">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="bg-gray-200 px-2 py-1 rounded-l"
                            >
                              -
                            </button>
                            <span className="px-4 py-1 bg-gray-100">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="bg-gray-200 px-2 py-1 rounded-r"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="py-4 text-right">
                          Rs {(item.price * item.quantity).toFixed(2)}
                        </td>
                        <td className="py-4 text-right">
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-gray-200">
                      <td colSpan="2" className="py-4 text-right font-medium">Total Price</td>
                      <td className="py-4 text-right font-medium">Rs {calculateTotal()}</td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={goBackToShop}
              className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-md flex items-center justify-center transition-colors sm:flex-1"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              BACK TO SHOP
            </button>
            
            {cartItems.length > 0 && (
              <button 
                onClick={handleCheckout}
                className="bg-amber-500 hover:bg-amber-600 text-white py-3 px-6 rounded-md transition-colors sm:w-48"
              >
                CHECKOUT
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}