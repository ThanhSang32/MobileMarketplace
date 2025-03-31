import React, { useState } from "react";
import { Link } from "wouter";
import { X, ChevronDown } from "@/components/ui/icons";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DropdownItemProps {
  title: string;
  links: { href: string; label: string }[];
}

const DropdownItem: React.FC<DropdownItemProps> = ({ title, links }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button 
        className="flex items-center justify-between w-full py-2 hover:text-primary dark:hover:text-primary transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{title}</span>
        <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`pl-4 ${isOpen ? 'block' : 'hidden'}`}>
        {links.map((link, index) => (
          <Link 
            key={index} 
            href={link.href} 
            className="block py-2 hover:text-primary dark:hover:text-primary"
            onClick={(e) => {
              // Let the click propagate to handle navigation
              setTimeout(() => onClose(), 150);
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const phoneLinks = [
    { href: "/category/phone?brand=Apple", label: "Apple" },
    { href: "/category/phone?brand=Samsung", label: "Samsung" },
    { href: "/category/phone?brand=Google", label: "Google" },
    { href: "/category/phone?brand=Xiaomi", label: "Xiaomi" },
  ];

  const laptopLinks = [
    { href: "/category/laptop?brand=Apple", label: "Apple" },
    { href: "/category/laptop?brand=Dell", label: "Dell" },
    { href: "/category/laptop?brand=HP", label: "HP" },
    { href: "/category/laptop?brand=Lenovo", label: "Lenovo" },
  ];

  return (
    <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50">
      <div className="absolute right-0 top-0 h-full w-64 bg-white dark:bg-neutral-900 shadow-lg transform transition-transform duration-300 translate-x-0">
        <div className="p-4 flex justify-between items-center border-b dark:border-neutral-800">
          <h2 className="font-semibold text-lg">Menu</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-secondary dark:hover:bg-neutral-800"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="p-4">
          <DropdownItem title="Phones" links={phoneLinks} />
          <DropdownItem title="Laptops" links={laptopLinks} />
          
          <Link 
            href="/category/accessories" 
            className="block font-medium py-2 mb-4 hover:text-primary dark:hover:text-primary transition-colors"
            onClick={onClose}
          >
            Accessories
          </Link>
          <Link 
            href="/deals" 
            className="block font-medium py-2 mb-4 hover:text-primary dark:hover:text-primary transition-colors"
            onClick={onClose}
          >
            Deals
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default MobileNav;
