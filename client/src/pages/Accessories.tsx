import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilter from '@/components/products/ProductFilter';
import { Separator } from '@/components/ui/separator';
import { Product } from '@shared/schema';

const Accessories: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // Fetch products
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  // Filter accessories products
  const accessoriesProducts = products.filter(
    product => product.category === 'accessories'
  );

  // Get unique brands
  const brands = Array.from(new Set(accessoriesProducts.map(product => product.brand)));

  // Define valid accessory types
  type AccessoryType = 'audio' | 'cases' | 'charging' | 'cables' | 'other';

  // Get accessory types from products
  const types = Array.from(new Set(accessoriesProducts.map(product => {
    const type: AccessoryType = product.name.includes('Headphones') || product.name.includes('Earbuds') 
      ? 'audio' 
      : product.name.includes('Case') || product.name.includes('Cover')
      ? 'cases'
      : product.name.includes('Charger') || product.name.includes('Power')
      ? 'charging'
      : product.name.includes('Cable') || product.name.includes('Adapter')
      ? 'cables'
      : 'other';
    return type;
  })));

  // Brand filter options
  const brandFilterOptions = [
    { value: 'all', label: 'All Brands' },
    ...brands.map(brand => ({ value: brand, label: brand }))
  ];

  // Type filter options
  const typeFilterOptions = [
    { value: 'all', label: 'All Accessories' },
    { value: 'audio', label: 'Audio' },
    { value: 'cases', label: 'Cases & Covers' },
    { value: 'charging', label: 'Charging & Battery' },
    { value: 'cables', label: 'Cables & Adapters' },
    { value: 'other', label: 'Other' }
  ].filter(option => option.value === 'all' || types.includes(option.value as AccessoryType));

  // Apply filters
  const filteredProducts = accessoriesProducts.filter(product => {
    const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;

    const type: AccessoryType = product.name.includes('Headphones') || product.name.includes('Earbuds') 
      ? 'audio' 
      : product.name.includes('Case') || product.name.includes('Cover')
      ? 'cases'
      : product.name.includes('Charger') || product.name.includes('Power')
      ? 'charging'
      : product.name.includes('Cable') || product.name.includes('Adapter')
      ? 'cables'
      : 'other';

    const matchesType = selectedType === 'all' || type === selectedType;

    return matchesBrand && matchesType;
  });

  // Handle filter changes
  const handleBrandFilterChange = (value: string) => {
    setSelectedBrand(value);
  };

  const handleTypeFilterChange = (value: string) => {
    setSelectedType(value);
  };

  return (
    <div className="bg-white dark:bg-neutral-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Tech Accessories</h1>
        <p className="text-neutral-600 dark:text-neutral-300 mb-8">
          Explore our high-quality accessory collection for phones, laptops, and other tech devices.
          From headphones and cases to power banks - all with official warranties.
        </p>

        <Separator className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with filters */}
          <div className="lg:col-span-1">
            <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Filters</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="font-medium mb-4">Accessory Type</h3>
                  <ProductFilter 
                    options={typeFilterOptions}
                    selectedOption={selectedType}
                    onChange={handleTypeFilterChange}
                  />
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-4">Brand</h3>
                  <ProductFilter 
                    options={brandFilterOptions}
                    selectedOption={selectedBrand}
                    onChange={handleBrandFilterChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            {/* Display number of results */}
            <div className="mb-6">
              <p className="text-neutral-600 dark:text-neutral-400">
                Showing {filteredProducts.length} products
              </p>
            </div>

            {/* Products grid */}
            <ProductGrid products={filteredProducts} isLoading={isLoading} />

            {/* No results message */}
            {!isLoading && filteredProducts.length === 0 && (
              <div className="py-12 text-center">
                <h3 className="text-xl font-semibold mb-4">No products found</h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-6">
                  No products match your selected filters.
                </p>
                <button 
                  onClick={() => {
                    setSelectedBrand('all');
                    setSelectedType('all');
                  }}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Popular accessories */}
        {filteredProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Popular Accessories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {accessoriesProducts
                .filter(product => product.rating >= 4.5)
                .slice(0, 3)
                .map(product => (
                  <div key={product.id} className="bg-neutral-50 dark:bg-neutral-800 rounded-lg overflow-hidden flex">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-1/3 object-cover" 
                    />
                    <div className="p-4">
                      <h3 className="font-medium mb-2">{product.name}</h3>
                      <p className="text-primary font-semibold">${product.price.toFixed(2)}</p>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                        ★ {product.rating} ({product.reviews} reviews)
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Info section */}
        <div className="mt-16 bg-neutral-50 dark:bg-neutral-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Why Choose SangStore Accessories?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="bg-primary/10 rounded-full h-12 w-12 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">100% Authentic Products</h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                All accessories at SangStore are authentic, with complete labels and warranties according to manufacturer standards.
              </p>
            </div>

            <div>
              <div className="bg-primary/10 rounded-full h-12 w-12 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">30-Day Return Policy</h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                If the product is faulty or does not meet your needs, you can return it within 30 days of purchase.
              </p>
            </div>

            <div>
              <div className="bg-primary/10 rounded-full h-12 w-12 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Perfect Compatibility</h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                SangStore accessories are rigorously tested to ensure optimal compatibility with your devices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accessories;