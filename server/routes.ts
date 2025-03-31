import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertCartItemSchema } from "@shared/schema";
import { randomUUID } from "crypto";

export async function registerRoutes(app: Express): Promise<Server> {
  // Session handling middleware
  app.use((req, res, next) => {
    // Lấy sessionId từ header hoặc tạo mới nếu chưa có
    const sessionId = req.headers['x-session-id'] as string || req.headers.sessionid as string || randomUUID();
    
    // Lưu sessionId vào request để sử dụng trong các route
    (req as any).sessionId = sessionId;
    
    // Trả về sessionId trong header cho client lưu trữ
    res.setHeader('X-Session-ID', sessionId);
    
    // Log thông tin debug
    console.log(`Request ${req.method} ${req.url}`, {
      reqSessionId: req.headers['x-session-id'] || req.headers.sessionid,
      newSessionId: sessionId
    });
    
    next();
  });

  // Get all products
  app.get("/api/products", async (req: Request, res: Response) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  // Get product by ID
  app.get("/api/products/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }

      const product = await storage.getProductById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Get products by category
  app.get("/api/products/category/:category", async (req: Request, res: Response) => {
    try {
      const category = req.params.category;
      const products = await storage.getProductsByCategory(category);
      res.json(products);
    } catch (error) {
      console.error("Error fetching products by category:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  // Get products by brand
  app.get("/api/products/brand/:brand", async (req: Request, res: Response) => {
    try {
      const brand = req.params.brand;
      const category = req.query.category as string | undefined;
      const products = await storage.getProductsByBrand(brand, category);
      res.json(products);
    } catch (error) {
      console.error("Error fetching products by brand:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  // Get cart items
  app.get("/api/cart", async (req: Request, res: Response) => {
    try {
      const sessionId = (req as any).sessionId;
      const cartItems = await storage.getCartItems(sessionId);
      
      // Calculate totals
      const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      const discount = cartItems.reduce((sum, item) => {
        const itemDiscount = item.product.discount ? (item.product.price * item.quantity * item.product.discount / 100) : 0;
        return sum + itemDiscount;
      }, 0);
      const total = subtotal - discount;
      
      res.json({
        items: cartItems,
        subtotal,
        discount,
        total,
        itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0)
      });
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ message: "Failed to fetch cart items" });
    }
  });

  // Add item to cart
  app.post("/api/cart", async (req: Request, res: Response) => {
    try {
      const sessionId = (req as any).sessionId;
      
      console.log("POST /api/cart - Adding item with sessionId:", sessionId);
      console.log("Request body:", req.body);
      
      // Validate request body
      const result = insertCartItemSchema.safeParse({
        ...req.body,
        sessionId
      });
      
      if (!result.success) {
        console.error("Invalid cart item data:", result.error.format());
        return res.status(400).json({ message: "Invalid cart item data", errors: result.error.format() });
      }
      
      // Check if product exists
      const product = await storage.getProductById(result.data.productId);
      if (!product) {
        console.error("Product not found:", result.data.productId);
        return res.status(404).json({ message: "Product not found" });
      }
      
      // Check if item already exists in cart
      const existingItem = await storage.getCartItemByProductId(sessionId, result.data.productId);
      let cartItem;
      
      if (existingItem) {
        console.log("Updating existing cart item:", existingItem);
        cartItem = await storage.updateCartItemQuantity(
          existingItem.id, 
          existingItem.quantity + (result.data.quantity || 1)
        );
      } else {
        console.log("Adding new item to cart:", result.data);
        cartItem = await storage.addToCart(result.data);
      }
      
      // Return full cart
      const cartItems = await storage.getCartItems(sessionId);
      console.log("Cart after add:", cartItems);
      
      const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      const discount = cartItems.reduce((sum, item) => {
        const itemDiscount = item.product.discount ? (item.product.price * item.quantity * item.product.discount / 100) : 0;
        return sum + itemDiscount;
      }, 0);
      const total = subtotal - discount;
      
      const response = {
        items: cartItems,
        subtotal,
        discount,
        total,
        itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0)
      };
      
      console.log("Sending response:", response);
      res.status(201).json(response);
    } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).json({ message: "Failed to add item to cart" });
    }
  });

  // Update cart item quantity
  app.put("/api/cart/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid cart item ID" });
      }
      
      const { quantity } = req.body;
      if (typeof quantity !== 'number' || quantity < 0) {
        return res.status(400).json({ message: "Invalid quantity" });
      }
      
      const updatedItem = await storage.updateCartItemQuantity(id, quantity);
      if (!updatedItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      const sessionId = (req as any).sessionId;
      const cartItems = await storage.getCartItems(sessionId);
      const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      const discount = cartItems.reduce((sum, item) => {
        const itemDiscount = item.product.discount ? (item.product.price * item.quantity * item.product.discount / 100) : 0;
        return sum + itemDiscount;
      }, 0);
      const total = subtotal - discount;
      
      res.json({
        items: cartItems,
        subtotal,
        discount,
        total,
        itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0)
      });
    } catch (error) {
      console.error("Error updating cart item:", error);
      res.status(500).json({ message: "Failed to update cart item" });
    }
  });

  // Remove item from cart
  app.delete("/api/cart/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid cart item ID" });
      }
      
      const removed = await storage.removeFromCart(id);
      if (!removed) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      const sessionId = (req as any).sessionId;
      const cartItems = await storage.getCartItems(sessionId);
      const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      const discount = cartItems.reduce((sum, item) => {
        const itemDiscount = item.product.discount ? (item.product.price * item.quantity * item.product.discount / 100) : 0;
        return sum + itemDiscount;
      }, 0);
      const total = subtotal - discount;
      
      res.json({
        items: cartItems,
        subtotal,
        discount,
        total,
        itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0)
      });
    } catch (error) {
      console.error("Error removing cart item:", error);
      res.status(500).json({ message: "Failed to remove cart item" });
    }
  });

  // Clear cart
  app.delete("/api/cart", async (req: Request, res: Response) => {
    try {
      const sessionId = (req as any).sessionId;
      await storage.clearCart(sessionId);
      
      res.json({
        items: [],
        subtotal: 0,
        discount: 0,
        total: 0,
        itemCount: 0
      });
    } catch (error) {
      console.error("Error clearing cart:", error);
      res.status(500).json({ message: "Failed to clear cart" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
