import React, { createContext, useState, useContext, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { Product } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

type CartItem = {
  id: number;
  sessionId: string;
  productId: number;
  quantity: number;
  product: Product;
};

type Cart = {
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  itemCount: number;
};

interface CartContextType {
  cart: Cart | null;
  isLoading: boolean;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
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
  cart: defaultCart,
  isLoading: false,
  addToCart: async () => {},
  updateQuantity: async () => {},
  removeItem: async () => {},
  clearCart: async () => {}
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [sessionId, setSessionId] = useState<string | null>(null);

  // Set up session ID
  useEffect(() => {
    const storedSessionId = localStorage.getItem("sessionId");
    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      // The first API request will generate a session ID for us
      setSessionId("pending");
    }
  }, []);

  // Fetch cart data
  const { data: cart = defaultCart, isLoading, refetch } = useQuery<Cart, Error, Cart>({
    queryKey: ["/api/cart"],
    staleTime: 60000, // 1 minute
  });

  // Cập nhật sessionId từ localStorage nếu có thay đổi
  useEffect(() => {
    const storedSessionId = localStorage.getItem("sessionId");
    if (storedSessionId && sessionId !== storedSessionId) {
      setSessionId(storedSessionId);
    }
  }, [cart, sessionId]);

  // Add to cart mutation
  const addToCartMutation = useMutation<Cart, Error, { productId: number, quantity: number }>({
    mutationFn: async ({ productId, quantity = 1 }) => {
      console.log("Adding to cart:", { productId, quantity });
      const res = await apiRequest("POST", "/api/cart", { productId, quantity });
      const data = await res.json();
      console.log("Added to cart response:", data);
      return data;
    },
    onSuccess: (data) => {
      console.log("Setting cart data after add:", data);
      queryClient.setQueryData(["/api/cart"], data);
      toast({
        title: "Added to cart",
        description: "Product has been added to your cart"
      });
    },
    onError: (error) => {
      console.error("Failed to add to cart:", error);
      toast({
        title: "Error",
        description: "Failed to add product to cart",
        variant: "destructive"
      });
    }
  });

  // Update quantity mutation
  const updateQuantityMutation = useMutation<Cart, Error, { itemId: number, quantity: number }>({
    mutationFn: async ({ itemId, quantity }) => {
      const res = await apiRequest("PUT", `/api/cart/${itemId}`, { quantity });
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["/api/cart"], data);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update cart item",
        variant: "destructive"
      });
    }
  });

  // Remove item mutation
  const removeItemMutation = useMutation<Cart, Error, number>({
    mutationFn: async (itemId) => {
      const res = await apiRequest("DELETE", `/api/cart/${itemId}`, undefined);
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["/api/cart"], data);
      toast({
        title: "Removed from cart",
        description: "Product has been removed from your cart"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to remove cart item",
        variant: "destructive"
      });
    }
  });

  // Clear cart mutation
  const clearCartMutation = useMutation<Cart, Error, void>({
    mutationFn: async () => {
      const res = await apiRequest("DELETE", "/api/cart", undefined);
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["/api/cart"], data);
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to clear cart",
        variant: "destructive"
      });
    }
  });

  // Context API
  const addToCart = async (productId: number, quantity: number = 1) => {
    await addToCartMutation.mutateAsync({ productId, quantity });
  };

  const updateQuantity = async (itemId: number, quantity: number) => {
    await updateQuantityMutation.mutateAsync({ itemId, quantity });
  };

  const removeItem = async (itemId: number) => {
    await removeItemMutation.mutateAsync(itemId);
  };

  const clearCart = async () => {
    await clearCartMutation.mutateAsync();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading: isLoading || addToCartMutation.isPending || updateQuantityMutation.isPending || removeItemMutation.isPending || clearCartMutation.isPending,
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
