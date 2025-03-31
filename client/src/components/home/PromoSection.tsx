
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

const PromoSection: React.FC = () => {
  return (
    <section className="py-12 bg-primary">
      <div className="container mx-auto px-4">
        <div className="text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Summer Sale - Up to 30% Off</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Get the latest tech products at special prices. Limited time offer, order now!
          </p>
          <Link href="/shop">
            <Button className="inline-block px-6 py-3 bg-white text-primary font-medium rounded-md hover:bg-neutral-100 transition-colors">
              Shop Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
