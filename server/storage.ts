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
  createUser(user: InsertUser): Promise<User>;
  
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

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
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
    // Phones
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
        description: "Samsung's premium smartphone with Exynos 2100 processor, Dynamic AMOLED display, and versatile camera system.",
        price: 849,
        category: "phone",
        brand: "Samsung",
        image: "https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?q=80&w=400&auto=format&fit=crop",
        rating: 4.0,
        reviews: 95,
        discount: 15,
        isNew: false,
        stock: 45
      },
      {
        name: "Google Pixel 6",
        description: "Google's smartphone with custom Tensor chip, advanced camera features, and pure Android experience.",
        price: 799,
        category: "phone",
        brand: "Google",
        image: "https://images.unsplash.com/photo-1598965402089-897f5c1a6422?q=80&w=400&auto=format&fit=crop",
        rating: 5.0,
        reviews: 78,
        discount: 0,
        isNew: false,
        stock: 30
      },
      {
        name: "Xiaomi Mi 11",
        description: "Flagship smartphone with Snapdragon 888, 108MP camera, and fast charging capabilities.",
        price: 699,
        category: "phone",
        brand: "Xiaomi",
        image: "https://images.unsplash.com/photo-1546027658-7aa750153465?q=80&w=400&auto=format&fit=crop",
        rating: 3.5,
        reviews: 42,
        discount: 0,
        isNew: false,
        stock: 25
      }
    ];

    // Laptops
    const laptops = [
      {
        name: "MacBook Pro 14\"",
        description: "Apple's professional laptop with M1 Pro chip, Liquid Retina XDR display, and all-day battery life.",
        price: 1999,
        category: "laptop",
        brand: "Apple",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=400&auto=format&fit=crop",
        rating: 4.5,
        reviews: 145,
        discount: 0,
        isNew: false,
        stock: 20
      },
      {
        name: "Dell XPS 13",
        description: "Premium ultrabook with InfinityEdge display, Intel Core i7, and excellent build quality.",
        price: 1299,
        category: "laptop",
        brand: "Dell",
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=400&auto=format&fit=crop",
        rating: 4.0,
        reviews: 87,
        discount: 0,
        isNew: false,
        stock: 15
      },
      {
        name: "HP Spectre x360",
        description: "Convertible laptop with 360-degree hinge, Intel Evo platform, and stunning OLED display.",
        price: 1169,
        category: "laptop",
        brand: "HP",
        image: "https://images.unsplash.com/photo-1544731612-de7f96afe55f?q=80&w=400&auto=format&fit=crop",
        rating: 4.0,
        reviews: 63,
        discount: 10,
        isNew: false,
        stock: 18
      },
      {
        name: "Lenovo ThinkPad X1",
        description: "Business laptop with legendary keyboard, robust security features, and excellent performance.",
        price: 1449,
        category: "laptop",
        brand: "Lenovo",
        image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=400&auto=format&fit=crop",
        rating: 3.5,
        reviews: 52,
        discount: 0,
        isNew: false,
        stock: 22
      }
    ];

    // Add all products to the storage
    [...phones, ...laptops].forEach(product => {
      const id = this.productCurrentId++;
      this.products.set(id, { ...product, id });
    });
  }
}

export const storage = new MemStorage();
