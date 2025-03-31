
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Product } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/lib/api';

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

  const fetchCart = async () => {
    try {
      const response = await api.get('/api/cart');
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (productId: number, product: Product, quantity: number = 1) => {
    setIsLoading(true);
    try {
      const response = await api.post('/api/cart', { productId, quantity });
      setCart(response.data);
      toast({
        title: "Thêm vào giỏ hàng thành công",
        description: `Đã thêm ${quantity} ${product.name} vào giỏ hàng`
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Lỗi",
        description: "Không thể thêm vào giỏ hàng",
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
      setCart(response.data);
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

  const removeItem = async (itemId: number) => {
    setIsLoading(true);
    try {
      const response = await api.delete(`/api/cart/${itemId}`);
      setCart(response.data);
      toast({
        title: "Đã xóa sản phẩm",
        description: "Sản phẩm đã được xóa khỏi giỏ hàng"
      });
    } catch (error) {
      console.error('Error removing item:', error);
      toast({
        title: "Lỗi",
        description: "Không thể xóa sản phẩm",
        variant: "destructive" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    setIsLoading(true);
    try {
      await api.delete('/api/cart');
      setCart(defaultCart);
      toast({
        title: "Đã xóa giỏ hàng",
        description: "Giỏ hàng đã được xóa"
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
