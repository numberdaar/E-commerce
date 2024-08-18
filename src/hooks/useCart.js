import { toast } from 'react-toastify';
import { useEffect,useState } from 'react';

const useCart = () => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage when the component is mounted
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('cart');
    }
  }, [cart]);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
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
    const itemToRemove = cart.find(item => item.id === id);
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
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return { cart, addToCart, removeItem, updateQuantity, getTotalItems };
};

export default useCart;
