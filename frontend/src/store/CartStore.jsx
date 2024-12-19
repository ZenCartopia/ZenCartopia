import { create } from "zustand";
import { persist } from "zustand/middleware";

// Store for managing user authentication and cart items
export const useCartStore = create(
  persist(
    (set) => ({
      // User authentication state
      user: null,
      token: null,

      // Cart state
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

      // Login action
      login: (userData, token) => {
        set({ user: userData, token });
      },

      // Logout action
      logout: () => {
        set({ user: null, token: null });
      },

      // Check if the user is logged in
      isAuthenticated: () => {
        return !!localStorage.getItem("auth-token");
      },
    }),
    {
      name: "store", // Key to persist the store data in localStorage
    }
  )
);
