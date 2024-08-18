import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useCart } from '../context/cartContext';

const Home = () => {
  const [products, setProducts] = useState([]);
  const { cart, addToCart, removeItem, updateQuantity, getTotalItems } = useCart();

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

  const handleAddToCart = (product) => {
    // Check if the product is already in the cart
    const existingProduct = JSON.parse(localStorage.getItem('cart') || '[]').find(item => item.id === product.id);

    if (existingProduct) {
      toast.info(`${product.title} is already in your cart!`, {
        position: 'bottom-right',
      });
    } else {
      addToCart(product);
      toast.success(`${product.title} added to cart!`, {
        position: 'bottom-right',
      });
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-4">Product Listing</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => handleAddToCart(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
