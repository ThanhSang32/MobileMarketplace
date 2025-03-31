import React, { createContext, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/lib/api';
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

interface CartContextType {
  cart: Cart | undefined;
  isLoading: boolean;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: cart, isLoading } = useQuery<Cart>({
    queryKey: ['cart'],
    queryFn: () => api.get('/api/cart'),
  });

  const addToCartMutation = useMutation({
    mutationFn: (variables: { productId: number; quantity: number }) =>
      api.post('/api/cart', variables),
    onSuccess: (newCart) => {
      queryClient.setQueryData(['cart'], newCart);
      toast({
        title: "Thành công",
        description: "Đã thêm sản phẩm vào giỏ hàng",
      });
    },
    onError: () => {
      toast({
        title: "Lỗi",
        description: "Không thể thêm sản phẩm vào giỏ hàng",
        variant: "destructive",
      });
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: (itemId: number) => api.delete(`/api/cart/${itemId}`),
    onSuccess: (newCart) => {
      queryClient.setQueryData(['cart'], newCart);
      toast({
        title: "Thành công",
        description: "Đã xóa sản phẩm khỏi giỏ hàng",
      });
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: (variables: { itemId: number; quantity: number }) =>
      api.put(`/api/cart/${variables.itemId}`, { quantity: variables.quantity }),
    onSuccess: (newCart) => {
      queryClient.setQueryData(['cart'], newCart);
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: () => api.delete('/api/cart'),
    onSuccess: (newCart) => {
      queryClient.setQueryData(['cart'], newCart);
      toast({
        title: "Thành công",
        description: "Đã xóa toàn bộ giỏ hàng",
      });
    },
  });

  const addToCart = async (productId: number, quantity: number = 1) => {
    await addToCartMutation.mutateAsync({ productId, quantity });
  };

  const removeFromCart = async (itemId: number) => {
    await removeFromCartMutation.mutateAsync(itemId);
  };

  const updateQuantity = async (itemId: number, quantity: number) => {
    await updateQuantityMutation.mutateAsync({ itemId, quantity });
  };

  const clearCart = async () => {
    await clearCartMutation.mutateAsync();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading: isLoading || addToCartMutation.isPending || removeFromCartMutation.isPending || updateQuantityMutation.isPending || clearCartMutation.isPending,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};