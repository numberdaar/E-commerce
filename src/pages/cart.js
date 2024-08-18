import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '../context/cartContext';

const Cart = () => {
  // Destructuring cart, removeItem, and updateQuantity functions from the cart context
  const { cart, removeItem, updateQuantity } = useCart();
  
  // Defining a fixed discount value (can be modified based on business logic)
  const discount = 10;

  // State to track the discount type (either fixed or percentage)
  const [discountType, setDiscountType] = useState('fixed');

  // Calculate the subtotal of all items in the cart
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Function to apply discount based on the selected discount type
  const applyDiscount = () => {
    if (discountType === 'fixed') {
      return discount; // Fixed discount value
    } else if (discountType === 'percentage') {
      return (discount / 100) * subtotal; // Percentage discount calculation
    }
    return 0; // No discount applied if no valid type is selected
  };

  // Calculate the total discount based on the type and subtotal
  const totalDiscount = applyDiscount();
  
  // Calculate the total price after applying the discount
  const totalPrice = subtotal - totalDiscount;

  // Simulate the checkout process (placeholder for future functionality)
  const handleCheckout = () => {
    alert('Checkout successful!'); // Placeholder checkout alert
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>

      {cart.length > 0 ? (
        <>
          {/* Render each item in the cart */}
          <div className="mb-8">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b py-4">
                {/* Display product image using Next.js optimized Image component */}
                <div className="relative w-20 h-20">
                  <Image
                    src={item.image}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded"
                  />
                </div>
                {/* Display product title, price, and quantity controls */}
                <div className="flex-grow ml-4">
                  <h3 className="text-lg">{item.title}</h3>
                  <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    {/* Button to decrease item quantity */}
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    {/* Button to increase item quantity */}
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                {/* Button to remove the item from the cart */}
                <div>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart summary section displaying subtotal, discount, and total price */}
          <div className="border p-4 rounded-md bg-gray-50 shadow-md">
            <h3 className="text-xl font-bold mb-4">Cart Summary</h3>
            <p className="text-lg mb-2">Subtotal: <span className="font-semibold">${subtotal.toFixed(2)}</span></p>

            {/* Section to select discount type and display discount */}
            <div className="mb-4">
              <label htmlFor="discountType" className="block mb-1">Discount Type:</label>
              {/* Dropdown to select between fixed and percentage discount */}
              <select
                id="discountType"
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value)}
                className="mb-2 p-2 border rounded-md"
              >
                <option value="fixed">Fixed Discount</option>
                <option value="percentage">Percentage Discount</option>
              </select>

              <label htmlFor="discountAmount" className="block mb-1">Discount Amount:</label>
              {/* Display the discount amount based on the selected discount type */}
              <p className="p-2 border rounded-md">
                    {discountType === 'fixed' ? `$${discount} off` : `${discount}% off`}
              </p>
            </div>

            {/* Display calculated discount and total price after discount */}
            <p className="text-lg mb-2">Discount: <span className="font-semibold">-${totalDiscount.toFixed(2)}</span></p>
            <p className="text-lg mb-2">Total Price: <span className="font-semibold">${totalPrice.toFixed(2)}</span></p>

            {/* Checkout button */}
            <button
              onClick={handleCheckout}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md mt-4"
            >
              Checkout
            </button>
          </div>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;