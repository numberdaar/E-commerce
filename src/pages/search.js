import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../utils/api';

export default function SearchPage({ cart, updateCart }) {
  const router = useRouter();
  const { query } = router.query; // Get the search term from the URL
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getFilteredProducts = async () => {
      const allProducts = await fetchProducts();
      const searchResults = allProducts.filter((product) =>
        product.title.toLowerCase().includes(query?.toLowerCase())
      );
      setFilteredProducts(searchResults);
    };
    if (query) {
      getFilteredProducts();
    }
  }, [query]);

  return (
    <div className="container mx-auto p-4 mt-16">
      <h1 className="text-2xl font-bold mb-6">Search Results for: "{query}"</h1>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={(p) => updateCart([...cart, p])}
            />
          ))}
        </div>
      ) : (
        <p>No products found for your search query.</p>
      )}
    </div>
  );
}
