
# SANGSTORE PROJECT REPORT

## ABSTRACT

This project presents the development of SangStore, a modern e-commerce platform specializing in technology products. The system is built using React and TypeScript for the frontend, with Express.js and Node.js powering the backend infrastructure. The platform implements essential e-commerce functionalities including product browsing, shopping cart management, user authentication, and secure payment processing through Stripe integration.

## ACKNOWLEDGEMENT

I would like to express my sincere gratitude to my project supervisor for their invaluable guidance and support throughout the development of this e-commerce platform. Their expertise and constructive feedback have significantly contributed to the success of this project.

## CHAPTER 1: OVERVIEW

### 1.1 Introduction
SangStore is an e-commerce platform specializing in technology products, built with modern web technologies to provide users with a convenient and secure online shopping experience. The project utilizes contemporary technologies and adheres to software development standards.

### 1.2 Objectives
#### General Objectives
- Build a complete e-commerce platform
- Optimize user experience with a friendly interface
- Integrate secure online payments
- Implement efficient order and inventory management

#### Specific Objectives
##### System Functionality
- Develop diverse product management system for multiple categories (phones, laptops, tablets, accessories)
- Implement intelligent search and filtering features
- Integrate secure online payment through Stripe
- Build automated order management system

##### User Experience
- Design user-friendly interface, accessible on all devices
- Optimize page load speed and system performance
- Provide detailed product information and high-quality images
- Integrate product rating and review features

##### Management and Operations
- Build efficient inventory management system
- Track and analyze sales data
- Automate order processing
- Manage customer information and purchase history

##### Security
- Ensure customer personal information security
- Secure payment transactions
- User authentication and authorization
- System data protection

## CHAPTER 2: THEORETICAL FOUNDATION

### 2.1 System Architecture
#### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Shadcn UI
- React Query
- React Hook Form
- Wouter: Application routing

#### Backend
- Node.js
- Express.js
- TypeScript
- Drizzle ORM
- Session-based authentication
- RESTful API

### 2.2 Technologies Used
#### Development Tools
- Visual Studio Code
- Git
- npm
- Vite
- ESLint: Code linting
- TypeScript: Type checking
- Stripe: Payment processing

## CHAPTER 3: ANALYSIS AND DESIGN

### 3.1 System Requirements
#### Functional Requirements
- User registration/login
- Shopping cart management
- Product search and filtering
- Online payment
- Order management (Order creation; Status tracking; Order processing)

#### Non-functional Requirements
- Fast response time
- User-friendly interface
- Data security (Data encryption; User authentication; Payment information protection)
- Scalability (Data backup; Error handling; Recovery capability)

### 3.2 System Design
#### Database Design
- Users Table (id: Primary key, email: String, password: String (hashed), name: String, role: Enum)
- Products Table (id: Primary key, name: String, description: Text, price: Number, category: String, stock: Number)
- Orders Table (id: Primary key, userId: Foreign key, status: String, total: Number, created_at: Timestamp)
- OrderItems Table (id: Primary key, orderId: Foreign key, productId: Foreign key, quantity: Number, price: Number)
- Categories Table

#### Interface Design
- Responsive design
- Mobile-first approach
- Dark mode support

## CHAPTER 4: IMPLEMENTATION

### 4.1 Development Environment
- Node.js runtime
- npm package manager
- Replit IDE
- Git version control
- PostgreSQL: Database

### 4.2 Source Code Structure
```
├── client/          # Frontend React application
├── server/          # Backend Express server
├── shared/          # Shared TypeScript types
└── docs/           # Documentation
```

### 4.3 Module Implementation
#### User Module
- Registration/Login
- Personal information management
- JWT authentication

#### Product Module
- Product listing
- Product details
- Search and filtering

#### Shopping Cart Module
- Add/remove products
- Update quantities
- Calculate total

## CHAPTER 5: TESTING AND EVALUATION

### 5.1 Testing
#### Unit Testing
- Jest framework
- React Testing Library
- API endpoint testing

#### Integration Testing
- End-to-end testing
- User flow testing
- Payment integration testing

### 5.2 Results Evaluation
#### Advantages
- User-friendly interface
- Good performance
- Complete functionality
- High security
- Maintainable codebase
- High scalability

#### Limitations
- Needs SEO optimization
- Lacks live chat feature
- Additional payment methods needed (no mobile app; no analytics dashboard)

## CHAPTER 6: CONCLUSION

### 6.1 Achievements
- Completed all set objectives
- Built a complete system
- Successfully applied modern technologies

### 6.2 Future Development
- AI integration for product recommendations
- Add live chat feature
- Expand product categories
- Performance optimization (SEO optimization; Performance improvement; Mobile app development; Analytics integration)
- Multi-language support
- Multiple payment methods
- Marketplace features
- Social media integration

## REFERENCES

1. React Documentation - https://reactjs.org/docs
2. TypeScript Handbook - https://www.typescriptlang.org/docs/
3. Express.js Guide - https://expressjs.com/en/guide/routing.html
4. Tailwind CSS Documentation - https://tailwindcss.com/docs
5. Stripe API Documentation - https://stripe.com/docs/api
6. Node.js Documentation - https://nodejs.org/en/docs/
7. PostgreSQL Documentation - https://www.postgresql.org/docs/
8. Git Documentation - https://git-scm.com/doc
9. REST API Design Rulebook - Mark Masse
10. Clean Code - Robert C. Martin
