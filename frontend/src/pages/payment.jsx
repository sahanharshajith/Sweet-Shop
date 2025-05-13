import { useState, useEffect } from 'react';
import { ShoppingCart, ArrowLeft, CreditCard, User, Phone, MapPin, CheckCircle } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function PaymentPage() {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [activeStep, setActiveStep] = useState(1); // 1: Delivery, 2: Payment, 3: Confirmation

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

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const calculateTax = () => {
    const subtotal = parseFloat(calculateSubtotal());
    return (subtotal * 0.05).toFixed(2); // 5% tax
  };

  const calculateShipping = () => {
    return cartItems.length > 0 ? '30.00' : '0.00'; // Fixed shipping cost
  };

  const calculateGrandTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const tax = parseFloat(calculateTax());
    const shipping = parseFloat(calculateShipping());
    return (subtotal + tax + shipping).toFixed(2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear the error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate based on current step
    if (activeStep === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.zipCode.trim()) newErrors.zipCode = 'Zip code is required';
    } else if (activeStep === 2) {
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Card number must be 16 digits';
      }
      if (!formData.cardName.trim()) newErrors.cardName = 'Name on card is required';
      if (!formData.expiryDate.trim()) {
        newErrors.expiryDate = 'Expiry date is required';
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = 'Format should be MM/YY';
      }
      if (!formData.cvv.trim()) {
        newErrors.cvv = 'CVV is required';
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = 'CVV must be 3 or 4 digits';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setActiveStep(activeStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
      window.scrollTo(0, 0);
    } else {
      // Go back to cart page
      window.location.href = '/cart';
    }
  };

  const processPayment = () => {
    if (validateForm()) {
      setIsProcessing(true);
      
      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false);
        setPaymentComplete(true);
        setActiveStep(3);
        
        // Clear cart after successful payment
        localStorage.removeItem('sweetCart');
        setCartItems([]);
        setCartCount(0);
        
        toast.success('Payment processed successfully!');
      }, 2000);
    }
  };

  const formatCardNumber = (cardNumber) => {
    // Format card number with spaces every 4 digits
    const cleaned = cardNumber.replace(/\s+/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : '';
  };

  const goBackToShop = () => {
    window.location.href = '/menu';
  };

  const goToHome = () => {
    window.location.href = '/';
  };

  // Format card number as user types
  const handleCardNumberChange = (e) => {
    let { value } = e.target;
    value = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (value.length > 16) {
      value = value.slice(0, 16);
    }
    
    // Format with spaces
    const formattedValue = formatCardNumber(value);
    
    setFormData({
      ...formData,
      cardNumber: formattedValue,
    });
    
    if (errors.cardNumber) {
      setErrors({
        ...errors,
        cardNumber: '',
      });
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h2 className="text-red-600 text-xl sm:text-2xl font-semibold border-t border-b border-red-500 inline-block px-4 py-1 my-2 sm:my-4">
              Sweet Checkout
            </h2>
            <div className="flex justify-center items-center gap-2 sm:gap-4">
              <h3 className="text-2xl sm:text-3xl text-black font-bold">
                {activeStep === 1 ? 'Delivery Details' : 
                 activeStep === 2 ? 'Payment Information' : 
                 'Order Confirmation'}
              </h3>
              {!paymentComplete && (
                <div className="relative">
                  <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Checkout Steps */}
          <div className="mb-8">
            <div className="flex justify-center items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeStep >= 1 ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                1
              </div>
              <div className={`h-1 w-12 sm:w-24 ${activeStep >= 2 ? 'bg-red-500' : 'bg-gray-300'}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeStep >= 2 ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                2
              </div>
              <div className={`h-1 w-12 sm:w-24 ${activeStep >= 3 ? 'bg-red-500' : 'bg-gray-300'}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeStep >= 3 ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                3
              </div>
            </div>
            <div className="flex justify-center mt-2">
              <div className="text-xs sm:text-sm flex w-full max-w-md justify-between">
                <span className={activeStep >= 1 ? 'text-red-500 font-medium' : 'text-gray-500'}>Delivery</span>
                <span className={activeStep >= 2 ? 'text-red-500 font-medium' : 'text-gray-500'}>Payment</span>
                <span className={activeStep >= 3 ? 'text-red-500 font-medium' : 'text-gray-500'}>Confirmation</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Side: Form */}
            <div className="w-full lg:w-8/12">
              {activeStep === 1 && (
                <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
                  <h4 className="text-lg font-medium mb-4 flex items-center">
                    <User className="mr-2 h-5 w-5 text-red-500" />
                    Delivery Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-md ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="John Doe"
                      />
                      {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="123-456-7890"
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-md ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="123 Main St"
                      />
                      {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-md ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="New York"
                      />
                      {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-md ${errors.zipCode ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="10001"
                      />
                      {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 2 && (
                <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
                  <h4 className="text-lg font-medium mb-4 flex items-center">
                    <CreditCard className="mr-2 h-5 w-5 text-red-500" />
                    Payment Details
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleCardNumberChange}
                        className={`w-full p-2 border rounded-md ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                      />
                      {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-md ${errors.cardName ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="John Doe"
                      />
                      {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleChange}
                          className={`w-full p-2 border rounded-md ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="MM/YY"
                          maxLength="5"
                        />
                        {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                        <input
                          type="password"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          className={`w-full p-2 border rounded-md ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="123"
                          maxLength="4"
                        />
                        {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md mt-2">
                      <p className="text-sm text-gray-600">
                        Your payment information is secure. We use encryption to protect your data.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 3 && (
                <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
                  <div className="text-center py-6">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h3>
                    <p className="text-gray-600 mb-6">Your order has been placed successfully.</p>
                    
                    <div className="mb-6 max-w-md mx-auto">
                      <div className="border-t border-b border-gray-200 py-4 px-6">
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">Order Number:</span>
                          <span>SW-{Math.floor(100000 + Math.random() * 900000)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">Date:</span>
                          <span>{new Date().toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">Payment Method:</span>
                          <span>Credit Card (**** {formData.cardNumber.slice(-4)})</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Total Amount:</span>
                          <span className="font-bold">Rs {calculateGrandTotal()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <button
                        onClick={goToHome}
                        className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-md transition-colors"
                      >
                        GO TO HOME
                      </button>
                      <button
                        onClick={goBackToShop}
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-md transition-colors"
                      >
                        CONTINUE SHOPPING
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Side: Order Summary */}
            {activeStep < 3 && (
              <div className="w-full lg:w-4/12">
                <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
                  <h4 className="text-lg font-medium mb-4 flex items-center">
                    <ShoppingCart className="mr-2 h-5 w-5 text-red-500" />
                    Order Summary
                  </h4>
                  
                  {cartItems.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-gray-500">No items in your cart.</p>
                    </div>
                  ) : (
                    <>
                      <div className="max-h-64 overflow-y-auto mb-4">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-100">
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
                                <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <span className="text-sm font-medium">
                              Rs {(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between py-2">
                          <span className="text-gray-600 text-sm">Subtotal</span>
                          <span className="text-sm font-medium">Rs {calculateSubtotal()}</span>
                        </div>
                        <div className="flex justify-between py-2">
                          <span className="text-gray-600 text-sm">Tax (5%)</span>
                          <span className="text-sm">Rs {calculateTax()}</span>
                        </div>
                        <div className="flex justify-between py-2">
                          <span className="text-gray-600 text-sm">Shipping</span>
                          <span className="text-sm">Rs {calculateShipping()}</span>
                        </div>
                        <div className="flex justify-between py-3 border-t border-gray-200 mt-2">
                          <span className="font-bold">Total</span>
                          <span className="font-bold">Rs {calculateGrandTotal()}</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {activeStep === 1 && formData.address && (
                  <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
                    <h4 className="text-sm font-medium mb-2 flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-red-500" />
                      Delivery Address
                    </h4>
                    <p className="text-sm text-gray-600">
                      {formData.fullName}<br />
                      {formData.address}<br />
                      {formData.city}, {formData.zipCode}<br />
                      {formData.phone}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {activeStep < 3 && (
            <div className="flex justify-between mt-6">
              <button
                onClick={handleBack}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-md flex items-center justify-center transition-colors text-sm sm:text-base"
              >
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                {activeStep === 1 ? 'BACK TO CART' : 'BACK'}
              </button>

              {activeStep === 1 ? (
                <button
                  onClick={handleNext}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-md transition-colors text-sm sm:text-base"
                  disabled={cartItems.length === 0}
                >
                  CONTINUE TO PAYMENT
                </button>
              ) : (
                <button
                  onClick={processPayment}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-md transition-colors text-sm sm:text-base flex items-center"
                  disabled={isProcessing || cartItems.length === 0}
                >
                  {isProcessing ? 'PROCESSING...' : 'PLACE ORDER'}
                  {isProcessing && (
                    <span className="ml-2 animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}