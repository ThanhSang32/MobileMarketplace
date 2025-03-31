import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { queryClient } from '@/lib/queryClient';

const checkoutFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  address: z.string().min(5, { message: "Address must be at least 5 characters" }),
  city: z.string().min(2, { message: "City must be at least 2 characters" }),
  zipCode: z.string().min(5, { message: "Zip code must be at least 5 characters" }),
  country: z.string().min(2, { message: "Country must be at least 2 characters" }),
  paymentMethod: z.enum(["credit", "paypal", "bank"], { message: "Please select a payment method" }),
  saveInfo: z.boolean().optional(),
  terms: z.boolean().refine(val => val === true, { message: "You must accept the terms and conditions" })
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

const Checkout: React.FC = () => {
  const [, navigate] = useLocation();
  const { cart, clearCart } = useCart();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  // Form validation
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      zipCode: "",
      country: "",
      paymentMethod: "credit",
      saveInfo: false,
      terms: false
    }
  });

  // Bỏ qua kiểm tra giỏ hàng trống
  // React.useEffect(() => {
  //   if (cart && cart.items.length === 0) {
  //     toast({
  //       title: "Empty Cart",
  //       description: "Your cart is empty. Please add some products before checkout.",
  //       variant: "destructive"
  //     });
  //     navigate("/");
  //   }
  // }, [cart, navigate, toast]);

  // Clear cart mutation
  const clearCartMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        credentials: "include"
      });
      if (!res.ok) {
        throw new Error("Failed to clear cart");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
    }
  });

  // Handle form submission
  const onSubmit = async (data: CheckoutFormValues) => {
    setIsProcessing(true);
    
    try {
      // In a real app, this would be an API call to process the order
      // For now, we'll just simulate a successful order
      
      // Simulate API processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Try to clear the cart, but continue even if it fails
      try {
        await clearCartMutation.mutateAsync();
        await clearCart();
      } catch (err) {
        console.log('Failed to clear cart, but continuing with checkout');
      }
      
      // Show success message
      toast({
        title: "Order Placed Successfully!",
        description: "Thank you for your purchase. Your order has been received.",
      });
      
      // Redirect to home page
      navigate("/");
    } catch (error) {
      toast({
        title: "Checkout Failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Không cần kiểm tra cart null lớp
  // if (!cart) {
  //   return (
  //     <div className="container mx-auto px-4 py-8 text-center">
  //       <p>Loading checkout...</p>
  //     </div>
  //   );
  // }

  return (
    <div className="bg-white dark:bg-neutral-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="lg:w-2/3">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="(555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main Street" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="New York" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Zip Code</FormLabel>
                            <FormControl>
                              <Input placeholder="10001" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                              <Input placeholder="United States" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                  
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <FormControl>
                                <input
                                  type="radio"
                                  className="text-primary h-4 w-4"
                                  value="credit"
                                  checked={field.value === "credit"}
                                  onChange={() => field.onChange("credit")}
                                />
                              </FormControl>
                              <FormLabel className="cursor-pointer">Credit Card</FormLabel>
                            </div>
                            <div className="flex items-center space-x-2">
                              <FormControl>
                                <input
                                  type="radio"
                                  className="text-primary h-4 w-4"
                                  value="paypal"
                                  checked={field.value === "paypal"}
                                  onChange={() => field.onChange("paypal")}
                                />
                              </FormControl>
                              <FormLabel className="cursor-pointer">PayPal</FormLabel>
                            </div>
                            <div className="flex items-center space-x-2">
                              <FormControl>
                                <input
                                  type="radio"
                                  className="text-primary h-4 w-4"
                                  value="bank"
                                  checked={field.value === "bank"}
                                  onChange={() => field.onChange("bank")}
                                />
                              </FormControl>
                              <FormLabel className="cursor-pointer">Bank Transfer</FormLabel>
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {form.watch("paymentMethod") === "credit" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                        <div className="col-span-2">
                          <Label>Card Number</Label>
                          <Input placeholder="1234 5678 9012 3456" defaultValue="4242 4242 4242 4242" />
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                            Đây là số thẻ test - không thực hiện giao dịch thật
                          </p>
                        </div>
                        <div>
                          <Label>Expiration Date</Label>
                          <Input placeholder="MM/YY" defaultValue="12/25" />
                        </div>
                        <div>
                          <Label>CVC</Label>
                          <Input placeholder="123" defaultValue="123" />
                        </div>
                        <div className="col-span-2 mt-2">
                          <div className="flex space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="24" viewBox="0 0 40 24"><path fill="#253B80" d="M34 24H6c-3.3 0-6-2.7-6-6V6c0-3.3 2.7-6 6-6h28c3.3 0 6 2.7 6 6v12c0 3.3-2.7 6-6 6z"/><path fill="#179BD7" d="M25.4 7.2c-.2-.7-.8-1.2-1.5-1.2h-5.6c-.3 0-.6.2-.7.5L15 18.9c0 .2.1.4.4.4h2.8c.3 0 .5-.2.6-.5l.6-2.4c.1-.3.3-.5.6-.5h1.9c2.7 0 4.9-2 5.4-4.7.2-1.4 0-2.5-.5-3.3-.5-.4-1.2-.7-2-1zm.3 3.7c-.3 1.6-1.5 2.6-3.1 2.6H21l.6-2.8c0-.2.2-.3.4-.3h.8c.9 0 1.7 0 2.3.6.2.2.4.6.4 1.1-.1-.1 0-.1 0-.1z"/><path fill="#253B80" d="M12.7 7.2c-.2-.7-.8-1.2-1.5-1.2H5.6c-.3 0-.6.2-.7.5L2.3 18.9c0 .2.1.4.4.4h2.7c.3 0 .5-.2.6-.4l.7-2.5c.1-.3.3-.5.6-.5h1.9c2.7 0 4.9-2 5.4-4.7.2-1.4 0-2.5-.5-3.3-.5-.4-1.2-.7-2-1zm.2 3.7c-.3 1.6-1.5 2.6-3.1 2.6H8.2l.6-2.8c0-.2.2-.3.4-.3h.8c.9 0 1.7 0 2.3.6.3.2.4.6.4 1.1l.1-.1z"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="24" viewBox="0 0 40 24"><path fill="#FFB600" d="M34 24H6c-3.3 0-6-2.7-6-6V6c0-3.3 2.7-6 6-6h28c3.3 0 6 2.7 6 6v12c0 3.3-2.7 6-6 6z"/><path fill="#F7981D" d="M40 12c0 3.3-2.7 6-6 6H6c-3.3 0-6-2.7-6-6"/><path fill="#E79800" d="M40 12c0-3.3-2.7-6-6-6H6c-3.3 0-6 2.7-6 6"/><circle fill="#FFF" cx="20" cy="12" r="9"/><path fill="#1A1F71" d="M21.1 5.9l-1.2 5.5h-1.9l1.2-5.5h1.9zm7.6 3.5c-.4-.2-.9-.2-1.4-.2h-2.6l-.2.8h2.5c.2 0 .5 0 .7.1.2.2.2.4.2.7-.1.3-.2.5-.3.6-.2.2-.5.2-.9.2h-.8l-.2.8h.9c.2.8.6 1.3 1.6 1.3.4 0 .7-.1 1-.3l.3-.3-.4-.5c-.2.2-.4.3-.7.3-.2 0-.6-.2-.6-.6h1.3c.2-.6.2-1.3-.4-1.9zm-.8 1.4h-.9c0-.5.3-.5.5-.5.3 0 .4.2.4.5zm-6.6-1.4c-.5-.2-1.1-.2-1.6.2-.4.3-.6.7-.6 1.2-.1.9.5 1.3 1.2 1.6.3.1.6.2.6.5 0 .3-.4.4-.6.4-.4 0-.8-.2-1-.4l-.3.5c.4.3.8.5 1.3.5.6 0 1.2-.3 1.3-.9.2-.7 0-1.1-.7-1.5-.3-.2-.7-.2-.7-.5 0-.2.2-.3.4-.3.3 0 .6.1.8.2l.2-.5zm-3.7-.2h-1.3l-1.2 3h-1.6l-1-2.4c.4-.2.8-.6 1-1 .2-.5.2-1.1 0-1.6h1.4c.2.4.2.9 0 1.3-.1.2-.3.3-.5.3h-.2l.5 1.4.9-2.6h1.9l-1.2 5.5h-1.9l.8-3.9zm-10.5 0c-.5 0-1 .3-1.1.8l-.7 3.6h1.2l.5-2.4h.6c.2 0 .3.1.3.2.1.3 0 .5-.1.8L7 11.2h1.2l.1-.7c.2-.7.2-1-.3-1.3.2-.2.4-.4.5-.7.1-.3 0-.6-.1-.8-.3-.4-.7-.4-1.2-.4zm.1.9c.1 0 .2 0 .3.1.1.1.1.2.1.3-.1.2-.2.3-.4.3h-.6l.2-.7h.4z"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="24" viewBox="0 0 40 24"><path fill="#FFF" d="M34 24H6c-3.3 0-6-2.7-6-6V6c0-3.3 2.7-6 6-6h28c3.3 0 6 2.7 6 6v12c0 3.3-2.7 6-6 6z"/><path fill="#DFE3E8" d="M40 12c0 3.3-2.7 6-6 6H6c-3.3 0-6-2.7-6-6"/><path fill="#34495E" d="M4 12a2 2 0 100 4 2 2 0 000-4zm0 3a1 1 0 110-2 1 1 0 010 2z"/><path fill="#34495E" d="M36 12a2 2 0 100 4 2 2 0 000-4zm0 3a1 1 0 110-2 1 1 0 010 2z"/><path fill="#34495E" d="M25 12.1a2 2 0 100 3.9 2 2 0 000-3.9zm0 2.9a1 1 0 110-2 1 1 0 010 2zm-10-2.9a2 2 0 100 3.9 2 2 0 000-3.9zm0 2.9a1 1 0 110-2 1 1 0 010 2zm5-2.9a2 2 0 100 3.9 2 2 0 000-3.9zm0 2.9a1 1 0 110-2 1 1 0 010 2z"/><path fill="#34495E" d="M12 8v8h16V8H12zm1 1h14v6H13V9z"/></svg>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-sm">
                  <FormField
                    control={form.control}
                    name="saveInfo"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          Save this information for next time
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="font-normal cursor-pointer">
                            I agree to the <a href="/terms" className="text-primary hover:underline">Terms and Conditions</a> and <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full mt-6 py-6 bg-primary hover:bg-primary/90 text-white"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : "Place Order"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-4">
                {/* Sản phẩm mẫu 1 */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-700 rounded overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=256&h=256&auto=format&fit=crop" 
                      alt="iPhone 13 Pro" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">iPhone 13 Pro</h4>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      Qty: 1
                    </p>
                  </div>
                  <div className="font-semibold">
                    $999.00
                  </div>
                </div>
                
                {/* Sản phẩm mẫu 2 */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-700 rounded overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1529336953128-a85760f58cb5?q=80&w=256&h=256&auto=format&fit=crop" 
                      alt="Apple AirPods Pro" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Apple AirPods Pro</h4>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      Qty: 1
                    </p>
                  </div>
                  <div className="font-semibold">
                    $249.00
                  </div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">$1,248.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold">Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span className="font-semibold">$99.84</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>$1,347.84</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
