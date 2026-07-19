'use client';

import React, { useEffect, useState } from 'react';
import { getProducts } from '@/lib/woocommerce';
import { Product } from '@/lib/mockData';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  categorySlug: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ categorySlug }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(6);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        // Map category names if needed
        const currentSlug = categorySlug === 'all' ? undefined : categorySlug;
        const fetchedProducts = await getProducts(currentSlug, limit);
        
        // Filter locally if mock data is used (since mockData doesn't filter by category on server side)
        let filtered = fetchedProducts;
        if (categorySlug !== 'all') {
          filtered = fetchedProducts.filter(p => {
            const name = p.name.toLowerCase();
            const desc = p.shortDescription.toLowerCase();
            if (categorySlug === 't-shirts') return name.includes('tee') || name.includes('t-shirt');
            if (categorySlug === 'hoodies') return name.includes('hoodie') || name.includes('sweatshirt');
            if (categorySlug === 'jackets') return name.includes('jacket');
            if (categorySlug === 'accessories') return name.includes('bag') || name.includes('cap');
            if (categorySlug === 'limited') return p.onSale || p.isNew;
            return true;
          });
        }
        setProducts(filtered);
      } catch (err) {
        console.error('Failed to load products in grid:', err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [categorySlug, limit]);

  const handleLoadMore = () => {
    setLimit((prev) => prev + 3);
  };

  return (
    <section className="py-6" id="products">
      <div className="container mx-auto px-6">
        <div className="text-center mb-6">
          <h2 className="text-5xl md:text-6xl font-black mb-4 orbitron">
            <span className="neon-cyan">FEATURED</span> DROPS
          </h2>
          <p className="text-gray-400 text-lg">Handpicked pieces from our latest collection</p>
        </div>
        
        {loading && products.length === 0 ? (
          /* High-tech skeleton loader */
          <div className="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 space-y-4 animate-pulse">
                <div className="bg-zinc-800 h-96 rounded-xl w-full"></div>
                <div className="h-6 bg-zinc-800 rounded w-2/3"></div>
                <div className="h-4 bg-zinc-800 rounded w-1/2"></div>
                <div className="flex justify-between items-center pt-4">
                  <div className="h-8 bg-zinc-800 rounded w-1/4"></div>
                  <div className="h-6 bg-zinc-800 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/30 rounded-3xl border border-zinc-800/50">
            <i className="fas fa-box-open text-5xl text-gray-600 mb-4 block"></i>
            <h3 className="text-xl font-bold text-gray-400">No drops found in this category</h3>
            <p className="text-gray-600 mt-2">Check back soon for new streetwear drops.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        
        {products.length > 0 && (
          <div className="text-center mt-6">
            <button 
              onClick={handleLoadMore}
              disabled={loading}
              className="cta-button px-10 py-4 rounded-full text-white font-bold text-lg orbitron cursor-pointer disabled:opacity-50 flex items-center justify-center mx-auto"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <i className="fas fa-spinner animate-spin"></i>
                  LOADING...
                </span>
              ) : (
                'LOAD MORE PRODUCTS'
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
export default ProductGrid;
