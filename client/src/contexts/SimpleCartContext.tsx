
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Product } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product: Product;
}

interface Cart {
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  itemCount: number;
}

interface CartContextType {
  cart: Cart;
  isLoading: boolean;
  addToCart: (productId: number, product: Product, quantity?: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  removeItem: (itemId: number) => void;
  clearCart: () => void;
}

const defaultCart: Cart = {
  items: [],
  subtotal: 0,
  discount: 0,
  total: 0,
  itemCount: 0
};

const CartContext = createContext<CartContextType>({
  cart: defaultCart,
  isLoading: false,
  addToCart: () => {},
  updateQuantity: () => {},
  removeItem: () => {},
  clearCart: () => {}
});

export const useSimpleCart = () => useContext(CartContext);

const calculateCartTotals = (items: CartItem[]): { subtotal: number; itemCount: number; total: number } => {
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  return {
    subtotal,
    itemCount,
    total: subtotal
  };
};

export const SimpleCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart>(defaultCart);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  }, [cart]);

  const addToCart = (productId: number, product: Product, quantity: number = 1) => {
    setIsLoading(true);
    try {
      setCart(prevCart => {
        const existingItemIndex = prevCart.items.findIndex(item => item.productId === productId);
        
        let newItems;
        if (existingItemIndex >= 0) {
          newItems = [...prevCart.items];
          newItems[existingItemIndex].quantity += quantity;
        } else {
          newItems = [
            ...prevCart.items,
            {
              id: Date.now(),
              productId,
              quantity,
              product
            }
          ];
        }
        
        const { subtotal, itemCount, total } = calculateCartTotals(newItems);
        
        return {
          items: newItems,
          subtotal,
          discount: 0,
          total,
          itemCount
        };
      });
      
      toast({
        title: "Thêm vào giỏ hàng",
        description: "Sản phẩm đã được thêm vào giỏ hàng"
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Lỗi",
        description: "Không thể thêm sản phẩm vào giỏ hàng",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    setIsLoading(true);
    try {
      setCart(prevCart => {
        const itemIndex = prevCart.items.findIndex(item => item.id === itemId);
        if (itemIndex === -1) {
          throw new Error("Không tìm thấy sản phẩm");
        }
        
        const newItems = [...prevCart.items];
        newItems[itemIndex].quantity = quantity;
        
        const { subtotal, itemCount, total } = calculateCartTotals(newItems);
        
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
        title: "Lỗi",
        description: "Không thể cập nhật số lượng",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeItem = (itemId: number) => {
    setIsLoading(true);
    try {
      setCart(prevCart => {
        const newItems = prevCart.items.filter(item => item.id !== itemId);
        const { subtotal, itemCount, total } = calculateCartTotals(newItems);
        
        return {
          items: newItems,
          subtotal,
          discount: 0,
          total,
          itemCount
        };
      });
      
      toast({
        title: "Đã xóa",
        description: "Sản phẩm đã được xóa khỏi giỏ hàng"
      });
    } catch (error) {
      console.error("Error removing item:", error);
      toast({
        title: "Lỗi",
        description: "Không thể xóa sản phẩm",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = () => {
    setIsLoading(true);
    try {
      setCart(defaultCart);
      toast({
        title: "Đã xóa giỏ hàng",
        description: "Giỏ hàng đã được xóa"
      });
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast({
        title: "Lỗi",
        description: "Không thể xóa giỏ hàng",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CartContext.Provider 
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
    </CartContext.Provider>
  );
};
