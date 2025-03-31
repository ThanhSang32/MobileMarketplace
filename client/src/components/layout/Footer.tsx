import React from "react";
import { Link } from "wouter";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  MapPin, 
  Phone, 
  Mail 
} from "@/components/ui/icons";

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">TechStore</h3>
            <p className="text-neutral-400 mb-4">
              Your trusted store for the latest technology products at competitive prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/category/phone" className="text-neutral-400 hover:text-white">
                  Smartphones
                </Link>
              </li>
              <li>
                <Link href="/category/laptop" className="text-neutral-400 hover:text-white">
                  Laptops
                </Link>
              </li>
              <li>
                <Link href="/accessories" className="text-neutral-400 hover:text-white">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/wearables" className="text-neutral-400 hover:text-white">
                  Wearables
                </Link>
              </li>
              <li>
                <Link href="/refurbished" className="text-neutral-400 hover:text-white">
                  Refurbished
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-neutral-400 hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-neutral-400 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-neutral-400 hover:text-white">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="text-neutral-400 hover:text-white">
                  Warranty
                </Link>
              </li>
              <li>
                <Link href="/repair" className="text-neutral-400 hover:text-white">
                  Repair Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-neutral-400">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                <span>123 Tech Street, Digital City, 10011</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 flex-shrink-0" />
                <span>support@techstore.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-700 pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} TechStore. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-neutral-400 hover:text-white text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-neutral-400 hover:text-white text-sm">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-neutral-400 hover:text-white text-sm">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;