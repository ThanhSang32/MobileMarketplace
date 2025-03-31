import React, { createContext, useState, useContext, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { Product } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

// Hàm trợ giúp cho localStorage
const saveToLocalStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

const getFromLocalStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const saved = localStorage.getItem(key);
    if (saved === null) {
      return defaultValue;
    }
    return JSON.parse(saved) as T;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return defaultValue;
  }
};

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
    staleTime: 1000, // 1 second, refresh more frequently for testing
    refetchOnWindowFocus: true,
    queryFn: async () => {
      try {
        // Thử lấy dữ liệu từ server trước
        const res = await fetch("/api/cart", {
          headers: {
            "X-Session-ID": localStorage.getItem("sessionId") || ""
          }
        });
        
        // Kiểm tra sessionId từ response
        const newSessionId = res.headers.get("x-session-id");
        if (newSessionId) {
          console.log("Cart fetch: Received sessionId:", newSessionId);
          localStorage.setItem("sessionId", newSessionId);
        } else {
          console.error("Cart fetch: Missing sessionId in response headers");
        }
        
        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status}`);
        }
        
        const serverData = await res.json();
        console.log("Cart data fetched from server:", serverData);
        
        // Nếu server không có sản phẩm trong giỏ hàng,
        // kiểm tra localStorage có dữ liệu giỏ hàng không
        if (serverData.items.length === 0) {
          const localCart = getFromLocalStorage<Cart>("localCart", defaultCart);
          
          if (localCart.items.length > 0) {
            console.log("Using cart from localStorage instead (server cart empty):", localCart);
            return localCart;
          }
        }
        
        return serverData;
      } catch (error) {
        console.error("Error fetching cart from server:", error);
        
        // Nếu có lỗi, sử dụng dữ liệu từ localStorage
        const localCart = getFromLocalStorage<Cart>("localCart", defaultCart);
        console.log("Using cart from localStorage due to server error:", localCart);
        return localCart;
      }
    }
  });

  // Cập nhật sessionId từ localStorage nếu có thay đổi
  useEffect(() => {
    const storedSessionId = localStorage.getItem("sessionId");
    if (storedSessionId && sessionId !== storedSessionId) {
      setSessionId(storedSessionId);
    }
  }, [cart, sessionId]);

  // Add to cart mutation - Bao gồm cả localStorage
  const addToCartMutation = useMutation<Cart, Error, { productId: number, quantity: number }>({
    mutationFn: async ({ productId, quantity = 1 }) => {
      console.log("Adding to cart:", { productId, quantity });
      
      try {
        // Trước tiên thử sử dụng API server
        const res = await fetch("/api/cart", {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            "X-Session-ID": localStorage.getItem("sessionId") || ""
          },
          body: JSON.stringify({ productId, quantity })
        });
        
        // Kiểm tra sessionId từ response
        const newSessionId = res.headers.get("x-session-id");
        if (newSessionId) {
          console.log("Direct fetch: Received sessionId:", newSessionId);
          localStorage.setItem("sessionId", newSessionId);
        } else {
          console.error("Direct fetch: Missing sessionId in response headers");
        }
        
        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status}`);
        }
        
        // Lấy dữ liệu từ API
        const serverCart = await res.json();
        console.log("Added to cart response from server:", serverCart);
        
        // Đồng thời lưu một bản sao vào localStorage để đảm bảo có dữ liệu
        // Thêm vào localStorage
        const localCart = getFromLocalStorage<Cart>("localCart", defaultCart);
        
        // Lấy thông tin sản phẩm
        const productResponse = await fetch(`/api/products/${productId}`);
        if (!productResponse.ok) {
          throw new Error(`Failed to fetch product details: ${productResponse.status}`);
        }
        const product = await productResponse.json();
        
        // Tìm xem sản phẩm đã có trong cart chưa
        const existingItemIndex = localCart.items.findIndex(item => item.productId === productId);
        
        if (existingItemIndex >= 0) {
          // Cập nhật số lượng nếu sản phẩm đã tồn tại
          localCart.items[existingItemIndex].quantity += quantity;
        } else {
          // Thêm sản phẩm mới vào cart
          localCart.items.push({
            id: Date.now(), // ID tạm thời cho local storage
            sessionId: localStorage.getItem("sessionId") || "",
            productId,
            quantity,
            product
          });
        }
        
        // Cập nhật tổng cộng
        localCart.subtotal = localCart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        localCart.total = localCart.subtotal - localCart.discount;
        localCart.itemCount = localCart.items.reduce((sum, item) => sum + item.quantity, 0);
        
        // Lưu giỏ hàng vào localStorage
        saveToLocalStorage("localCart", localCart);
        console.log("Updated local cart:", localCart);
        
        // Trả về dữ liệu từ server hoặc localStorage nếu server thất bại
        return serverCart;
      } catch (error) {
        console.error("Error in server cart API:", error);
        
        // Nếu API thất bại, sử dụng localStorage
        try {
          // Lấy giỏ hàng hiện tại từ localStorage
          const localCart = getFromLocalStorage<Cart>("localCart", defaultCart);
          
          // Lấy thông tin sản phẩm
          const productResponse = await fetch(`/api/products/${productId}`);
          if (!productResponse.ok) {
            throw new Error(`Failed to fetch product details: ${productResponse.status}`);
          }
          const product = await productResponse.json();
          
          // Tìm xem sản phẩm đã có trong cart chưa
          const existingItemIndex = localCart.items.findIndex(item => item.productId === productId);
          
          if (existingItemIndex >= 0) {
            // Cập nhật số lượng nếu sản phẩm đã tồn tại
            localCart.items[existingItemIndex].quantity += quantity;
          } else {
            // Thêm sản phẩm mới vào cart
            localCart.items.push({
              id: Date.now(), // ID tạm thời cho local storage
              sessionId: localStorage.getItem("sessionId") || "",
              productId,
              quantity,
              product
            });
          }
          
          // Cập nhật tổng cộng
          localCart.subtotal = localCart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
          localCart.total = localCart.subtotal - localCart.discount;
          localCart.itemCount = localCart.items.reduce((sum, item) => sum + item.quantity, 0);
          
          // Lưu giỏ hàng vào localStorage
          saveToLocalStorage("localCart", localCart);
          console.log("Added to cart using localStorage fallback:", localCart);
          
          return localCart;
        } catch (localError) {
          console.error("Error in localStorage fallback:", localError);
          throw error; // Ném lỗi gốc nếu cả hai phương pháp đều thất bại
        }
      }
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
      try {
        const res = await fetch(`/api/cart/${itemId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Session-ID": localStorage.getItem("sessionId") || ""
          },
          body: JSON.stringify({ quantity })
        });
        
        const newSessionId = res.headers.get("x-session-id");
        if (newSessionId) {
          console.log("Update quantity: Received sessionId:", newSessionId);
          localStorage.setItem("sessionId", newSessionId);
        }
        
        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status}`);
        }
        
        const data = await res.json();
        return data;
      } catch (error) {
        console.error("Error updating quantity:", error);
        throw error;
      }
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
      try {
        const res = await fetch(`/api/cart/${itemId}`, {
          method: "DELETE",
          headers: {
            "X-Session-ID": localStorage.getItem("sessionId") || ""
          }
        });
        
        const newSessionId = res.headers.get("x-session-id");
        if (newSessionId) {
          console.log("Remove item: Received sessionId:", newSessionId);
          localStorage.setItem("sessionId", newSessionId);
        }
        
        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status}`);
        }
        
        const data = await res.json();
        return data;
      } catch (error) {
        console.error("Error removing item:", error);
        throw error;
      }
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
      try {
        const res = await fetch("/api/cart", {
          method: "DELETE",
          headers: {
            "X-Session-ID": localStorage.getItem("sessionId") || ""
          }
        });
        
        const newSessionId = res.headers.get("x-session-id");
        if (newSessionId) {
          console.log("Clear cart: Received sessionId:", newSessionId);
          localStorage.setItem("sessionId", newSessionId);
        }
        
        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status}`);
        }
        
        const data = await res.json();
        return data;
      } catch (error) {
        console.error("Error clearing cart:", error);
        throw error;
      }
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
