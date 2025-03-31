import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { X, ChevronDown, User, LogOut } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DropdownItemProps {
  title: string;
  links: { href: string; label: string }[];
  onClose: () => void;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ title, links, onClose }) => {
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const response = await apiRequest('GET', '/api/auth/me');
        setIsLoggedIn(response.ok);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };
    
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await apiRequest('POST', '/api/auth/logout');
      setIsLoggedIn(false);
      navigate('/login');
      onClose();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

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
          <DropdownItem title="Phones" links={phoneLinks} onClose={onClose} />
          <DropdownItem title="Laptops" links={laptopLinks} onClose={onClose} />
          
          <Link 
            href="/accessories" 
            className="block font-medium py-2 mb-4 hover:text-primary dark:hover:text-primary transition-colors"
            onClick={onClose}
          >
            Phụ Kiện
          </Link>
          <Link 
            href="/wearables" 
            className="block font-medium py-2 mb-4 hover:text-primary dark:hover:text-primary transition-colors"
            onClick={onClose}
          >
            Thiết Bị Đeo
          </Link>
          <Link 
            href="/refurbished" 
            className="block font-medium py-2 mb-4 hover:text-primary dark:hover:text-primary transition-colors"
            onClick={onClose}
          >
            Hàng Tân Trang
          </Link>
          
          <div className="mt-6 pt-6 border-t dark:border-neutral-800">
            {isLoggedIn ? (
              <>
                <Link 
                  href="/account" 
                  className="flex items-center font-medium py-2 mb-4 hover:text-primary dark:hover:text-primary transition-colors"
                  onClick={onClose}
                >
                  <User className="h-5 w-5 mr-2" />
                  Tài khoản
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full text-left font-medium py-2 mb-4 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="flex items-center font-medium py-2 mb-4 hover:text-primary dark:hover:text-primary transition-colors"
                  onClick={onClose}
                >
                  <User className="h-5 w-5 mr-2" />
                  Đăng nhập
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MobileNav;
