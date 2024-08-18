import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '../context/cartContext';

const Cart = () => {
  const { cart, removeItem, updateQuantity } = useCart();
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState('fixed');

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const applyDiscount = () => {
    if (discountType === 'fixed') {
      return discount;
    } else if (discountType === 'percentage') {
      return (discount / 100) * subtotal;
    }
    return 0;
  };

  const totalDiscount = applyDiscount();
  const totalPrice = subtotal - totalDiscount;

  const handleCheckout = () => {
    alert('Checkout successful!');
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>

      {cart.length > 0 ? (
        <>
          <div className="mb-8">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b py-4">
                <div className="relative w-20 h-20">
                  <Image
                    src={item.image}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded"
                  />
                </div>
                <div className="flex-grow ml-4">
                  <h3 className="text-lg">{item.title}</h3>
                  <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
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

          <div className="border p-4 rounded-md bg-gray-50 shadow-md">
            <h3 className="text-xl font-bold mb-4">Cart Summary</h3>
            <p className="text-lg mb-2">Subtotal: <span className="font-semibold">${subtotal.toFixed(2)}</span></p>

            <div className="mb-4">
              <label htmlFor="discountType" className="block mb-1">Discount Type:</label>
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
              <input
                type="number"
                id="discountAmount"
                value={discount}
                onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                className="p-2 border rounded-md"
                placeholder="Enter discount"
              />
            </div>

            <p className="text-lg mb-2">Discount: <span className="font-semibold">-${totalDiscount.toFixed(2)}</span></p>
            <p className="text-lg mb-2">Total Price: <span className="font-semibold">${totalPrice.toFixed(2)}</span></p>

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
