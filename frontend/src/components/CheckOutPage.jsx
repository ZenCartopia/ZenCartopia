import React, { useState } from 'react';
import { useCartStore } from '../store/CartStore';
import { useNavigate } from 'react-router-dom';

const CheckOutPage = () => {
  const { user, cartItems, token, clearCart } = useCartStore();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState(user.address);
  const [billingAddress, setBillingAddress] = useState(user.address);
  const [isShippingSameAsBilling, setIsShippingSameAsBilling] = useState(true);
  
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState(''); 

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    const invalidItems = cartItems.filter((item) => item.quantity > item.aquantity);

    if (invalidItems.length > 0) {
      setAlertMessage(
        `Some items exceed available stock:\n${invalidItems
          .map((item) => `${item.title}: Available (${item.aquantity}), Requested (${item.quantity})`)
          .join('\n')}`
      );
      setAlertType('error');
      return;
    }

    const orderRequest = {
      user: user,
      cartItems: cartItems.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price
      })),
      shippingAddress: shippingAddress,
      billingAddress: billingAddress
    };

    const response = await fetch('http://localhost:5454/api/orders/place-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify(orderRequest),
    });

    const data = await response.json();

    if (response.ok) {
      setAlertMessage('Order placed successfully!');
      setAlertType('success');
      clearCart();
      setTimeout(() => {
        navigate("/welcome");
      }, 1500);
    } else {
      setAlertMessage('Error placing order');
      setAlertType('error');
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    if (name === 'shippingAddress') {
      setShippingAddress(value);
    } else if (name === 'billingAddress') {
      setBillingAddress(value);
    }
  };

  return (
    <div className="checkout-page p-6 bg-gray-100 min-h-screen text-gray-800">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout Page</h1>

      {/* Alert Component */}
      {alertMessage && (
        <div className={`mb-4 p-4 rounded-md ${alertType === 'error' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'} border border-${alertType === 'error' ? 'red' : 'green'}-400`}>
          <strong>{alertType === 'error' ? 'Error:' : 'Success:'}</strong> {alertMessage}
        </div>
      )}

      {/* User Info Section */}
      <section className="user-info bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">User Information</h2>
        <p className="mb-2"><strong>Full Name:</strong> {user.fullName}</p>
        <p className="mb-2"><strong>Email:</strong> {user.email}</p>
      </section>

      {/* Address Selection Section */}
      <section className="address-info bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Shipping & Billing Address</h2>

        {/* Shipping Address */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Shipping Address</label>
          <input
            type="text"
            name="shippingAddress"
            value={shippingAddress}
            onChange={handleAddressChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter shipping address"
          />
        </div>

        {/* Billing Address */}
        <div className="mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isShippingSameAsBilling}
              onChange={() => setIsShippingSameAsBilling(!isShippingSameAsBilling)}
              className="mr-2"
            />
            <label className="text-sm">Billing address is the same as shipping address</label>
          </div>
          {!isShippingSameAsBilling && (
            <input
              type="text"
              name="billingAddress"
              value={billingAddress}
              onChange={handleAddressChange}
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter billing address"
            />
          )}
        </div>
      </section>

      {/* Cart Items Section */}
      <section className="cart-summary bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
        {cartItems.map((item, index) => (
          <div
            key={index}
            className="cart-item flex items-center border-b border-gray-200 pb-4 mb-4 last:border-none last:pb-0 last:mb-0"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-24 h-24 object-cover rounded-lg mr-4"
            />
            <div className="cart-item-details flex-1">
              <h3 className="text-lg font-medium">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="mt-1"><strong>Price:</strong> ${item.price}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <p><strong>Available:</strong> {item.aquantity}</p>
              <p><strong>Subtotal:</strong> ${item.price * item.quantity}</p>
            </div>
          </div>
        ))}
        <div className="total-amount text-right font-bold text-lg mt-4">
          Total: ${totalAmount}
        </div>
      </section>

      {/* Checkout Button */}
      <section className="checkout-actions text-center">
        <button
          className="w-full px-6 py-3 bg-green-600 text-white text-lg rounded-lg hover:bg-green-700"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </section>
    </div>
  );
};

export default CheckOutPage;
