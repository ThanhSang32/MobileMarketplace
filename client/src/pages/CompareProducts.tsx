import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Star, StarHalf, StarEmpty, X, ShoppingCart } from '@/components/ui/icons';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Product } from '@shared/schema';
import { useCart } from '@/contexts/CartContext';
import { motion } from 'framer-motion';

const CompareProducts: React.FC = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [productIds, setProductIds] = useState<string[]>([]);
  
  // Parse product IDs from URL
  const location = useLocation()[0];
  
  useEffect(() => {
    // Get product IDs from URL query params
    const params = new URLSearchParams(location.split('?')[1]);
    const ids = params.get('ids');
    if (ids) {
      setProductIds(ids.split(','));
    }
  }, [location]);
  
  // Fetch all products
  const { data: allProducts = [] } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });
  
  // Filter products to compare based on IDs
  const productsToCompare = allProducts.filter(product => 
    productIds.includes(product.id.toString())
  );
  
  // Handle add to cart
  const handleAddToCart = async (productId: number) => {
    try {
      await addToCart(productId, 1);
      toast({
        title: "Added to cart",
        description: "Product has been added to your cart",
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add product to cart"
      });
    }
  };
  
  // Handle remove product from comparison
  const handleRemoveProduct = (productId: number) => {
    const updatedIds = productIds.filter(id => id !== productId.toString());
    
    // Update URL
    const searchParams = new URLSearchParams();
    if (updatedIds.length > 0) {
      searchParams.set('ids', updatedIds.join(','));
      setLocation(`/compare?${searchParams.toString()}`);
    } else {
      // If no products left, go back to shop
      setLocation('/shop');
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
  
  // If no products to compare
  if (productsToCompare.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-6">Compare Products</h1>
        <p className="mb-6 text-neutral-600 dark:text-neutral-300">No products selected for comparison.</p>
        <Button onClick={() => setLocation('/shop')}>
          Browse Products
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Compare Products</h1>
      
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse">
          <thead>
            <tr className="bg-neutral-100 dark:bg-neutral-800">
              <th className="p-4 text-left w-1/4">Feature</th>
              {productsToCompare.map((product, index) => (
                <th key={product.id} className="p-4 text-left relative">
                  <button 
                    onClick={() => handleRemoveProduct(product.id)}
                    className="absolute top-2 right-2 p-1 rounded-full bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600"
                    aria-label="Remove from comparison"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody>
            {/* Product Image */}
            <tr className="border-b dark:border-neutral-700">
              <td className="p-4 font-medium">Product</td>
              {productsToCompare.map(product => (
                <td key={product.id} className="p-4">
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-48 object-cover rounded-lg" 
                    />
                    {product.isNew && (
                      <Badge className="absolute top-2 left-2 bg-[#ff4500] text-white text-xs px-2 py-1 rounded-md">
                        New
                      </Badge>
                    )}
                    {product.discount && product.discount > 0 && (
                      <Badge className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-md">
                        -{product.discount}%
                      </Badge>
                    )}
                  </div>
                </td>
              ))}
            </tr>
            
            {/* Product Name */}
            <tr className="border-b dark:border-neutral-700">
              <td className="p-4 font-medium">Name</td>
              {productsToCompare.map(product => (
                <td key={product.id} className="p-4">
                  <h3 className="font-medium text-lg">{product.name}</h3>
                </td>
              ))}
            </tr>
            
            {/* Price */}
            <tr className="border-b dark:border-neutral-700">
              <td className="p-4 font-medium">Price</td>
              {productsToCompare.map(product => (
                <td key={product.id} className="p-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-semibold">
                      ${(product.price * (1 - (product.discount || 0) / 100)).toFixed(2)}
                    </span>
                    {product.discount && product.discount > 0 && (
                      <span className="text-sm text-neutral-500 dark:text-neutral-400 line-through">
                        ${product.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </td>
              ))}
            </tr>
            
            {/* Rating */}
            <tr className="border-b dark:border-neutral-700">
              <td className="p-4 font-medium">Rating</td>
              {productsToCompare.map(product => (
                <td key={product.id} className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">
                      ({product.reviews})
                    </span>
                  </div>
                </td>
              ))}
            </tr>
            
            {/* Brand */}
            <tr className="border-b dark:border-neutral-700">
              <td className="p-4 font-medium">Brand</td>
              {productsToCompare.map(product => (
                <td key={product.id} className="p-4">
                  {product.brand}
                </td>
              ))}
            </tr>
            
            {/* Category */}
            <tr className="border-b dark:border-neutral-700">
              <td className="p-4 font-medium">Category</td>
              {productsToCompare.map(product => (
                <td key={product.id} className="p-4">
                  {product.category === 'phone' ? 'Smartphone' : 
                   product.category === 'laptop' ? 'Laptop' : 
                   product.category}
                </td>
              ))}
            </tr>
            
            {/* Availability */}
            <tr className="border-b dark:border-neutral-700">
              <td className="p-4 font-medium">Availability</td>
              {productsToCompare.map(product => (
                <td key={product.id} className="p-4">
                  <span className={product.stock > 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}>
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
              ))}
            </tr>
            
            {/* Description */}
            <tr className="border-b dark:border-neutral-700">
              <td className="p-4 font-medium">Description</td>
              {productsToCompare.map(product => (
                <td key={product.id} className="p-4">
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">
                    {product.description}
                  </p>
                </td>
              ))}
            </tr>
            
            {/* Action */}
            <tr>
              <td className="p-4 font-medium">Actions</td>
              {productsToCompare.map(product => (
                <td key={product.id} className="p-4">
                  <div className="space-y-2">
                    <Button 
                      onClick={() => handleAddToCart(product.id)}
                      className="w-full"
                      disabled={product.stock <= 0}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                    <Button 
                      onClick={() => setLocation(`/product/${product.id}`)}
                      variant="outline"
                      className="w-full"
                    >
                      View Details
                    </Button>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="mt-12 text-center">
        <Button 
          onClick={() => setLocation('/shop')}
          variant="outline"
        >
          Back to Shop
        </Button>
      </div>
    </div>
  );
};

export default CompareProducts;