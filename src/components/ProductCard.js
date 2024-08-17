// src/components/ProductCard.js

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="border p-4 flex flex-col items-center">
      <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-4" />
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