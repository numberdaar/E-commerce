import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import '../styles/global.css';
import { CartProvider } from '../context/cartContext';

function MyApp({ Component, pageProps }) {

  return (
    <>
    <CartProvider>

      <Navbar />
      <Component
        {...pageProps}
       
        />
      <ToastContainer />
      </CartProvider>
    </>
  );
}

export default MyApp;
