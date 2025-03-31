import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { ArrowRight } from '@/components/ui/icons';

import HeroSection from '@/components/home/HeroSection';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import PromoSection from '@/components/home/PromoSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilter from '@/components/products/ProductFilter';
import { Product } from '@shared/schema';

const Home: React.FC = () => {
  const [phoneFilter, setPhoneFilter] = React.useState('all');
  const [laptopFilter, setLaptopFilter] = React.useState('all');

  // Fetch all products
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  // Filter products by category
  const phones = products.filter(product => product.category === 'phone');
  const laptops = products.filter(product => product.category === 'laptop');

  // Filter by brand if specific brand is selected
  const filteredPhones = phoneFilter === 'all' 
    ? phones 
    : phones.filter(product => product.brand.toLowerCase() === phoneFilter.toLowerCase());

  const filteredLaptops = laptopFilter === 'all'
    ? laptops
    : laptops.filter(product => product.brand.toLowerCase() === laptopFilter.toLowerCase());

  const phoneFilterOptions = [
    { value: 'all', label: 'All Phones' },
    { value: 'Apple', label: 'Apple' },
    { value: 'Samsung', label: 'Samsung' },
    { value: 'Google', label: 'Google' },
    { value: 'Xiaomi', label: 'Xiaomi' }
  ];

  const laptopFilterOptions = [
    { value: 'all', label: 'All Laptops' },
    { value: 'Apple', label: 'Apple' },
    { value: 'Dell', label: 'Dell' },
    { value: 'HP', label: 'HP' },
    { value: 'Lenovo', label: 'Lenovo' }
  ];

  return (
    <>
      <HeroSection />
      <FeaturedCategories />
      
      {/* Phones Section */}
      <section id="phones" className="py-12 bg-neutral-50 dark:bg-neutral-900/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Phones</h2>
            <Link href="/category/phone" className="text-primary hover:underline flex items-center">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          <ProductFilter 
            options={phoneFilterOptions}
            selectedOption={phoneFilter}
            onChange={setPhoneFilter}
          />
          
          <ProductGrid products={filteredPhones} isLoading={isLoading} />
        </div>
      </section>
      
      <PromoSection />
      
      {/* Laptops Section */}
      <section id="laptops" className="py-12 bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Laptops</h2>
            <Link href="/category/laptop" className="text-primary hover:underline flex items-center">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          <ProductFilter 
            options={laptopFilterOptions}
            selectedOption={laptopFilter}
            onChange={setLaptopFilter}
          />
          
          <ProductGrid products={filteredLaptops} isLoading={isLoading} />
        </div>
      </section>
      
      <FeaturesSection />
      <NewsletterSection />
    </>
  );
};

export default Home;
