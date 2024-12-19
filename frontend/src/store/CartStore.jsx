import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      cartItems: [],

      // Add item to cart
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cartItems.find(
            (i) => i.title === item.title
          );
          if (existingItem) {
            return {
              cartItems: state.cartItems.map((i) =>
                i.title === item.title ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          } else {
            return {
              cartItems: [...state.cartItems, { ...item, quantity: 1 }],
            };
          }
        }),

      // Remove item from cart
      removeFromCart: (title) =>
        set((state) => ({
          cartItems: state.cartItems.filter((i) => i.title !== title),
        })),

      // Update quantity
      updateCartItemQuantity: (title, newQuantity) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.title === title ? { ...item, quantity: newQuantity } : item
          ),
        })),
    }),
    {
      name: "cart-storage", // Key to persist cart data in localStorage
    }
  )
);
