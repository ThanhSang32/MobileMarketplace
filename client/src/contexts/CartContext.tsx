import React, { createContext, useState, useContext, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { Product } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

// Tạo ID ngẫu nhiên cho các item trong giỏ hàng
const generateId = () => Math.floor(Math.random() * 1000000);

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
  
  // Tạo một function để lấy giỏ hàng từ localStorage và cập nhật thông tin
  const getCartFromLocalStorage = (): Cart => {
    // Lấy giỏ hàng từ localStorage
    const cart = getFromLocalStorage<Cart>("localCart", defaultCart);
    
    // Tính toán lại tổng tiền
    cart.subtotal = cart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    cart.total = cart.subtotal - cart.discount;
    cart.itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    
    return cart;
  };

  // Set up session ID
  useEffect(() => {
    // Nếu chưa có sessionId, tạo một cái mới
    const storedSessionId = localStorage.getItem("sessionId") || `session_${Date.now()}`;
    localStorage.setItem("sessionId", storedSessionId);
    setSessionId(storedSessionId);
    
    // Đảm bảo rằng đã khởi tạo giỏ hàng trong localStorage nếu chưa có
    if (!localStorage.getItem("localCart")) {
      saveToLocalStorage("localCart", defaultCart);
    }
  }, []);

  // Fetch cart data - ưu tiên từ localStorage
  const { data: cart = defaultCart, isLoading, refetch } = useQuery<Cart, Error, Cart>({
    queryKey: ["/api/cart"],
    staleTime: 500, // Giảm stale time để refresh thường xuyên hơn
    refetchOnWindowFocus: true,
    queryFn: async () => {
      console.log("Fetching cart data...");
      
      // Lấy dữ liệu từ localStorage
      const localCart = getCartFromLocalStorage();
      console.log("Local cart from localStorage:", localCart);
      
      // Luôn sử dụng localStorage đầu tiên
      console.log("Using cart directly from localStorage:", localCart);
      
      // Tạm thời tắt đồng bộ hóa từ server, chỉ sử dụng localStorage
      return localCart;
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
      
      // Chỉ sử dụng localStorage để đảm bảo hoạt động ngay lập tức
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
        console.log("Added to cart using localStorage:", localCart);
        
        // Trả về dữ liệu từ localStorage
        return localCart;
      } catch (error) {
        console.error("Error adding to cart:", error);
        throw error;
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
      console.log("Updating quantity for item:", itemId, "to", quantity);
      
      // Chỉ sử dụng localStorage 
      const localCart = getFromLocalStorage<Cart>("localCart", defaultCart);
      const itemIndex = localCart.items.findIndex(item => item.id === itemId);
      
      if (itemIndex >= 0) {
        // Cập nhật số lượng
        localCart.items[itemIndex].quantity = quantity;
        
        // Cập nhật tổng tiền
        localCart.subtotal = localCart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        localCart.total = localCart.subtotal - localCart.discount;
        localCart.itemCount = localCart.items.reduce((sum, item) => sum + item.quantity, 0);
        
        // Lưu vào localStorage
        saveToLocalStorage("localCart", localCart);
        console.log("Updated quantity in localStorage:", localCart);
      } else {
        console.warn("Item not found in localStorage cart:", itemId);
        throw new Error("Item not found in cart");
      }
      
      return localCart;
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
      console.log("Removing item from cart:", itemId);
      
      // Chỉ sử dụng localStorage
      const localCart = getFromLocalStorage<Cart>("localCart", defaultCart);
      const itemIndex = localCart.items.findIndex(item => item.id === itemId);
      
      if (itemIndex >= 0) {
        // Xóa item
        localCart.items.splice(itemIndex, 1);
        
        // Cập nhật tổng tiền
        localCart.subtotal = localCart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        localCart.total = localCart.subtotal - localCart.discount;
        localCart.itemCount = localCart.items.reduce((sum, item) => sum + item.quantity, 0);
        
        // Lưu vào localStorage
        saveToLocalStorage("localCart", localCart);
        console.log("Removed item from localStorage:", localCart);
      } else {
        console.warn("Item not found in localStorage cart:", itemId);
        throw new Error("Item not found in cart");
      }
      
      return localCart;
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
      console.log("Clearing cart");
      
      // Chỉ sử dụng localStorage
      saveToLocalStorage("localCart", defaultCart);
      console.log("Cleared cart in localStorage");
      
      return defaultCart;
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
