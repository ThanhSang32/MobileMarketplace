import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useLocation } from 'wouter';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilter from '@/components/products/ProductFilter';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

const Shop: React.FC = () => {
  const [location, setLocation] = useLocation();
  const [category, setCategory] = useState<string>('all');
  const [brand, setBrand] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Fetch all products
  const { data: products, isLoading } = useQuery({
    queryKey: ['/api/products'],
    refetchOnWindowFocus: false,
  });

  // Filter products based on selected filters
  const filteredProducts = React.useMemo(() => {
    if (!products) return [];

    let filtered = [...products];

    // Apply category filter
    if (category !== 'all') {
      filtered = filtered.filter(product => product.category === category);
    }

    // Apply brand filter
    if (brand !== 'all') {
      filtered = filtered.filter(product => product.brand === brand);
    }

    // Apply price range filter
    if (priceRange !== 'all') {
      switch (priceRange) {
        case 'under-500':
          filtered = filtered.filter(product => product.price < 500);
          break;
        case '500-1000':
          filtered = filtered.filter(product => product.price >= 500 && product.price <= 1000);
          break;
        case 'over-1000':
          filtered = filtered.filter(product => product.price > 1000);
          break;
      }
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        product => 
          product.name.toLowerCase().includes(term) || 
          product.description.toLowerCase().includes(term) ||
          product.brand.toLowerCase().includes(term)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered = filtered.filter(product => product.isNew).concat(
          filtered.filter(product => !product.isNew)
        );
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      // Default is featured, no explicit sorting needed
    }

    return filtered;
  }, [products, category, brand, priceRange, sortBy, searchTerm]);

  // Extract unique brands for the brand filter
  const availableBrands = React.useMemo(() => {
    if (!products) return [];
    const brands = new Set(products.map(product => product.brand));
    return ['all', ...Array.from(brands)];
  }, [products]);

  const clearFilters = () => {
    setCategory('all');
    setBrand('all');
    setPriceRange('all');
    setSortBy('featured');
    setSearchTerm('');
  };

  const activeCategoryStyle = "bg-primary text-primary-foreground";
  
  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Shop</h1>
        <p className="text-muted-foreground">Browse all our products</p>
      </div>
      
      {/* Search and Sort Controls */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search products..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium">Sort by:</span>
          <ProductFilter
            title="Sort"
            options={[
              { value: 'featured', label: 'Featured' },
              { value: 'price-low', label: 'Price: Low to High' },
              { value: 'price-high', label: 'Price: High to Low' },
              { value: 'newest', label: 'Newest' },
              { value: 'rating', label: 'Top Rated' },
            ]}
            selectedOption={sortBy}
            onChange={setSortBy}
          />
          
          {(category !== 'all' || brand !== 'all' || priceRange !== 'all' || searchTerm) && (
            <Button variant="ghost" onClick={clearFilters} className="ml-2">
              Clear filters
            </Button>
          )}
        </div>
      </div>
      
      {/* Category Buttons */}
      <div className="flex overflow-x-auto pb-3 mb-6 no-scrollbar">
        <div className="flex space-x-2">
          <Button 
            variant="outline"
            size="sm"
            className={cn(category === 'all' && activeCategoryStyle)}
            onClick={() => setCategory('all')}
          >
            All
          </Button>
          <Button 
            variant="outline"
            size="sm"
            className={cn(category === 'phone' && activeCategoryStyle)} 
            onClick={() => setCategory('phone')}
          >
            Phones
          </Button>
          <Button 
            variant="outline"
            size="sm"
            className={cn(category === 'laptop' && activeCategoryStyle)} 
            onClick={() => setCategory('laptop')}
          >
            Laptops
          </Button>
          <Button 
            variant="outline"
            size="sm"
            onClick={() => setLocation('/accessories')}
          >
            Accessories
          </Button>
          <Button 
            variant="outline"
            size="sm"
            onClick={() => setLocation('/wearables')}
          >
            Wearables
          </Button>
          <Button 
            variant="outline"
            size="sm"
            onClick={() => setLocation('/refurbished')}
          >
            Refurbished
          </Button>
        </div>
      </div>
      
      {/* Active Filters */}
      {(category !== 'all' || brand !== 'all' || priceRange !== 'all' || searchTerm) && (
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-sm font-medium pt-1">Active filters:</span>
          
          {category !== 'all' && (
            <Badge variant="outline" className="flex items-center gap-1">
              Category: {category}
              <button onClick={() => setCategory('all')} className="ml-1">&times;</button>
            </Badge>
          )}
          
          {brand !== 'all' && (
            <Badge variant="outline" className="flex items-center gap-1">
              Brand: {brand}
              <button onClick={() => setBrand('all')} className="ml-1">&times;</button>
            </Badge>
          )}
          
          {priceRange !== 'all' && (
            <Badge variant="outline" className="flex items-center gap-1">
              Price: {priceRange === 'under-500' ? 'Under $500' : 
                     priceRange === '500-1000' ? '$500 - $1000' : 
                     'Over $1000'}
              <button onClick={() => setPriceRange('all')} className="ml-1">&times;</button>
            </Badge>
          )}
          
          {searchTerm && (
            <Badge variant="outline" className="flex items-center gap-1">
              Search: {searchTerm}
              <button onClick={() => setSearchTerm('')} className="ml-1">&times;</button>
            </Badge>
          )}
        </div>
      )}
      
      {/* Main Content Area */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="hidden md:block space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Brands</h3>
            <div className="space-y-2">
              {availableBrands.map((brandName) => (
                <div 
                  key={brandName} 
                  className={cn(
                    "px-3 py-2 rounded-md text-sm cursor-pointer",
                    brand === brandName ? "bg-primary/10 font-medium" : "hover:bg-primary/5"
                  )}
                  onClick={() => setBrand(brandName)}
                >
                  {brandName === 'all' ? 'All Brands' : brandName}
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-semibold mb-3">Price Range</h3>
            <div className="space-y-2">
              <div 
                className={cn(
                  "px-3 py-2 rounded-md text-sm cursor-pointer",
                  priceRange === 'all' ? "bg-primary/10 font-medium" : "hover:bg-primary/5"
                )}
                onClick={() => setPriceRange('all')}
              >
                All Prices
              </div>
              <div 
                className={cn(
                  "px-3 py-2 rounded-md text-sm cursor-pointer",
                  priceRange === 'under-500' ? "bg-primary/10 font-medium" : "hover:bg-primary/5"
                )}
                onClick={() => setPriceRange('under-500')}
              >
                Under $500
              </div>
              <div 
                className={cn(
                  "px-3 py-2 rounded-md text-sm cursor-pointer",
                  priceRange === '500-1000' ? "bg-primary/10 font-medium" : "hover:bg-primary/5"
                )}
                onClick={() => setPriceRange('500-1000')}
              >
                $500 - $1000
              </div>
              <div 
                className={cn(
                  "px-3 py-2 rounded-md text-sm cursor-pointer",
                  priceRange === 'over-1000' ? "bg-primary/10 font-medium" : "hover:bg-primary/5"
                )}
                onClick={() => setPriceRange('over-1000')}
              >
                Over $1000
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Grid */}
        <div className="md:col-span-3">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-muted-foreground">{filteredProducts.length} products</p>
          </div>
          
          <ProductGrid products={filteredProducts} isLoading={isLoading} />
          
          {filteredProducts.length === 0 && !isLoading && (
            <div className="flex flex-col items-center justify-center py-12">
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground text-center mb-4">
                Try changing your filters or search term
              </p>
              <Button onClick={clearFilters}>Clear all filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;