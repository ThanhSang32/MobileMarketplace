
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

const defaultCart: Cart = {
  items: [],
  subtotal: 0,
  discount: 0,
  total: 0,
  itemCount: 0
};

type CartContextType = {
  cart: Cart;
  isLoading: boolean;
  addToCart: (productId: number, product: Product, quantity?: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  removeItem: (itemId: number) => void;
  clearCart: () => void;
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

export const SimpleCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart>(defaultCart);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const calculateTotals = (items: CartItem[]) => {
    const subtotal = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    return {
      subtotal,
      total: subtotal - (cart.discount || 0),
      itemCount: items.reduce((count, item) => count + item.quantity, 0)
    };
  };

  const addToCart = (productId: number, product: Product, quantity: number = 1) => {
    setCart(currentCart => {
      const existingItem = currentCart.items.find(item => item.productId === productId);
      let newItems;

      if (existingItem) {
        newItems = currentCart.items.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...currentCart.items, {
          id: Date.now(),
          productId,
          product,
          quantity
        }];
      }

      const totals = calculateTotals(newItems);

      return {
        items: newItems,
        ...totals,
        discount: currentCart.discount
      };
    });

    toast({
      title: "Thêm vào giỏ hàng thành công",
      description: `Đã thêm ${quantity} sản phẩm vào giỏ hàng`
    });
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    setCart(currentCart => {
      const newItems = currentCart.items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
      const totals = calculateTotals(newItems);

      return {
        items: newItems,
        ...totals,
        discount: currentCart.discount
      };
    });
  };

  const removeItem = (itemId: number) => {
    setCart(currentCart => {
      const newItems = currentCart.items.filter(item => item.id !== itemId);
      const totals = calculateTotals(newItems);

      return {
        items: newItems,
        ...totals,
        discount: currentCart.discount
      };
    });
  };

  const clearCart = () => {
    setCart(defaultCart);
  };

  return (
    <CartContext.Provider value={{
      cart,
      isLoading,
      addToCart,
      updateQuantity,
      removeItem,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
