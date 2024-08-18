import Image from 'next/image';
import { useCart } from '../context/cartContext'; 
import { toast } from 'react-toastify'; // Import toast for notifications

// ProductCard component to render individual product information
// Props: product (product details)
const ProductCard = ({ product }) => {
  const { cart, addToCart, removeItem } = useCart(); // Use useCart hook to manage cart state

  // Check if the product is already in the cart
  const isInCart = cart.some((item) => item.id === product.id);

  // Handle add or remove product based on its presence in the cart
  const handleAddOrRemove = () => {
    if (isInCart) {
      removeItem(product.id); // Remove from cart if already added
    } else {
      addToCart(product); // Add to cart if not already present
      toast.success(`${product.title} added to cart!`, {
        position: 'bottom-right',
      });
    }
  };

  return (
    <div className="border p-4 flex flex-col items-center">
      {/* Product image */}
      <div className="relative w-full h-48 mb-4">
        <Image 
          src={product.image} 
          alt={product.title} 
          layout="fill" 
          objectFit="cover" 
          className="rounded"
        />
      </div>
      {/* Product title */}
      <h2 className="text-xl font-semibold">{product.title}</h2>
      {/* Product price */}
      <p className="text-gray-600">${product.price}</p>
      
      {/* Add or Remove from Cart button */}
      <button
        onClick={handleAddOrRemove}
        className={`mt-4 py-2 px-4 rounded ${isInCart ? 'bg-red-500' : 'bg-blue-500'} text-white`}
      >
        {isInCart ? 'Remove from Cart' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default ProductCard;