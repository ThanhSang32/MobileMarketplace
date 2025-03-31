import React, { createContext, useContext, useState, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { api } from '@/lib/api';

interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
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

interface CartContextType extends Cart {
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
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
  clearCart: async () => {}
});

export const SimpleCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart>(defaultCart);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchCart = useCallback(async () => {
    try {
      const response = await api.get('/api/cart');
      setCart(response);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  }, []);

  const addToCart = async (productId: number, quantity: number = 1) => {
    try {
      setIsLoading(true);
      const response = await api.post('/api/cart', { productId, quantity });
      setCart(response);
      toast({
        title: "Thêm vào giỏ hàng thành công",
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
    try {
      setIsLoading(true);
      const response = await api.delete(`/api/cart/${itemId}`);
      setCart(response);
      toast({
        title: "Đã xóa sản phẩm",
        description: "Sản phẩm đã được xóa khỏi giỏ hàng",
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
    try {
      setIsLoading(true);
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
    try {
      setIsLoading(true);
      const response = await api.delete('/api/cart');
      setCart(response);
      toast({
        title: "Đã xóa giỏ hàng",
        description: "Giỏ hàng đã được xóa",
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
    <CartContext.Provider
      value={{
        ...cart,
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

export const useSimpleCart = () => useContext(CartContext);