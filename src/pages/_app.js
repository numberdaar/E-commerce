// src/pages/_app.js
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useCart from '../hooks/useCart';
import Navbar from '../components/Navbar';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const { cart, addToCart, removeItem, updateQuantity, getTotalItems } = useCart();

  return (
    <>
       <Navbar cartCount={getTotalItems()} />
       <Component
        {...pageProps}
        cart={cart}
        addToCart={addToCart}
        removeItem={removeItem}
        updateQuantity={updateQuantity}
      />
      <ToastContainer />
    </>
  );
}

export default MyApp;
