import React from 'react';
import { Link } from 'wouter';

interface CategoryProps {
  title: string;
  imageSrc: string;
  href: string;
}

const CategoryCard: React.FC<CategoryProps> = ({ title, imageSrc, href }) => {
  return (
    <Link href={href} className="group relative rounded-lg overflow-hidden h-40 shadow-sm hover:shadow-md transition-shadow bg-neutral-100 dark:bg-neutral-800">
      <img 
        src={imageSrc} 
        alt={title} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-4">
        <h3 className="text-white font-semibold text-lg">{title}</h3>
      </div>
    </Link>
  );
};

const FeaturedCategories: React.FC = () => {
  const categories = [
    {
      title: "Smartphones",
      imageSrc: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=300&auto=format&fit=crop",
      href: "/category/phone"
    },
    {
      title: "Laptops",
      imageSrc: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=300&auto=format&fit=crop",
      href: "/category/laptop"
    },
    {
      title: "Audio",
      imageSrc: "https://images.unsplash.com/photo-1600086827875-a63b01f1335c?q=80&w=300&auto=format&fit=crop",
      href: "/category/audio"
    },
    {
      title: "Accessories",
      imageSrc: "https://images.unsplash.com/photo-1588516903720-8ceb67f9ef84?q=80&w=300&auto=format&fit=crop",
      href: "/category/accessories"
    }
  ];

  return (
    <section className="py-12 bg-white dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">Top Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard 
              key={index}
              title={category.title}
              imageSrc={category.imageSrc}
              href={category.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
