
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/lib/api';

interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    discount?: number;
  };
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

interface CartContextType {
  cart: Cart | null;
  isLoading: boolean;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType>({
  cart: null,
  isLoading: false,
  addToCart: async () => {},
  removeFromCart: async () => {},
  updateQuantity: async () => {},
  clearCart: async () => {}
});

export const useSimpleCart = () => useContext(CartContext);

export const SimpleCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart>(defaultCart);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchCart = async () => {
    try {
      console.log('Fetching cart data...');
      const localCart = localStorage.getItem('cart');
      if (localCart) {
        console.log('Local cart from localStorage:', JSON.parse(localCart));
        const parsedCart = JSON.parse(localCart);
        console.log('Using cart directly from localStorage:', parsedCart);
        setCart(parsedCart);
        return;
      }

      const response = await api.get('/api/cart');
      setCart(response);
      localStorage.setItem('cart', JSON.stringify(response));
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch cart"
      });
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (productId: number, quantity: number = 1) => {
    setIsLoading(true);
    try {
      const response = await api.post('/api/cart', { productId, quantity });
      setCart(response);
      localStorage.setItem('cart', JSON.stringify(response));
      toast({
        title: "Success",
        description: "Item added to cart"
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add item to cart"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (itemId: number) => {
    setIsLoading(true);
    try {
      const response = await api.delete(`/api/cart/${itemId}`);
      setCart(response);
      localStorage.setItem('cart', JSON.stringify(response));
      toast({
        title: "Success",
        description: "Item removed from cart"
      });
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to remove item from cart"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (itemId: number, quantity: number) => {
    setIsLoading(true);
    try {
      const response = await api.put(`/api/cart/${itemId}`, { quantity });
      setCart(response);
      localStorage.setItem('cart', JSON.stringify(response));
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update quantity"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    setIsLoading(true);
    try {
      const response = await api.delete('/api/cart');
      setCart(response);
      localStorage.setItem('cart', JSON.stringify(response));
      toast({
        title: "Success",
        description: "Cart cleared"
      });
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to clear cart"
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
        removeFromCart,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
