import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('cart');
    }
  }, [cart]);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
  };

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    let updatedCart;

    if (existingProduct) {
      updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    updateCart(updatedCart);
  };

  const removeItem = (id) => {
    const itemToRemove = cart.find((item) => item.id === id);
    const updatedCart = cart.filter((item) => item.id !== id);
    updateCart(updatedCart);

    if (itemToRemove) {
      toast.info(`${itemToRemove.title} removed from cart`, {
        position: 'bottom-right',
      });
    }
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(id);
      return;
    }
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    updateCart(updatedCart);
  };

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
