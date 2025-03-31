import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@shared/schema';
import ProductCard from '@/components/products/ProductCard';

const Wearables: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // Fetch products
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  // Filter wearables products
  const wearablesProducts = products.filter(
    product => product.category === 'wearables'
  );

  // Get unique brands
  const brands = Array.from(new Set(wearablesProducts.map(product => product.brand)));

  // Brand filter options
  const brandFilterOptions = [
    { value: 'all', label: 'All Brands' },
    ...brands.map(brand => ({ value: brand, label: brand }))
  ];

  // Type filter options
  const typeFilterOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'smartwatch', label: 'Smart Watches' },
    { value: 'fitnesstracker', label: 'Fitness Trackers' },
    { value: 'hearable', label: 'Wireless Earbuds' },
    { value: 'smartglasses', label: 'Smart Glasses' }
  ];

  // Apply filters
  const filteredProducts = wearablesProducts.filter(product => {
    const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;

    // Determine type based on product name/description
    const type = product.name.toLowerCase().includes('watch') || product.description.toLowerCase().includes('watch')
      ? 'smartwatch' 
      : product.name.toLowerCase().includes('band') || product.name.toLowerCase().includes('tracker')
      ? 'fitnesstracker'
      : product.name.toLowerCase().includes('earbuds') || product.name.toLowerCase().includes('headphones')
      ? 'hearable'
      : product.name.toLowerCase().includes('glasses')
      ? 'smartglasses'
      : 'other';

    const matchesType = selectedType === 'all' || type === selectedType;

    return matchesBrand && matchesType;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Wearable Technology</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="w-full md:w-1/2">
          <label className="block text-sm font-medium mb-2">Brand</label>
          <select 
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {brandFilterOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-1/2">
          <label className="block text-sm font-medium mb-2">Device Type</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {typeFilterOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-8">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wearables;