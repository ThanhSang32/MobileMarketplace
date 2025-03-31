import React from 'react';
import { Truck, Shield, RefreshCcw, Headphones } from '@/components/ui/icons';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-sm">
      <div className="text-primary text-3xl mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-neutral-600 dark:text-neutral-400">{description}</p>
    </div>
  );
};

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Fast Shipping",
      description: "Free delivery on orders over $50. Same-day shipping on orders placed before 2 PM."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure Payments",
      description: "All transactions are secure and encrypted. We accept all major credit cards."
    },
    {
      icon: <RefreshCcw className="h-8 w-8" />,
      title: "Easy Returns",
      description: "30-day return policy. No questions asked, easy returns and exchanges."
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: "24/7 Support",
      description: "Our customer service team is available around the clock to help you."
    }
  ];

  return (
    <section className="py-12 bg-neutral-50 dark:bg-neutral-900/30">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">Why Shop With Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
