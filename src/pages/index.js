import { useEffect, useState } from 'react';  
import ProductCard from '../components/ProductCard';  // Importing the ProductCard component for displaying individual products
import axios from 'axios';  
import { toast } from 'react-toastify';  // Toast notifications to alert users
import { useCart } from '../context/cartContext';  // Cart context to handle cart-related actions

const Home = () => {
  const [products, setProducts] = useState([]);
  const { addToCart, removeItem, cart } = useCart();

  // Fetching products from the FakeStore API when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products.'); 
      }
    };

    fetchProducts();
  }, []); 

  // Handles adding/removing items from the cart and displays notifications
  const handleAddOrRemoveFromCart = (product) => {
    const isInCart = cart.some((item) => item.id === product.id);
    
    if (isInCart) {
      // If the product is in the cart, remove it
      removeItem(product.id);
    } else {
      // If the product is not in the cart, add it
      addToCart(product);
      toast.success(`${product.title} added to cart!`, {
        position: 'bottom-right',
      });
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-4">Product Listing</h1>

      {/* Display the list of products in a responsive grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product} 
            onAddToCart={() => handleAddOrRemoveFromCart(product)}  // Handling add/remove to cart
          />
        ))}
      </div>
    </div>
  );
};

export default Home;