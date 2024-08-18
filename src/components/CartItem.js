import Image from 'next/image';

// CartItem component to render individual cart items
// Props: item (product details), handleQuantityChange (function to handle quantity updates),
// handleRemoveItem (function to remove item from cart)
const CartItem = ({ item, handleQuantityChange, handleRemoveItem }) => {
  return (
    <div className="border p-4 flex items-center">
      {/* Product image */}
      <Image
        src={item.image}
        alt={item.title}
        width={96}
        height={96}
        className="object-cover mr-4"
      />
      <div className="flex-1">
        {/* Product title */}
        <h2 className="text-xl font-semibold">{item.title}</h2>
        {/* Product price */}
        <p className="text-gray-600">${item.price}</p>
        <div className="flex items-center mt-2">
          {/* Decrease quantity button */}
          <button
            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
            className="bg-gray-300 text-gray-800 px-2 py-1 rounded"
          >
            -
          </button>
          {/* Input field for manually updating quantity */}
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
            className="w-16 text-center mx-2 border rounded"
          />
          {/* Increase quantity button */}
          <button
            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
            className="bg-gray-300 text-gray-800 px-2 py-1 rounded"
          >
            +
          </button>
          {/* Button to remove item from cart */}
          <button
            onClick={() => handleRemoveItem(item.id)}
            className="ml-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Remove Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
