import { 
  products, type Product, type InsertProduct,
  cartItems, type CartItem, type InsertCartItem, 
  users, type User, type InsertUser,
  type CartItemWithProduct
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, data: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<User>;
  updatePassword(id: number, newPassword: string): Promise<boolean>;

  // Products
  getAllProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getProductsByBrand(brand: string, category?: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;

  // Cart
  getCartItems(sessionId: string): Promise<CartItemWithProduct[]>;
  getCartItemByProductId(sessionId: string, productId: number): Promise<CartItem | undefined>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<boolean>;
  clearCart(sessionId: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private cart: Map<number, CartItem>;
  userCurrentId: number;
  productCurrentId: number;
  cartCurrentId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.cart = new Map();
    this.userCurrentId = 1;
    this.productCurrentId = 1;
    this.cartCurrentId = 1;

    // Initialize with demo products
    this.initializeProducts();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const now = new Date().toISOString();
    const user: User = { 
      ...insertUser, 
      id, 
      role: "user", 
      createdAt: now,
      fullName: insertUser.fullName || null,
      phone: insertUser.phone || null
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, data: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<User> {
    const user = this.users.get(id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    const updatedUser = { ...user, ...data };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async updatePassword(id: number, newPassword: string): Promise<boolean> {
    const user = this.users.get(id);
    if (!user) {
      return false;
    }

    const updatedUser = { ...user, password: newPassword };
    this.users.set(id, updatedUser);
    return true;
  }

  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.category === category
    );
  }

  async getProductsByBrand(brand: string, category?: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.brand === brand && (category ? product.category === category : true)
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productCurrentId++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  // Cart methods
  async getCartItems(sessionId: string): Promise<CartItemWithProduct[]> {
    const items = Array.from(this.cart.values()).filter(
      (item) => item.sessionId === sessionId
    );

    return items.map(item => {
      const product = this.products.get(item.productId);
      if (!product) {
        throw new Error(`Product with id ${item.productId} not found`);
      }
      return { ...item, product };
    });
  }

  async getCartItemByProductId(sessionId: string, productId: number): Promise<CartItem | undefined> {
    return Array.from(this.cart.values()).find(
      (item) => item.sessionId === sessionId && item.productId === productId
    );
  }

  async addToCart(insertCartItem: InsertCartItem): Promise<CartItem> {
    // Check if this product is already in the cart
    const existingItem = await this.getCartItemByProductId(
      insertCartItem.sessionId, 
      insertCartItem.productId
    );

    if (existingItem) {
      // Update quantity if it exists
      return await this.updateCartItemQuantity(
        existingItem.id, 
        existingItem.quantity + insertCartItem.quantity
      ) as CartItem;
    }

    // Create new cart item
    const id = this.cartCurrentId++;
    const cartItem: CartItem = { ...insertCartItem, id };
    this.cart.set(id, cartItem);
    return cartItem;
  }

  async updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined> {
    const cartItem = this.cart.get(id);
    if (!cartItem) return undefined;

    if (quantity <= 0) {
      this.cart.delete(id);
      return cartItem;
    }

    const updatedItem = { ...cartItem, quantity };
    this.cart.set(id, updatedItem);
    return updatedItem;
  }

  async removeFromCart(id: number): Promise<boolean> {
    return this.cart.delete(id);
  }

  async clearCart(sessionId: string): Promise<boolean> {
    const itemsToDelete = Array.from(this.cart.values())
      .filter(item => item.sessionId === sessionId)
      .map(item => item.id);

    itemsToDelete.forEach(id => this.cart.delete(id));
    return true;
  }

  // Initialize with sample products
  private initializeProducts() {
    const phones = [
      {
        name: "iPhone 13 Pro",
        description: "Apple's flagship smartphone with A15 Bionic chip, ProMotion display, and improved cameras.",
        price: 999,
        category: "phone",
        brand: "Apple",
        image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=400&auto=format&fit=crop",
        rating: 4.5,
        reviews: 120,
        discount: 0,
        isNew: true,
        stock: 50
      },
      {
        name: "Samsung Galaxy S21",
        description: "Flagship Android phone with stunning camera system and 120Hz display.",
        price: 899,
        category: "phone",
        brand: "Samsung",
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=400&auto=format&fit=crop",
        rating: 4.4,
        reviews: 95,
        discount: 10,
        isNew: false,
        stock: 30
      }
    ];

    const laptops = [
      {
        name: "MacBook Pro 14",
        description: "Powerful laptop with M1 Pro chip, stunning display and great battery life.",
        price: 1999,
        category: "laptop",
        brand: "Apple",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=400&auto=format&fit=crop",
        rating: 4.8,
        reviews: 75,
        discount: 0,
        isNew: true,
        stock: 20
      },
      {
        name: "Dell XPS 13",
        description: "Premium ultrabook with InfinityEdge display and Intel Core i7.",
        price: 1299,
        category: "laptop",
        brand: "Dell",
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=400&auto=format&fit=crop",
        rating: 4.6,
        reviews: 60,
        discount: 15,
        isNew: false,
        stock: 25
      }
    ];

    const tablets = [
      {
        name: "iPad Air",
        description: "Versatile tablet with M1 chip and beautiful Liquid Retina display.",
        price: 599,
        category: "tablet",
        brand: "Apple",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=400&auto=format&fit=crop",
        rating: 4.7,
        reviews: 88,
        discount: 0,
        isNew: true,
        stock: 40
      }
    ];

    const accessories = [
      {
        name: "AirPods Pro",
        description: "Premium wireless earbuds with active noise cancellation.",
        price: 249,
        category: "accessories",
        brand: "Apple",
        image: "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?q=80&w=400&auto=format&fit=crop",
        rating: 4.6,
        reviews: 150,
        discount: 5,
        isNew: false,
        stock: 100
      }
    ];


    // Add all products to the storage
    [...phones, ...laptops, ...tablets, ...accessories].forEach(product => {
      const id = this.productCurrentId++;
      this.products.set(id, { ...product, id });
    });
  }
}

export const storage = new MemStorage();