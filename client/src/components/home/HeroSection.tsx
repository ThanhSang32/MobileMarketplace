import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-secondary dark:bg-neutral-800 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              The Latest Tech at the Best Prices
            </h1>
            <p className="text-neutral-600 dark:text-neutral-300 text-lg mb-6">
              Discover our collection of premium phones and laptops. Fast shipping and unbeatable deals.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/category/phone">
                <Button className="px-6 py-6 bg-primary hover:bg-primary/90 text-white font-medium rounded-md transition-colors">
                  Shop Phones
                </Button>
              </Link>
              <Link href="/category/laptop">
                <Button variant="outline" className="px-6 py-6 bg-white dark:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 text-neutral-800 dark:text-white font-medium rounded-md transition-colors shadow-sm">
                  Shop Laptops
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?q=80&w=800&auto=format&fit=crop" 
              alt="Featured products" 
              className="rounded-lg shadow-md object-cover w-full h-auto max-h-[400px]" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
