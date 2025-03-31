
import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@shared/schema';

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

interface CartContextType extends Cart {
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  isLoading: boolean;
}

const defaultCart: Cart = {
  items: [],
  subtotal: 0,
  discount: 0,
  total: 0,
  itemCount: 0
};

const CartContext = createContext<CartContextType>({
  ...defaultCart,
  addToCart: async () => {},
  removeFromCart: async () => {},
  updateQuantity: async () => {},
  clearCart: async () => {},
  isLoading: false
});

export const SimpleCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart>(defaultCart);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Load cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await api.get('/api/cart');
      setCart(response);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (productId: number, quantity: number = 1) => {
    setIsLoading(true);
    try {
      const response = await api.post('/api/cart', { productId, quantity });
      setCart(response);
      toast({
        title: "Thành công",
        description: `Đã thêm ${quantity} sản phẩm vào giỏ hàng`,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Lỗi",
        description: "Không thể thêm sản phẩm vào giỏ hàng",
        variant: "destructive"
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
      toast({
        title: "Thành công",
        description: "Đã xóa sản phẩm khỏi giỏ hàng",
      });
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast({
        title: "Lỗi",
        description: "Không thể xóa sản phẩm khỏi giỏ hàng",
        variant: "destructive"
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
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật số lượng",
        variant: "destructive"
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
      toast({
        title: "Thành công",
        description: "Đã xóa toàn bộ giỏ hàng",
      });
    } catch (error) {
      console.error('Error clearing cart:', error);
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
    <CartContext.Provider value={{
      ...cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isLoading
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useSimpleCart = () => useContext(CartContext);
