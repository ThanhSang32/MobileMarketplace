import React, { createContext, useState, useContext, useEffect } from "react";
import { Product } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

// Create a simple cart item type
type CartItem = {
  id: number;
  productId: number;
  quantity: number;
  product: Product;
};

// Define the cart structure
type Cart = {
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  itemCount: number;
};

// Define the context type
interface CartContextType {
  cart: Cart;
  isLoading: boolean;
  addToCart: (productId: number, product: Product, quantity?: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  removeItem: (itemId: number) => void;
  clearCart: () => void;
}

// Default empty cart
const defaultCart: Cart = {
  items: [],
  subtotal: 0,
  discount: 0,
  total: 0,
  itemCount: 0
};

// Create the context
const SimpleCartContext = createContext<CartContextType>({
  cart: defaultCart,
  isLoading: false,
  addToCart: () => {},
  updateQuantity: () => {},
  removeItem: () => {},
  clearCart: () => {}
});

// Helper function to calculate cart totals
const calculateCartTotals = (items: CartItem[]): { subtotal: number; itemCount: number; total: number } => {
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * (1 - (item.product.discount || 0) / 100) * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  return {
    subtotal,
    itemCount,
    total: subtotal // No additional discount for now
  };
};

// The provider component
export const SimpleCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State to hold the cart
  const [cart, setCart] = useState<Cart>(defaultCart);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cart]);

  // Add an item to the cart
  const addToCart = (productId: number, product: Product, quantity: number = 1) => {
    setIsLoading(true);
    try {
      setCart(prevCart => {
        // Check if the item already exists in the cart
        const existingItemIndex = prevCart.items.findIndex(item => item.productId === productId);
        
        let newItems;
        if (existingItemIndex >= 0) {
          // Update quantity if item exists
          newItems = [...prevCart.items];
          newItems[existingItemIndex].quantity += quantity;
        } else {
          // Add new item
          newItems = [
            ...prevCart.items,
            {
              id: Date.now(), // Use timestamp as a unique ID
              productId,
              quantity,
              product
            }
          ];
        }
        
        // Calculate new totals
        const { subtotal, itemCount, total } = calculateCartTotals(newItems);
        
        // Return updated cart
        return {
          items: newItems,
          subtotal,
          discount: 0,
          total,
          itemCount
        };
      });
      
      // Show success message
      toast({
        title: "Added to cart",
        description: "Product has been added to your cart"
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Error",
        description: "Failed to add product to cart",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Update item quantity
  const updateQuantity = (itemId: number, quantity: number) => {
    setIsLoading(true);
    try {
      setCart(prevCart => {
        // Find the item
        const itemIndex = prevCart.items.findIndex(item => item.id === itemId);
        if (itemIndex === -1) {
          throw new Error("Item not found");
        }
        
        // Create new items array with updated quantity
        const newItems = [...prevCart.items];
        newItems[itemIndex].quantity = quantity;
        
        // Calculate new totals
        const { subtotal, itemCount, total } = calculateCartTotals(newItems);
        
        // Return updated cart
        return {
          items: newItems,
          subtotal,
          discount: 0,
          total,
          itemCount
        };
      });
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast({
        title: "Error",
        description: "Failed to update cart",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Remove an item from the cart
  const removeItem = (itemId: number) => {
    setIsLoading(true);
    try {
      setCart(prevCart => {
        // Filter out the item
        const newItems = prevCart.items.filter(item => item.id !== itemId);
        
        // Calculate new totals
        const { subtotal, itemCount, total } = calculateCartTotals(newItems);
        
        // Return updated cart
        return {
          items: newItems,
          subtotal,
          discount: 0,
          total,
          itemCount
        };
      });
      
      // Show success message
      toast({
        title: "Removed from cart",
        description: "Product has been removed from your cart"
      });
    } catch (error) {
      console.error("Error removing item:", error);
      toast({
        title: "Error",
        description: "Failed to remove item from cart",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Clear the cart
  const clearCart = () => {
    setIsLoading(true);
    try {
      setCart(defaultCart);
      
      // Show success message
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart"
      });
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast({
        title: "Error",
        description: "Failed to clear cart",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SimpleCartContext.Provider
      value={{
        cart,
        isLoading,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart
      }}
    >
      {children}
    </SimpleCartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useSimpleCart = () => {
  return useContext(SimpleCartContext);
};