import React from "react";
import { useCartStore } from "../store/CartStore";

function Cart() {
  const { cartItems, removeFromCart, updateCartItemQuantity } = useCartStore();

  const handleIncreaseQuantity = (title, currentQuantity) => {
    updateCartItemQuantity(title, currentQuantity + 1);
  };

  const handleDecreaseQuantity = (title, currentQuantity) => {
    if (currentQuantity > 1) {
      updateCartItemQuantity(title, currentQuantity - 1);
    }
  };

  const handleRemove = (title) => {
    removeFromCart(title);
  };

  // Calculate total price of all items
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 bg-orange-50 rounded">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-lg text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-6">
            {cartItems.map((item, index) => {
              const lineTotal = item.price * item.quantity;
              return (
                <li
                  key={index}
                  className="flex items-center space-x-4 border-b pb-4"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-grow">
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-gray-700">
                      Price: ${item.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-700">{item.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        handleDecreaseQuantity(item.title, item.quantity)
                      }
                      className="px-2 py-1 border rounded hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="font-bold">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleIncreaseQuantity(item.title, item.quantity)
                      }
                      className="px-2 py-1 border rounded hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">Total: ${lineTotal.toFixed(2)}</p>
                    <button
                      onClick={() => handleRemove(item.title)}
                      className="mt-2 text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Display grand total */}
          <div className="mt-6 flex justify-end">
            <p className="text-xl font-bold mr-4">
              Grand Total: ${total.toFixed(2)}
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
