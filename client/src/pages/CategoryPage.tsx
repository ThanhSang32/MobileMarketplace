import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilter from '@/components/products/ProductFilter';
import { Button } from '@/components/ui/button';
import { Product } from '@shared/schema';

const CategoryPage: React.FC = () => {
  const { category } = useParams();
  const [location] = useLocation();
  const [selectedBrand, setSelectedBrand] = useState('all');
  
  // Parse query params for brand filter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const brand = urlParams.get('brand');
    if (brand) {
      setSelectedBrand(brand);
    } else {
      setSelectedBrand('all');
    }
  }, [location]);
  
  // Get category title
  const getCategoryTitle = () => {
    switch (category) {
      case 'phone':
        return 'Smartphones';
      case 'laptop':
        return 'Laptops';
      case 'accessories':
        return 'Accessories';
      default:
        return 'Products';
    }
  };
  
  // Fetch products
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });
  
  // Filter products by category
  const categoryProducts = products.filter(
    product => product.category === category
  );
  
  // Filter by brand if selected
  const filteredProducts = selectedBrand === 'all' 
    ? categoryProducts 
    : categoryProducts.filter(product => product.brand === selectedBrand);
  
  // Generate filter options based on category
  const getFilterOptions = () => {
    const brands = new Set(categoryProducts.map(product => product.brand));
    
    const options = [{ value: 'all', label: `All ${getCategoryTitle()}` }];
    
    brands.forEach(brand => {
      options.push({ value: brand, label: brand });
    });
    
    return options;
  };
  
  const filterOptions = getFilterOptions();

  // Handle filter change
  const handleFilterChange = (value: string) => {
    setSelectedBrand(value);
  };

  return (
    <div className="bg-white dark:bg-neutral-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{getCategoryTitle()}</h1>
          <p className="text-neutral-600 dark:text-neutral-300">
            Browse our selection of high-quality {getCategoryTitle().toLowerCase()}. 
            Find the perfect device that suits your needs and budget.
          </p>
        </div>
        
        {/* Filters */}
        <ProductFilter 
          options={filterOptions}
          selectedOption={selectedBrand}
          onChange={handleFilterChange}
          title="Filter by Brand"
        />
        
        {/* Product grid */}
        <ProductGrid products={filteredProducts} isLoading={isLoading} />
        
        {/* No results */}
        {!isLoading && filteredProducts.length === 0 && (
          <div className="py-12 text-center">
            <h3 className="text-xl font-semibold mb-4">No products found</h3>
            <p className="text-neutral-600 dark:text-neutral-300 mb-6">
              We couldn't find any products matching your criteria.
            </p>
            <Button onClick={() => setSelectedBrand('all')}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
