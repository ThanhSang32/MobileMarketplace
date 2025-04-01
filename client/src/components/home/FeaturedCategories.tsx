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
      imageSrc: "/images/category-phones.jpg",
      href: "/category/phone"
    },
    {
      title: "Laptops",
      imageSrc: "/images/category-laptops.jpg", 
      href: "/category/laptop"
    },
    {
      title: "Audio",
      imageSrc: "/images/category-audio.jpg",
      href: "/category/audio"
    },
    {
      title: "Accessories", 
      imageSrc: "/images/category-accessories.jpg",
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
