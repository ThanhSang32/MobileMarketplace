import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilter from '@/components/products/ProductFilter';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Product } from '@shared/schema';

const Refurbished: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');

  // Fetch products
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  // In a real app, we'd filter by refurbished property, but here we'll simulate it
  // by considering certain products as refurbished (for demo purposes)
  const refurbishedProducts = products.filter(
    product => product.id % 3 === 0 // Just a simulation, in real app we'd have a refurbished flag
  ).map(product => ({
    ...product,
    price: Number((product.price * 0.7).toFixed(2)) // Refurbished products are 30% cheaper
  }));

  // Get unique categories
  const categories = Array.from(new Set(refurbishedProducts.map(product => product.category)));

  // Get unique brands
  const brands = Array.from(new Set(refurbishedProducts.map(product => product.brand)));

  // Category filter options
  const categoryFilterOptions = [
    { value: 'all', label: 'All Categories' },
    ...categories.map(category => ({ 
      value: category, 
      label: category === 'phones' 
        ? 'Phones' 
        : category === 'laptops' 
        ? 'Laptops'
        : category === 'tablets'
        ? 'Tablets'
        : category === 'accessories'
        ? 'Accessories'
        : category
    }))
  ];

  // Brand filter options
  const brandFilterOptions = [
    { value: 'all', label: 'All Brands' },
    ...brands.map(brand => ({ value: brand, label: brand }))
  ];

  // Apply filters
  const filteredProducts = refurbishedProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;

    return matchesCategory && matchesBrand;
  });

  // Handle filter changes
  const handleCategoryFilterChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleBrandFilterChange = (value: string) => {
    setSelectedBrand(value);
  };

  return (
    <div className="bg-white dark:bg-neutral-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-3xl font-bold">Refurbished Products</h1>
            <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-300 dark:border-green-700">
              Save up to 30%
            </Badge>
          </div>
          <p className="text-neutral-600 dark:text-neutral-300 mb-8 max-w-3xl">
            Discover professionally inspected, repaired, and refurbished pre-owned products.  All refurbished products undergo a rigorous quality assurance process and come with a warranty.
          </p>
        </div>

        {/* Refurbished info banner */}
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-primary">Benefits of Refurbished Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="bg-white dark:bg-neutral-800 h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium mb-1">Cost Savings</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  20-30% lower price compared to new models
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-white dark:bg-neutral-800 h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium mb-1">12-Month Warranty</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  Fully warranted like a new product
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-white dark:bg-neutral-800 h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium mb-1">Environmentally Friendly</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  Reduces electronic waste and helps protect the environment
                </p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with filters */}
          <div className="lg:col-span-1">
            <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Filters</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="font-medium mb-4">Category</h3>
                  <ProductFilter 
                    options={categoryFilterOptions}
                    selectedOption={selectedCategory}
                    onChange={handleCategoryFilterChange}
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

                <Separator />

                <div>
                  <h3 className="font-medium mb-4">Condition</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
                      <span>Like New (Lightly Used)</span>
                    </div>
                    <div className="flex items-center">
                      <span className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></span>
                      <span>Good (Minor Scratches)</span>
                    </div>
                    <div className="flex items-center">
                      <span className="h-3 w-3 rounded-full bg-orange-500 mr-2"></span>
                      <span>Fair (Shows Signs of Use)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            {/* Info message */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <svg className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm">
                  Each refurbished product is assessed according to strict quality standards, including battery, screen, camera, and other components.  Product condition is shown in detail on each product page.
                </p>
              </div>
            </div>

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
                <h3 className="text-xl font-semibold mb-4">No Products Found</h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-6">
                  No products match the selected filters.
                </p>
                <button 
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedBrand('all');
                  }}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Refurbished process */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Refurbishment Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg relative">
              <div className="absolute -top-3 -left-3 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold">
                1
              </div>
              <h3 className="font-semibold mb-3 mt-2">Acquisition & Inspection</h3>
              <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                We acquire pre-owned devices and perform a thorough inspection of all functions.
              </p>
            </div>

            <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg relative">
              <div className="absolute -top-3 -left-3 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold">
                2
              </div>
              <h3 className="font-semibold mb-3 mt-2">Cleaning & Sanitization</h3>
              <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                Devices are thoroughly cleaned, sanitized, and refreshed to remove dirt and bacteria.
              </p>
            </div>

            <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg relative">
              <div className="absolute -top-3 -left-3 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold">
                3
              </div>
              <h3 className="font-semibold mb-3 mt-2">Repair & Replacement</h3>
              <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                Faulty components are replaced with genuine parts, ensuring like-new operation.
              </p>
            </div>

            <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg relative">
              <div className="absolute -top-3 -left-3 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold">
                4
              </div>
              <h3 className="font-semibold mb-3 mt-2">Quality Assurance & Grading</h3>
              <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                Products undergo over 30 tests and are graded by condition: Like New, Good, or Fair.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ section */}
        <div className="mt-16 bg-neutral-50 dark:bg-neutral-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Are refurbished products safe?</h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                Absolutely safe. Each product is thoroughly inspected, repaired, and sanitized by professional technicians. We only sell products that meet the highest quality standards.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">What is the warranty policy for refurbished products?</h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                All refurbished products are covered by a 12-month warranty, just like new products.  If any problems arise during the warranty period, we will repair or replace the product free of charge.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Will the battery of a refurbished product be worn out?</h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                We carefully check the battery condition of each product. For devices with a battery below 85% of its design capacity, we replace the battery with a new one.  Battery capacity information is always shown in detail in the product description.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Refurbished;