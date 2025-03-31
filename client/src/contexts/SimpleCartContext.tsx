
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

const calculateCartTotals = (items: CartItem[]) => {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  return { subtotal, itemCount, total: subtotal };
};

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

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart>(defaultCart);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (productId: number, product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.items.find(item => item.productId === productId);
      
      let newItems;
      if (existingItem) {
        newItems = prevCart.items.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
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
      
      const totals = calculateCartTotals(newItems);
      
      toast({
        title: "Thêm vào giỏ hàng thành công",
        description: `Đã thêm ${product.name} vào giỏ hàng`
      });
      
      return {
        items: newItems,
        ...totals,
        discount: 0
      };
    });
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    setCart(prevCart => {
      const newItems = prevCart.items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
      
      const totals = calculateCartTotals(newItems);
      
      return {
        items: newItems,
        ...totals,
        discount: 0
      };
    });
  };

  const removeItem = (itemId: number) => {
    setCart(prevCart => {
      const newItems = prevCart.items.filter(item => item.id !== itemId);
      const totals = calculateCartTotals(newItems);
      
      toast({
        title: "Đã xóa sản phẩm",
        description: "Sản phẩm đã được xóa khỏi giỏ hàng"
      });
      
      return {
        items: newItems,
        ...totals,
        discount: 0
      };
    });
  };

  const clearCart = () => {
    setCart(defaultCart);
    toast({
      title: "Đã xóa giỏ hàng",
      description: "Giỏ hàng đã được xóa"
    });
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

export const useCart = () => useContext(CartContext);
