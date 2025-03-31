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

  // Load cart from localStorage when component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
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

      const { subtotal, itemCount, total } = calculateCartTotals(newItems);

      toast({
        title: "Thêm vào giỏ hàng thành công",
        description: `Đã thêm ${quantity} sản phẩm vào giỏ hàng`
      });

      return {
        items: newItems,
        subtotal,
        discount: 0,
        total,
        itemCount
      };
    });
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    setCart(prevCart => {
      const newItems = prevCart.items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );

      const { subtotal, itemCount, total } = calculateCartTotals(newItems);

      return {
        items: newItems,
        subtotal,
        discount: 0,
        total,
        itemCount
      };
    });
  };

  const removeItem = (itemId: number) => {
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
  };

  const clearCart = () => {
    setCart(defaultCart);
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