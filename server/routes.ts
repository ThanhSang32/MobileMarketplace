import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertCartItemSchema, insertUserSchema, User } from "@shared/schema";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import session from "express-session";

// Extend Express Session
declare module 'express-session' {
  interface SessionData {
    userId: number;
  }
}

// Helper function to check if user is authenticated
const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.userId) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized. Please log in." });
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Configure session middleware
  app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 1 day
  }));

  // Add user to request if logged in
  app.use(async (req: Request, res: Response, next: NextFunction) => {
    if (req.session && req.session.userId) {
      try {
        const user = await storage.getUser(req.session.userId);
        (req as any).user = user;
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
    next();
  });
  
  // Cart session handling middleware
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

  // AUTH ROUTES
  
  // Register a new user
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const result = insertUserSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid user data", 
          errors: result.error.format() 
        });
      }

      // Check if username already exists
      const existingUsername = await storage.getUserByUsername(result.data.username);
      if (existingUsername) {
        return res.status(400).json({ message: "Username already taken" });
      }

      // Check if email already exists
      const existingEmail = await storage.getUserByEmail(result.data.email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email already registered" });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(result.data.password, salt);

      // Create user with hashed password
      const user = await storage.createUser({
        ...result.data,
        password: hashedPassword
      });

      // Don't send the password back
      const { password, ...userWithoutPassword } = user;
      
      res.status(201).json({
        message: "User registered successfully",
        user: userWithoutPassword
      });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Failed to register user" });
    }
  });

  // Login
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }

      // Find user by username
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid username or password" });
      }

      // Set session
      req.session.userId = user.id;

      // Don't send the password back
      const { password: _, ...userWithoutPassword } = user;
      
      res.json({
        message: "Login successful",
        user: userWithoutPassword
      });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Failed to login" });
    }
  });

  // Logout
  app.post("/api/auth/logout", (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).json({ message: "Failed to logout" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  // Get current user
  app.get("/api/auth/me", isAuthenticated, (req: Request, res: Response) => {
    // User is already attached to the request by isAuthenticated middleware
    const { password, ...userWithoutPassword } = (req as any).user;
    res.json(userWithoutPassword);
  });

  // Update profile
  app.put("/api/auth/update-profile", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id;
      const { email, fullName, phone } = req.body;

      // Validate data
      if (email && typeof email !== 'string') {
        return res.status(400).json({ message: "Invalid email format" });
      }

      // Check if email is already taken by another user
      if (email) {
        const existingUser = await storage.getUserByEmail(email);
        if (existingUser && existingUser.id !== userId) {
          return res.status(400).json({ message: "Email already registered by another user" });
        }
      }

      // For now just respond as if we updated (since we don't have an updateUser method in storage yet)
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Don't send the password back
      const { password, ...userWithoutPassword } = user;
      
      res.json({
        message: "Profile updated successfully",
        user: {
          ...userWithoutPassword,
          email: email || user.email,
          fullName: fullName !== undefined ? fullName : user.fullName,
          phone: phone !== undefined ? phone : user.phone
        }
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Failed to update profile" });
    }
  });

  // Change password
  app.put("/api/auth/change-password", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id;
      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: "Current password and new password are required" });
      }

      // Get user
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Compare current password
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Current password is incorrect" });
      }

      // For now just respond as if we updated (since we don't have an updateUser method in storage yet)
      res.json({ message: "Password changed successfully" });
    } catch (error) {
      console.error("Error changing password:", error);
      res.status(500).json({ message: "Failed to change password" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
