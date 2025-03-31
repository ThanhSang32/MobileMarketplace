import React from "react";
import { X, Plus, Minus, Trash } from "@/components/ui/icons";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Separator } from "@/components/ui/separator";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { cart, updateQuantity, removeItem, isLoading } = useCart();

  if (!isOpen) return null;

  const handleIncreaseQuantity = (itemId: number, currentQuantity: number) => {
    updateQuantity(itemId, currentQuantity + 1);
  };

  const handleDecreaseQuantity = (itemId: number, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(itemId, currentQuantity - 1);
    } else {
      removeItem(itemId);
    }
  };

  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-neutral-900 shadow-lg transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 flex justify-between items-center border-b dark:border-neutral-800">
          <h2 className="font-semibold text-lg">
            Your Cart ({cart?.itemCount || 0})
          </h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-secondary dark:hover:bg-neutral-800"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="overflow-y-auto h-[calc(100vh-180px)]">
          {isLoading ? (
            <div className="p-4 text-center">Loading cart...</div>
          ) : cart?.items && cart.items.length > 0 ? (
            cart.items.map((item) => (
              <div key={item.id} className="p-4 border-b dark:border-neutral-800 flex items-center">
                <img 
                  src={item.product.image} 
                  alt={item.product.name} 
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="ml-4 flex-1">
                  <h3 className="font-medium">{item.product.name}</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {item.product.brand}
                  </p>
                  <div className="flex items-center mt-1">
                    <button 
                      className="text-neutral-500 dark:text-neutral-400 hover:text-primary dark:hover:text-primary"
                      onClick={() => handleDecreaseQuantity(item.id, item.quantity)}
                      disabled={isLoading}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="mx-2 w-8 text-center">{item.quantity}</span>
                    <button 
                      className="text-neutral-500 dark:text-neutral-400 hover:text-primary dark:hover:text-primary"
                      onClick={() => handleIncreaseQuantity(item.id, item.quantity)}
                      disabled={isLoading}
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-semibold">${item.product.price}</span>
                  <button 
                    className="text-neutral-500 dark:text-neutral-400 hover:text-red-500 dark:hover:text-red-500 mt-2"
                    onClick={() => removeItem(item.id)}
                    disabled={isLoading}
                    aria-label="Remove item"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <p className="mb-4 text-neutral-600 dark:text-neutral-400">Your cart is empty</p>
              <Button 
                onClick={onClose}
                className="bg-primary hover:bg-primary/90"
              >
                Continue Shopping
              </Button>
            </div>
          )}
        </div>
        
        {cart?.items && cart.items.length > 0 && (
          <div className="p-4 mt-auto border-t dark:border-neutral-800">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span className="font-semibold">${cart.subtotal.toFixed(2)}</span>
            </div>
            {cart.discount > 0 && (
              <div className="flex justify-between mb-2">
                <span>Discount</span>
                <span className="font-semibold text-green-500">-${cart.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span className="font-semibold">Free</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between mb-4 text-lg">
              <span className="font-medium">Total</span>
              <span className="font-semibold">${cart.total.toFixed(2)}</span>
            </div>
            <Link href="/checkout">
              <Button 
                className="w-full py-6 bg-primary hover:bg-primary/90 text-white font-medium rounded-md transition-colors"
                disabled={isLoading}
                onClick={onClose}
              >
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
