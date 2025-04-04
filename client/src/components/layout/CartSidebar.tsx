import React, { useState, useEffect } from "react";
import { X, Plus, Minus, Trash, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Separator } from "@/components/ui/separator";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { cart, updateQuantity, removeFromCart, clearCart, isLoading } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);
  const [_, setLocation] = useLocation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-lg transform transition-transform duration-300">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="font-semibold text-lg">Cart ({cart?.itemCount || 0})</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-180px)]">
          {isLoading ? (
            <div className="p-4 text-center">Loading...</div>
          ) : cart?.items && cart.items.length > 0 ? (
            cart.items.map((item) => (
              <div key={item.id} className="p-4 border-b flex items-center">
                <img 
                  src={item.product.image} 
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="ml-4 flex-1">
                  <h3 className="font-medium">{item.product.name}</h3>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={isUpdating}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={isUpdating}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      disabled={isUpdating}
                      className="ml-4 text-red-500 hover:text-red-600"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-1 font-semibold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <p className="mb-4 text-gray-600">Your cart is empty</p>
              <Button onClick={onClose}>
                Continue Shopping
              </Button>
            </div>
          )}

          {/* Checkout Button */}
          <div className="mt-4">
            <Link href="/checkout">
              <Button className="w-full" size="lg">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Checkout (${cart?.total.toFixed(2)})
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;