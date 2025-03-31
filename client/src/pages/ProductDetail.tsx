import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Star, StarHalf, StarEmpty, ShoppingCart, Minus, Plus, Check } from '@/components/ui/icons';
import { useCart } from '@/contexts/CartContext';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import ProductGrid from '@/components/products/ProductGrid';
import { Product } from '@shared/schema';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";
import { Helmet } from 'react-helmet';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const [quantity, setQuantity] = useState(1);
  const { addToCart, isLoading: isCartLoading } = useCart();
  const { toast } = useToast();
  const [isAdded, setIsAdded] = useState(false);
  
  // Fetch product
  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: [`/api/products/${id}`],
  });
  
  // Fetch related products
  const { data: allProducts = [] } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });
  
  const handleAddToCart = async () => {
    if (product) {
      console.log("ProductDetail: handleAddToCart clicked", { productId: product.id, quantity });
      try {
        await addToCart(product.id, quantity);
        console.log("ProductDetail: Item added to cart successfully");
        
        // Hiển thị biểu tượng tích xanh trên nút
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 1500);
        
        // Hiển thị thông báo thành công với thông tin sản phẩm
        toast({
          title: "Thêm vào giỏ hàng thành công",
          description: `Đã thêm ${quantity} x ${product.name} vào giỏ hàng`,
        });
      } catch (error) {
        console.error("ProductDetail: Error adding to cart", error);
        toast({
          variant: "destructive",
          title: "Lỗi",
          description: "Không thể thêm sản phẩm vào giỏ hàng"
        });
      }
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
  const finalPrice = product.price * (1 - (product.discount || 0) / 100);

  // Generate Schema.org JSON-LD for the product
  const generateJsonLD = () => {
    const schemaData = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": product.name,
      "image": product.image,
      "description": product.description,
      "brand": {
        "@type": "Brand",
        "name": product.brand
      },
      "sku": `SKU-${product.id}`,
      "mpn": `MPN-${product.id}`,
      "offers": {
        "@type": "Offer",
        "url": window.location.href,
        "priceCurrency": "USD",
        "price": finalPrice.toFixed(2),
        "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
        "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": product.rating.toString(),
        "reviewCount": product.reviews.toString()
      }
    };
    
    return JSON.stringify(schemaData);
  };

  return (
    <div className="bg-white dark:bg-neutral-900">
      {/* Add SEO metadata */}
      <Helmet>
        <title>{product.name} | TechStore</title>
        <meta name="description" content={product.description.substring(0, 160)} />
        <meta property="og:title" content={`${product.name} | TechStore`} />
        <meta property="og:description" content={product.description.substring(0, 160)} />
        <meta property="og:image" content={product.image} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="product" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${product.name} | TechStore`} />
        <meta name="twitter:description" content={product.description.substring(0, 160)} />
        <meta name="twitter:image" content={product.image} />
        <script type="application/ld+json">
          {generateJsonLD()}
        </script>
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          className="flex flex-col md:flex-row gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Product Image */}
          <motion.div 
            className="md:w-1/2"
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden">
              {product.isNew && (
                <Badge className="absolute top-4 left-4 z-10 bg-[#ff4500] text-white text-xs px-2 py-1 rounded-md">
                  New
                </Badge>
              )}
              {product.discount && product.discount > 0 && (
                <Badge className="absolute top-4 left-4 z-10 bg-green-500 text-white text-xs px-2 py-1 rounded-md">
                  -{product.discount}%
                </Badge>
              )}
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto object-cover rounded-lg transition-all duration-500 hover:scale-105" 
              />
            </div>
          </motion.div>
          
          {/* Product Details */}
          <motion.div 
            className="md:w-1/2"
            initial={{ x: 50 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
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
            
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold">
                  ${finalPrice.toFixed(2)}
                </span>
                {product.discount && product.discount > 0 && (
                  <span className="text-lg text-neutral-500 dark:text-neutral-400 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
              {product.discount && product.discount > 0 && (
                <p className="text-green-500 mt-1">
                  You save: ${(product.price - finalPrice).toFixed(2)} ({product.discount}%)
                </p>
              )}
            </motion.div>
            
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
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
                <motion.span 
                  key={quantity}
                  className="mx-4 w-8 text-center"
                  initial={{ scale: 1.5 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {quantity}
                </motion.span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="h-10 w-10"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                Brand: <span className="font-medium text-neutral-800 dark:text-white">{product.brand}</span>
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                Category: <span className="font-medium text-neutral-800 dark:text-white">{product.category === 'phone' ? 'Smartphone' : product.category === 'laptop' ? 'Laptop' : product.category}</span>
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Availability: <span className={`font-medium ${product.stock > 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </p>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                className={`w-full py-6 ${isAdded ? 'bg-green-500 hover:bg-green-600' : 'bg-primary hover:bg-primary/90'} text-white font-medium transition-colors duration-300`}
                onClick={handleAddToCart}
                disabled={isCartLoading || product.stock <= 0}
              >
                {isAdded ? (
                  <>
                    <Check className="mr-2 h-5 w-5" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </>
                )}
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Product Description and Reviews */}
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {/* Tabs for Description and Reviews */}
          <div className="flex flex-wrap border-b dark:border-neutral-700 mb-6">
            <button 
              className={`py-3 px-5 font-medium text-lg border-b-2 border-primary text-primary`}
              onClick={() => {}}
            >
              Product Description
            </button>
            <button 
              className={`py-3 px-5 font-medium text-lg border-b-2 border-transparent text-neutral-500 hover:text-primary`}
              onClick={() => {}}
            >
              Reviews ({product.reviews})
            </button>
          </div>
          
          {/* Description Content */}
          <div>
            <p className="text-neutral-600 dark:text-neutral-300 mb-8">
              {product.description}
            </p>
            
            {/* Reviews Section */}
            <div className="mt-12">
              <h3 className="text-xl font-bold mb-6">Customer Reviews</h3>
              
              {/* Review Stats */}
              <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="md:w-1/3 bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg">
                  <div className="text-center">
                    <div className="text-5xl font-bold mb-2">{product.rating.toFixed(1)}</div>
                    <div className="flex justify-center mb-2">
                      {renderStars(product.rating)}
                    </div>
                    <p className="text-neutral-500 dark:text-neutral-400">Based on {product.reviews} reviews</p>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  {/* Rating Bars */}
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map(rating => {
                      // Calculate percentage (mock data for visualization)
                      const percent = 100 - (5 - rating) * 20;
                      return (
                        <div key={rating} className="flex items-center">
                          <div className="w-12 text-neutral-600 dark:text-neutral-400">{rating} star</div>
                          <div className="flex-1 h-4 mx-3 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-yellow-400 rounded-full" 
                              style={{ width: `${percent}%` }}
                            ></div>
                          </div>
                          <div className="w-12 text-right text-neutral-600 dark:text-neutral-400">{percent}%</div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Write Review Button */}
                  <Button className="mt-6 w-full" variant="outline">
                    Write a Review
                  </Button>
                </div>
              </div>
              
              {/* Sample Reviews (Mock Data) */}
              <div className="space-y-6">
                {[
                  {
                    name: "Alex Johnson",
                    date: "March 15, 2023",
                    rating: 5,
                    review: "This product exceeded my expectations. The build quality is excellent and it performs really well for my daily tasks. Battery life is incredible!"
                  },
                  {
                    name: "Sarah Miller",
                    date: "February 28, 2023",
                    rating: 4,
                    review: "Great product for the price. The only drawback is that it's a bit heavier than I expected, but the performance makes up for it."
                  },
                  {
                    name: "Mike Chen",
                    date: "January 12, 2023",
                    rating: 5,
                    review: "Absolutely worth every penny. The screen is stunning and the speed is impressive. Would definitely recommend to anyone looking for a high-quality device."
                  }
                ].map((review, index) => (
                  <motion.div 
                    key={index}
                    className="border-b dark:border-neutral-700 pb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                  >
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">{review.name}</h4>
                      <span className="text-neutral-500 dark:text-neutral-400">{review.date}</span>
                    </div>
                    <div className="flex mb-3">
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-300">{review.review}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div 
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-8">You might also like</h2>
            <ProductGrid products={relatedProducts} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
