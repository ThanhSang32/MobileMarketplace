import React, { useState } from "react";
import { Link } from "wouter";
import { 
  ShoppingCart, 
  Search, 
  Moon, 
  Sun, 
  User, 
  Menu, 
  ChevronDown 
} from "@/components/ui/icons";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  toggleMobileNav: () => void;
  toggleCart: () => void;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  toggleMobileNav, 
  toggleCart, 
  toggleDarkMode,
  isDarkMode
}) => {
  const { cart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-neutral-900 shadow-sm dark:shadow-neutral-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-primary dark:text-white text-2xl font-bold">TechStore</span>
          </Link>
          
          {/* Navigation - Desktop */}
          <nav className="hidden md:flex space-x-8">
            <div className="relative group">
              <Link href="/category/phone" className="flex items-center font-medium py-2 hover:text-primary dark:hover:text-primary transition-colors">
                Phones
                <ChevronDown className="h-4 w-4 ml-1" />
              </Link>
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-md shadow-lg p-2 hidden group-hover:block">
                <Link href="/category/phone?brand=Apple" className="block px-4 py-2 text-sm hover:bg-secondary dark:hover:bg-neutral-700 rounded-md">Apple</Link>
                <Link href="/category/phone?brand=Samsung" className="block px-4 py-2 text-sm hover:bg-secondary dark:hover:bg-neutral-700 rounded-md">Samsung</Link>
                <Link href="/category/phone?brand=Google" className="block px-4 py-2 text-sm hover:bg-secondary dark:hover:bg-neutral-700 rounded-md">Google</Link>
                <Link href="/category/phone?brand=Xiaomi" className="block px-4 py-2 text-sm hover:bg-secondary dark:hover:bg-neutral-700 rounded-md">Xiaomi</Link>
              </div>
            </div>
            <div className="relative group">
              <Link href="/category/laptop" className="flex items-center font-medium py-2 hover:text-primary dark:hover:text-primary transition-colors">
                Laptops
                <ChevronDown className="h-4 w-4 ml-1" />
              </Link>
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-md shadow-lg p-2 hidden group-hover:block">
                <Link href="/category/laptop?brand=Apple" className="block px-4 py-2 text-sm hover:bg-secondary dark:hover:bg-neutral-700 rounded-md">Apple</Link>
                <Link href="/category/laptop?brand=Dell" className="block px-4 py-2 text-sm hover:bg-secondary dark:hover:bg-neutral-700 rounded-md">Dell</Link>
                <Link href="/category/laptop?brand=HP" className="block px-4 py-2 text-sm hover:bg-secondary dark:hover:bg-neutral-700 rounded-md">HP</Link>
                <Link href="/category/laptop?brand=Lenovo" className="block px-4 py-2 text-sm hover:bg-secondary dark:hover:bg-neutral-700 rounded-md">Lenovo</Link>
              </div>
            </div>
            <Link href="/category/accessories" className="font-medium py-2 hover:text-primary dark:hover:text-primary transition-colors">Accessories</Link>
            <Link href="/deals" className="font-medium py-2 hover:text-primary dark:hover:text-primary transition-colors">Deals</Link>
          </nav>
          
          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:flex items-center relative">
              <form onSubmit={handleSearch}>
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="w-40 lg:w-64 pl-3 pr-10 py-1.5 rounded-md bg-secondary dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="absolute right-3 text-neutral-500 dark:text-neutral-400">
                  <Search className="h-4 w-4" />
                </button>
              </form>
            </div>
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-secondary dark:hover:bg-neutral-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            
            {/* User Account */}
            <Link href="/account" className="p-2 rounded-full hover:bg-secondary dark:hover:bg-neutral-800 transition-colors">
              <User className="h-5 w-5" />
            </Link>
            
            {/* Cart */}
            <button 
              onClick={toggleCart}
              className="p-2 rounded-full hover:bg-secondary dark:hover:bg-neutral-800 relative"
              aria-label="Open cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cart && cart.itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-[#ff4500] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.itemCount}
                </Badge>
              )}
            </button>
            
            {/* Mobile Menu Toggle */}
            <button 
              onClick={toggleMobileNav}
              className="md:hidden p-2 rounded-full hover:bg-secondary dark:hover:bg-neutral-800"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Mobile Search - Shown on small screens */}
        <div className="md:hidden py-2 pb-3">
          <form onSubmit={handleSearch} className="flex items-center relative">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full pl-3 pr-10 py-2 rounded-md bg-secondary dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-3 text-neutral-500 dark:text-neutral-400">
              <Search className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
