import React, { useState } from 'react';
import { useParams, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Star, StarHalf, StarEmpty, ShoppingCart, Minus, Plus } from '@/components/ui/icons';
import { useCart } from '@/contexts/CartContext';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import ProductGrid from '@/components/products/ProductGrid';
import { Product } from '@shared/schema';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const [quantity, setQuantity] = useState(1);
  const { addToCart, isLoading: isCartLoading } = useCart();
  
  // Fetch product
  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: [`/api/products/${id}`],
  });
  
  // Fetch related products
  const { data: allProducts = [] } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product.id, quantity);
    }
  };
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8 animate-pulse">
          <div className="md:w-1/2 bg-neutral-200 dark:bg-neutral-700 rounded-lg h-96"></div>
          <div className="md:w-1/2">
            <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded mb-4 w-3/4"></div>
            <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded mb-4 w-1/2"></div>
            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded mb-8 w-full"></div>
            <div className="h-10 bg-neutral-200 dark:bg-neutral-700 rounded mb-4 w-1/3"></div>
            <div className="h-12 bg-neutral-200 dark:bg-neutral-700 rounded mb-4 w-full"></div>
          </div>
        </div>
      </div>
    );
  }
  
  // Show error state
  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => setLocation('/')}>Return to Home</Button>
      </div>
    );
  }
  
  // Get related products (same category, different product)
  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  // Render star ratings
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="h-5 w-5 text-yellow-400" />);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="h-5 w-5 text-yellow-400" />);
    }
    
    // Add empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<StarEmpty key={`empty-${i}`} className="h-5 w-5 text-yellow-400" />);
    }
    
    return stars;
  };
  
  // Calculate final price after discount
  const finalPrice = product.price * (1 - product.discount / 100);

  return (
    <div className="bg-white dark:bg-neutral-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <div className="md:w-1/2">
            <div className="relative bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden">
              {product.isNew && (
                <Badge className="absolute top-4 left-4 z-10 bg-[#ff4500] text-white text-xs px-2 py-1 rounded-md">
                  New
                </Badge>
              )}
              {product.discount > 0 && (
                <Badge className="absolute top-4 left-4 z-10 bg-green-500 text-white text-xs px-2 py-1 rounded-md">
                  -{product.discount}%
                </Badge>
              )}
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto object-cover rounded-lg" 
              />
            </div>
          </div>
          
          {/* Product Details */}
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {renderStars(product.rating)}
              </div>
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                ({product.reviews} reviews)
              </span>
            </div>
            
            <p className="text-neutral-600 dark:text-neutral-300 mb-6">
              {product.description}
            </p>
            
            <div className="mb-6">
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold">
                  ${finalPrice.toFixed(2)}
                </span>
                {product.discount > 0 && (
                  <span className="text-lg text-neutral-500 dark:text-neutral-400 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
              {product.discount > 0 && (
                <p className="text-green-500 mt-1">
                  You save: ${(product.price - finalPrice).toFixed(2)} ({product.discount}%)
                </p>
              )}
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Quantity</h3>
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="h-10 w-10"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="mx-4 w-8 text-center">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="h-10 w-10"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                Brand: <span className="font-medium text-neutral-800 dark:text-white">{product.brand}</span>
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                Category: <span className="font-medium text-neutral-800 dark:text-white">{product.category === 'phone' ? 'Smartphone' : 'Laptop'}</span>
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Availability: <span className="font-medium text-neutral-800 dark:text-white">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
              </p>
            </div>
            
            <Button 
              className="w-full py-6 bg-primary hover:bg-primary/90 text-white font-medium"
              onClick={handleAddToCart}
              disabled={isCartLoading || product.stock <= 0}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>
        
        {/* Product Description */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Product Description</h2>
          <Separator className="mb-4" />
          <p className="text-neutral-600 dark:text-neutral-300">
            {product.description}
          </p>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">You might also like</h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
