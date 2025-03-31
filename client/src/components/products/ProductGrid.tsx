import React from 'react';
import { Product } from '@shared/schema';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, isLoading = false }) => {
  if (isLoading) {
    // Show loading skeletons
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-sm animate-pulse">
            <div className="w-full h-48 bg-neutral-200 dark:bg-neutral-700"></div>
            <div className="p-4">
              <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded mb-2"></div>
              <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded mb-2 w-3/4"></div>
              <div className="flex justify-between items-center mt-4">
                <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-1/3"></div>
                <div className="h-8 w-8 bg-neutral-200 dark:bg-neutral-700 rounded-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-neutral-600 dark:text-neutral-400">No products found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;