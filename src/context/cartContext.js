import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

// Custom hook to access cart context
export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from local storage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('cart');
    }
  }, [cart]);

  const updateCart = (updatedCart) => {
    setCart(updatedCart); // Update cart state
  };

  // Function to add an item to the cart
  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    let updatedCart;

    // If product already in cart, increase quantity
    if (existingProduct) {
      updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      // Otherwise, add new product with initial quantity 1
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    updateCart(updatedCart);
  };

  // Function to remove an item from the cart
  const removeItem = (id) => {
    const itemToRemove = cart.find((item) => item.id === id);
    const updatedCart = cart.filter((item) => item.id !== id);
    updateCart(updatedCart);

    if (itemToRemove) {
      toast.info(`${itemToRemove.title} removed from cart`, { // Show notification
        position: 'bottom-right',
      });
    }
  };

  // Function to update the quantity of an item in the cart
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(id); // Remove item if quantity is set to 0
      return;
    }
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    updateCart(updatedCart);
  };

  // Function to get the total number of items in the cart
  const getTotalItems = () => {
    return cart.length;
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeItem, updateQuantity, getTotalItems }}
    >
      {children}
    </CartContext.Provider>
  );
};