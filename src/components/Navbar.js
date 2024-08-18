import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/cartContext';

// Navbar component displaying logo, navigation links, and cart information
const Navbar = () => {
  // Access cart data using the useCart hook
  const { cart } = useCart();

  return (
    <header className="bg-gray-800 text-white p-4 fixed w-full top-0 left-0 z-10 flex justify-between items-center">
      {/* Logo and App Name */}
      <Link href="/" passHref>
        <div className="flex items-center cursor-pointer">
          {/* Logo image */}
          <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
            <Image 
              src="/logo.png" 
              alt="New Dukaan Logo" 
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
          <h1 className="text-xl font-bold">New Dukaan</h1>
        </div>
      </Link>

      <div className="flex items-center space-x-4">
        {/* Home button */}
        <Link href="/" passHref>
          <div className="relative cursor-pointer flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9.5l9-7 9 7v9a2 2 0 01-2 2h-5a2 2 0 01-2-2v-5H7v5a2 2 0 01-2 2H4a2 2 0 01-2-2v-9z" />
            </svg>
            <span className="ml-1">Home</span>
          </div>
        </Link>

        {/* Cart icon with item count */}
        <Link href="/cart" passHref>
          <div className="relative cursor-pointer flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18l-2 13H5L3 3z" />
              <circle cx="9" cy="20" r="1" />
              <circle cx="17" cy="20" r="1" />
            </svg>
            {/* Display the cart count */}
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;