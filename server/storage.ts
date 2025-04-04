import { 
  products, type Product, type InsertProduct,
  cartItems, type CartItem, type InsertCartItem, 
  users, type User, type InsertUser,
  type CartItemWithProduct
} from "@shared/schema";



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
        image: "/images/iphone-13-pro.jpg",
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
        image: "/images/samsung-s21.jpg",
        rating: 4.4,
        reviews: 95,
        discount: 10,
        isNew: false,
        stock: 30
      },
      {
        name: "Xiaomi Mi 11",
        description: "Powerful Android phone with Snapdragon 888 and 108MP camera.",
        price: 699,
        category: "phone",
        brand: "Xiaomi",
        image: "/images/xiaomi-mi11.jpg",
        rating: 4.3,
        reviews: 85,
        discount: 15,
        isNew: false,
        stock: 40
      },
      {
        name: "OnePlus 9 Pro",
        description: "Premium phone with Hasselblad camera system.",
        price: 899,
        category: "phone",
        brand: "OnePlus",
        image: "/images/oneplus-9.jpg",
        rating: 4.6,
        reviews: 78,
        discount: 0,
        isNew: true,
        stock: 35
      },
      {
        name: "Google Pixel 6",
        description: "Pure Android experience with exceptional camera capabilities.",
        price: 799,
        category: "phone",
        brand: "Google",
        image: "/images/pixel-6.jpg",
        rating: 4.5,
        reviews: 92,
        discount: 5,
        isNew: true,
        stock: 45
      },
      {
        name: "Huawei P40 Pro",
        description: "Premium phone with Leica quad camera system.",
        price: 899,
        category: "phone",
        brand: "Huawei",
        image: "/images/huawei-p40.jpg",
        rating: 4.2,
        reviews: 65,
        discount: 20,
        isNew: false,
        stock: 25
      },
      {
        name: "Sony Xperia 1 III",
        description: "Professional-grade camera features and 4K display.",
        price: 1199,
        category: "phone",
        brand: "Sony",
        image: "/images/sony-xperia.jpg",
        rating: 4.4,
        reviews: 45,
        discount: 0,
        isNew: true,
        stock: 20
      },
      {
        name: "Oppo Find X3 Pro",
        description: "Innovative design with microscope camera.",
        price: 999,
        category: "phone",
        brand: "Oppo",
        image: "/images/oppo-find-x3.jpg",
        rating: 4.3,
        reviews: 55,
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
        image: "/images/macbook-pro-14.jpg",
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
        image: "/images/dell-xps-13.jpg",
        rating: 4.6,
        reviews: 60,
        discount: 15,
        isNew: false,
        stock: 25
      },
      {
        name: "Lenovo ThinkPad X1",
        description: "Business laptop with excellent keyboard and build quality.",
        price: 1599,
        category: "laptop",
        brand: "Lenovo",
        image: "/images/lenovo-thinkPad.jpg",
        rating: 4.7,
        reviews: 50,
        discount: 10,
        isNew: false,
        stock: 15
      },
      {
        name: "HP Spectre x360",
        description: "Convertible laptop with stunning design.",
        price: 1399,
        category: "laptop",
        brand: "HP",
        image: "/images/hp-spectre.jpg",
        rating: 4.5,
        reviews: 55,
        discount: 10,
        isNew: false,
        stock: 30
      },
      {
        name: "Asus ROG Zephyrus",
        description: "Premium gaming laptop with RTX 4080",
        price: 2199,
        category: "laptop", 
        brand: "Asus",
        image: "/images/asus-Zephyrus.jpg",
        rating: 4.8,
        reviews: 85,
        discount: 5,
        isNew: true,
        stock: 20
      },
      {
        name: "MSI Creator Z16",
        description: "Creator focused laptop with stunning display",
        price: 1899,
        category: "laptop",
        brand: "MSI",
        image: "/images/msi-creator-Z16.jpg",
        rating: 4.6,
        reviews: 45,
        discount: 12,
        isNew: true,
        stock: 25
      },
      {
        name: "Acer Swift 5",
        description: "Ultra-light laptop with powerful performance.",
        price: 999,
        category: "laptop",
        brand: "Acer",
        image: "/images/acer-Swift 5.jpg",
        rating: 4.3,
        reviews: 35,
        discount: 20,
        isNew: false,
        stock: 40
      },
      {
        name: "Microsoft Surface Laptop 4",
        description: "Premium design with excellent display.",
        price: 1299,
        category: "laptop",
        brand: "Microsoft",
        image: "/images/microsoft-surface.jpg",
        rating: 4.6,
        reviews: 55,
        discount: 10,
        isNew: true,
        stock: 25
      },
      {
        name: "Razer Blade 15",
        description: "Premium gaming laptop with sleek design.",
        price: 1999,
        category: "laptop",
        brand: "Razer",
        image: "/images/razer-blade.jpg",
        rating: 4.7,
        reviews: 30,
        discount: 0,
        isNew: true,
        stock: 15
      }
    ];

    const tablets = [
      {
        name: "iPad Air",
        description: "Versatile tablet with M1 chip and beautiful Liquid Retina display.",
        price: 599,
        category: "tablet",
        brand: "Apple",
        image: "/images/iPad-Air.jpg",
        rating: 4.7,
        reviews: 88,
        discount: 0,
        isNew: true,
        stock: 40
      },
      {
        name: "Samsung Galaxy Tab S7+",
        description: "Premium Android tablet with S Pen support.",
        price: 849,
        category: "tablet",
        brand: "Samsung",
        image: "/images/samsung-galaxy-tabs7.jpg",
        rating: 4.6,
        reviews: 75,
        discount: 10,
        isNew: false,
        stock: 35
      },
      {
        name: "Microsoft Surface Pro 8",
        description: "Versatile 2-in-1 tablet with Windows 11.",
        price: 999,
        category: "tablet",
        brand: "Microsoft",
        image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=400&auto=format&fit=crop",
        rating: 4.5,
        reviews: 60,
        discount: 0,
        isNew: true,
        stock: 25
      },
      {
        name: "Lenovo Tab P11 Pro",
        description: "Android tablet with OLED display.",
        price: 499,
        category: "tablet",
        brand: "Lenovo",
        image: "https://images.unsplash.com/photo-1587033411391-5d9e51cce126?q=80&w=400&auto=format&fit=crop",
        rating: 4.3,
        reviews: 45,
        discount: 15,
        isNew: false,
        stock: 30
      },
      {
        name: "Huawei MatePad Pro",
        description: "Premium tablet with stylus support.",
        price: 649,
        category: "tablet",
        brand: "Huawei",
        image: "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?q=80&w=400&auto=format&fit=crop",
        rating: 4.4,
        reviews: 40,
        discount: 5,
        isNew: true,
        stock: 20
      },
      {
        name: "Amazon Fire HD 10",
        description: "Affordable tablet for entertainment.",
        price: 149,
        category: "tablet",
        brand: "Amazon",
        image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=400&auto=format&fit=crop",
        rating: 4.2,
        reviews: 120,
        discount: 20,
        isNew: false,
        stock: 50
      },
      {
        name: "Xiaomi Pad 5",
        description: "High-performance Android tablet.",
        price: 399,
        category: "tablet",
        brand: "Xiaomi",
        image: "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?q=80&w=400&auto=format&fit=crop",
        rating: 4.5,
        reviews: 55,
        discount: 10,
        isNew: true,
        stock: 35
      },
      {
        name: "ASUS ZenPad 3S 10",
        description: "Multimedia tablet with premium audio.",
        price: 299,
        category: "tablet",
        brand: "ASUS",
        image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=400&auto=format&fit=crop",
        rating: 4.1,
        reviews: 35,
        discount: 15,
        isNew: false,
        stock: 25
      },
      {
        name: "Lenovo Tab P12 Pro",
        description: "Premium Android tablet with Snapdragon processor",
        price: 699,
        category: "tablet",
        brand: "Lenovo",
        image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=400&auto=format&fit=crop",
        rating: 4.5,
        reviews: 65,
        discount: 8,
        isNew: true,
        stock: 30
      },
      {
        name: "Microsoft Surface Pro 9",
        description: "Versatile Windows tablet with keyboard support",
        price: 999,
        category: "tablet",
        brand: "Microsoft",
        image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=400&auto=format&fit=crop",
        rating: 4.7,
        reviews: 85,
        discount: 10,
        isNew: true,
        stock: 35
      }
    ];

    const wearables = [
      {
        name: "Apple Watch Series 7",
        description: "Advanced smartwatch with health monitoring and cellular connectivity",
        price: 399,
        category: "wearables",
        brand: "Apple",
        image: "/images/apple-watch-series7.jpg",
        rating: 4.8,
        reviews: 245,
        discount: 0,
        isNew: true,
        stock: 75
      },
      {
        name: "Samsung Galaxy Watch 5",
        description: "Premium Android smartwatch with advanced fitness tracking",
        price: 279,
        category: "wearables",
        brand: "Samsung",
        image: "/images/galaxy-watch-5.jpg",
        rating: 4.6,
        reviews: 180,
        discount: 10,
        isNew: true,
        stock: 60
      },
      {
        name: "Fitbit Sense 2",
        description: "Advanced health and fitness smartwatch with ECG",
        price: 299,
        category: "wearables",
        brand: "Fitbit",
        image: "/images/fitbit-sense-2.jpg",
        rating: 4.5,
        reviews: 156,
        discount: 15,
        isNew: false,
        stock: 45
      },
      {
        name: "Garmin Venu 2",
        description: "GPS smartwatch with advanced health monitoring",
        price: 349,
        category: "wearables",
        brand: "Garmin",
        image: "/images/garmin-venu-2.jpg",
        rating: 4.7,
        reviews: 134,
        discount: 0,
        isNew: true,
        stock: 40
      },
      {
        name: "Xiaomi Mi Band 7",
        description: "Affordable fitness tracker with AMOLED display",
        price: 49,
        category: "wearables",
        brand: "Xiaomi",
        image: "/images/mi-band-7.jpg",
        rating: 4.4,
        reviews: 320,
        discount: 20,
        isNew: false,
        stock: 100
      },
      {
        id: 10,
        name: "Smartwatch Pro X",
        description: "Advanced smartwatch with health tracking and notifications",
        price: 299.99,
        category: "wearables",
        brand: "TechWear",
        image: "images/smartwatch-pro.jpg",
        rating: 4.5,
        reviews: 128,
        discount: 10,
        isNew: true,
        stock: 45
      },
      {
        id: 11,
        name: "Fitness Band Ultra",
        description: "Lightweight fitness tracker with heart rate monitoring",
        price: 89.99,
        category: "wearables",
        brand: "FitTech",
        image: "images/fitness-band.jpg",
        rating: 4.3,
        reviews: 95,
        discount: 0,
        isNew: true,
        stock: 60
      },
      {
        id: 12,
        name: "Smart Ring Plus",
        description: "Smart ring with gesture controls and health tracking",
        price: 199.99,
        category: "wearables",
        brand: "TechWear",
        image: "images/smart-ring.jpg",
        rating: 4.0,
        reviews: 45,
        discount: 5,
        isNew: false,
        stock: 30
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
      },
      {
        name: "Samsung Galaxy Watch 4",
        description: "Advanced smartwatch with health tracking.",
        price: 249,
        category: "accessories",
        brand: "Samsung",
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=400&auto=format&fit=crop",
        rating: 4.5,
        reviews: 120,
        discount: 15,
        isNew: true,
        stock: 80
      },
      {
        name: "Apple Magic Keyboard",
        description: "Premium wireless keyboard for Mac.",
        price: 99,
        category: "accessories",
        brand: "Apple",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=400&auto=format&fit=crop",
        rating: 4.7,
        reviews: 90,
        discount: 0,
        isNew: false,
        stock: 60
      },
      {
        name: "Logitech MX Master 3",
        description: "Advanced wireless mouse for productivity.",
        price: 99,
        category: "accessories",
        brand: "Logitech",
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=400&auto=format&fit=crop",
        rating: 4.8,
        reviews: 100,
        discount: 10,
        isNew: false,
        stock: 70
      },
      {
        name: "Sony WH-1000XM4",
        description: "Premium noise-cancelling headphones.",
        price: 349,
        category: "accessories",
        brand: "Sony",
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=400&auto=format&fit=crop",
        rating: 4.9,
        reviews: 200,
        discount: 20,
        isNew: true,
        stock: 50
      },
      {
        name: "Anker PowerCore",
        description: "High-capacity portable charger.",
        price: 49,
        category: "accessories",
        brand: "Anker",
        image: "images/anker.jpg",
        rating: 4.4,
        reviews: 300,
        discount: 25,
        isNew: false,
        stock: 150
      },
      {
        name: "Samsung T7 SSD",
        description: "Portable external SSD drive.",
        price: 159,
        category: "accessories",
        brand: "Samsung",
        image: "images/samsungt7.jpg",
        rating: 4.6,
        reviews: 80,
        discount: 0,
        isNew: true,
        stock: 40
      },
      {
        name: "Razer BlackShark V2",
        description: "Gaming headset with THX audio.",
        price: 99,
        category: "accessories",
        brand: "Razer",
        image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=400&auto=format&fit=crop",
        rating: 4.5,
        reviews: 150,
        discount: 15,
        isNew: false,
        stock: 90
      },
      {
        id: 20,
        name: "Premium Headphones",
        description: "High-quality wireless headphones with noise cancellation",
        price: 249.99,
        category: "accessories",
        brand: "AudioTech",
        image: "images/headphones.jpg",
        rating: 4.7,
        reviews: 156,
        discount: 15,
        isNew: true,
        stock: 35
      },
      {
        id: 21,
        name: "Wireless Power Bank",
        description: "20000mAh power bank with wireless charging capability",
        price: 79.99,
        category: "accessories",
        brand: "PowerTech",
        image: "images/powerbank.jpg",
        rating: 4.6,
        reviews: 89,
        discount: 0,
        isNew: true,
        stock: 50
      },
      {
        id: 22,
        name: "Premium Phone Case",
        description: "Durable protection case with card holder",
        price: 39.99,
        category: "accessories",
        brand: "CasePro",
        image: "images/phone-case.jpg",
        rating: 4.4,
        reviews: 112,
        discount: 10,
        isNew: false,
        stock: 75
      }
    ];


    // Add all products to the storage
    [...phones, ...laptops, ...tablets, ...wearables, ...accessories].forEach(product => {
      const id = this.productCurrentId++;
      this.products.set(id, { ...product, id });
    });
  }
}

export const storage = new MemStorage();