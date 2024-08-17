// src/components/ProductCard.js
import Image from 'next/image';

const ProductCard = ({ product, onAddToCart }) => {
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
        onClick={onAddToCart} // Use the onAddToCart prop passed from parent
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
