import Image from 'next/image';
import { useCart } from '../context/cartContext'; 
import { toast } from 'react-toastify'; // Import toast for notifications

const ProductCard = ({ product }) => {
  const { cart, addToCart, removeItem } = useCart(); 

  const isInCart = cart.some((item) => item.id === product.id);

  const handleAddOrRemove = () => {
    if (isInCart) {
      removeItem(product.id);
    } else {
      addToCart(product);
      toast.success(`${product.title} added to cart!`, {
        position: 'bottom-right',
      });
    }
  };

  return (
    <div className="border p-4 flex flex-col items-center">
      <div className="relative w-full h-48 mb-4">
        <Image 
          src={product.image} 
          alt={product.title} 
          layout="fill" 
          objectFit="cover" 
          className="rounded"
        />
      </div>
      <h2 className="text-xl font-semibold">{product.title}</h2>
      <p className="text-gray-600">${product.price}</p>
      
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
