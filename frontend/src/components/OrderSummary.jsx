// OrderSummary.js
import React from 'react';
import useStore from './store';

const OrderSummary = () => {
  const { cartItems, clearCart } = useStore((state) => state);

  // Calculate the total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Order Summary</h2>
      {cartItems.length === 0 ? (
        <p className="text-center text-lg text-gray-600">Your cart is empty. Add some items to proceed with the checkout.</p>
      ) : (
        <div>
          {/* List cart items */}
          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
                <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-md" />
                <div className="flex-1 ml-4">
                  <p className="text-lg font-medium">{item.title}</p>
                  <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none"
                  onClick={() => useStore.getState().removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Total Price */}
          <div className="text-xl font-semibold text-right mb-6">
            Total: <span className="text-green-500">${totalPrice.toFixed(2)}</span>
          </div>

          {/* Clear cart button */}
          <div className="flex justify-between items-center mb-6">
            <button
              className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 focus:outline-none"
              onClick={clearCart}
            >
              Clear Cart
            </button>
            {/* Proceed to payment */}
            <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 focus:outline-none">
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
