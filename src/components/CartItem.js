const CartItem = ({ item, handleQuantityChange, handleRemoveItem }) => {
  return (
    <div className="border p-4 flex items-center">
      <img src={item.image} alt={item.title} className="w-24 h-24 object-cover mr-4" />
      <div className="flex-1">
        <h2 className="text-xl font-semibold">{item.title}</h2>
        <p className="text-gray-600">${item.price}</p>
        <div className="flex items-center mt-2">
          <button
            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
            className="bg-gray-300 text-gray-800 px-2 py-1 rounded"
          >
            -
          </button>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
            className="w-16 text-center mx-2 border rounded"
          />
          <button
            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
            className="bg-gray-300 text-gray-800 px-2 py-1 rounded"
          >
            +
          </button>
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
