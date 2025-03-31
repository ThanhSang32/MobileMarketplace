import React from 'react';
import { Link } from 'wouter';
import { Product } from '@shared/schema';
import { Star, StarHalf, StarEmpty, ShoppingCart } from '@/components/ui/icons';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, isLoading } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id, 1);
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
    <div className="product-card bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <Link href={`/product/${product.id}`} className="block relative">
        {product.isNew && (
          <Badge className="absolute top-2 left-2 bg-[#ff4500] text-white text-xs px-2 py-1 rounded-md">
            New
          </Badge>
        )}
        {product.discount > 0 && (
          <Badge className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-md">
            -{product.discount}%
          </Badge>
        )}
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover" 
        />
        <div className="p-4">
          <h3 className="font-medium text-lg mb-2">{product.name}</h3>
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
                ${(product.price * (1 - product.discount / 100)).toFixed(2)}
              </span>
              {product.discount > 0 && (
                <span className="text-sm text-neutral-500 dark:text-neutral-400 line-through ml-2">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
            <button 
              className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
              onClick={handleAddToCart}
              disabled={isLoading}
              aria-label="Add to cart"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
