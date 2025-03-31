import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Product } from '@shared/schema';
import { Star, StarHalf, StarEmpty, ShoppingCart, Check, ArrowRight } from '@/components/ui/icons';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, isLoading } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isCompared, setIsCompared] = useState(false);
  
  // Check if this product is already in the comparison list
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const comparedIds = searchParams.get('ids')?.split(',') || [];
    setIsCompared(comparedIds.includes(product.id.toString()));
  }, [product.id]);
  
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await addToCart(product.id, 1);
      // Hiển thị biểu tượng tích xanh để xác nhận đã thêm
      setIsAdded(true);
      // Đặt lại biểu tượng sau 1.5 giây
      setTimeout(() => setIsAdded(false), 1500);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };
  
  // Handle adding/removing the product to compare
  const handleToggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Get current comparison IDs from URL
    const searchParams = new URLSearchParams(window.location.search);
    let comparedIds = searchParams.get('ids')?.split(',') || [];
    
    if (isCompared) {
      // Remove from comparison
      comparedIds = comparedIds.filter(id => id !== product.id.toString());
      setIsCompared(false);
      toast({
        title: "Đã loại bỏ khỏi so sánh",
        description: "Sản phẩm đã được loại bỏ khỏi danh sách so sánh",
      });
    } else {
      // Add to comparison (max 4 products)
      if (comparedIds.length >= 4) {
        toast({
          variant: "destructive",
          title: "Đã đạt giới hạn so sánh",
          description: "Bạn chỉ có thể so sánh tối đa 4 sản phẩm cùng một lúc"
        });
        return;
      }
      
      comparedIds.push(product.id.toString());
      setIsCompared(true);
      toast({
        title: "Đã thêm vào so sánh",
        description: "Sản phẩm đã được thêm vào danh sách so sánh",
      });
    }
    
    // If we have products to compare, show compare button
    if (comparedIds.length > 0) {
      // Add floating "Compare Now" button if we have 2+ products
      if (comparedIds.length >= 2) {
        const floatingBtn = document.getElementById('compare-floating-btn');
        if (!floatingBtn) {
          const btn = document.createElement('button');
          btn.id = 'compare-floating-btn';
          btn.className = 'fixed bottom-8 right-8 z-50 bg-primary text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-primary/90 transition-all';
          btn.innerHTML = `Compare Now (${comparedIds.length}) <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>`;
          btn.onclick = () => {
            navigate(`/compare?ids=${comparedIds.join(',')}`);
          };
          document.body.appendChild(btn);
        } else {
          floatingBtn.innerHTML = `Compare Now (${comparedIds.length}) <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>`;
        }
      } else {
        // Remove floating button if less than 2 products
        const floatingBtn = document.getElementById('compare-floating-btn');
        if (floatingBtn) {
          document.body.removeChild(floatingBtn);
        }
      }
    } else {
      // Remove floating button if no products
      const floatingBtn = document.getElementById('compare-floating-btn');
      if (floatingBtn) {
        document.body.removeChild(floatingBtn);
      }
    }
    
    // Update URL with new IDs
    if (comparedIds.length > 0) {
      const newSearch = `?ids=${comparedIds.join(',')}`;
      window.history.replaceState(null, '', window.location.pathname + newSearch);
    } else {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  // Render star ratings
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="h-4 w-4 text-yellow-400" />);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="h-4 w-4 text-yellow-400" />);
    }
    
    // Add empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<StarEmpty key={`empty-${i}`} className="h-4 w-4 text-yellow-400" />);
    }
    
    return stars;
  };

  return (
    <motion.div 
      className="product-card bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/product/${product.id}`} className="block relative">
        {product.isNew && (
          <Badge className="absolute top-2 left-2 z-10 bg-[#ff4500] text-white text-xs px-2 py-1 rounded-md">
            New
          </Badge>
        )}
        {product.discount !== null && product.discount > 0 && (
          <Badge className="absolute top-2 left-2 z-10 bg-green-500 text-white text-xs px-2 py-1 rounded-md">
            -{product.discount}%
          </Badge>
        )}
        {/* Compare checkbox */}
        <button
          onClick={handleToggleCompare}
          className={`absolute top-2 right-2 z-10 flex items-center justify-center w-8 h-8 rounded-full transition-colors ${isCompared ? 'bg-primary text-white' : 'bg-white/70 text-neutral-700 dark:bg-neutral-700/70 dark:text-white/70'}`}
          aria-label={isCompared ? "Remove from comparison" : "Add to comparison"}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M16 3 L21 3 L21 8"></path>
            <path d="M3 16 L3 21 L8 21"></path>
            <path d="M21 3 L14 10"></path>
            <path d="M3 21 L10 14"></path>
          </svg>
        </button>
        <div className="relative overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105" 
          />
        </div>
        <div className="p-4">
          <h3 className="font-medium text-lg mb-2 line-clamp-2 h-14">{product.name}</h3>
          <div className="flex items-center mb-2">
            <div className="flex">
              {renderStars(product.rating)}
            </div>
            <span className="text-sm text-neutral-500 dark:text-neutral-400 ml-2">
              ({product.reviews})
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <span className="font-semibold text-lg">
                ${(product.price * (1 - (product.discount || 0) / 100)).toFixed(2)}
              </span>
              {product.discount && product.discount > 0 && (
                <span className="text-sm text-neutral-500 dark:text-neutral-400 line-through ml-2">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
            <motion.button 
              className={`p-2 rounded-full ${isAdded ? 'bg-green-500 text-white' : 'bg-primary/10 hover:bg-primary/20 text-primary'} transition-colors`}
              onClick={handleAddToCart}
              disabled={isLoading}
              aria-label="Add to cart"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
            >
              {isAdded ? (
                <Check className="h-5 w-5" />
              ) : (
                <ShoppingCart className="h-5 w-5" />
              )}
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
