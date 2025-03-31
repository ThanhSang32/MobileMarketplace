
# BÁO CÁO ĐỒ ÁN SANGSTORE
## E-COMMERCE PLATFORM FOR TECHNOLOGY PRODUCTS

### ABSTRACT

This project presents the development of SangStore, a modern e-commerce platform specializing in technology products. The system is built using React and TypeScript for the frontend, with Express.js and Node.js powering the backend infrastructure. The platform implements essential e-commerce functionalities including product browsing, shopping cart management, user authentication, and secure payment processing through Stripe integration. By leveraging contemporary web technologies and following best practices in software development, SangStore delivers a responsive, user-friendly shopping experience while maintaining robust security measures and efficient data management.

### ACKNOWLEDGEMENT

I would like to express my sincere gratitude to my project supervisor for their invaluable guidance and support throughout the development of this e-commerce platform. Their expertise and constructive feedback have significantly contributed to the success of this project.

I am also grateful to the faculty members of the Computer Science department for providing the necessary resources and knowledge that formed the foundation of this work. Special thanks to my fellow students for their collaborative spirit and technical discussions that helped refine various aspects of the project.

Additionally, I would like to acknowledge the open-source community for their contributions to the various libraries and frameworks used in this project, which made the development process more efficient and effective.

## CHƯƠNG 1: GIỚI THIỆU

### 1.1 Tổng quan dự án
SangStore là một nền tảng thương mại điện tử hiện đại, chuyên về các sản phẩm công nghệ. Dự án được xây dựng nhằm tạo ra một hệ thống mua sắm trực tuyến toàn diện, cho phép người dùng dễ dàng tìm kiếm, so sánh và mua sắm các sản phẩm công nghệ như điện thoại thông minh, laptop, máy tính bảng và các phụ kiện liên quan.

### 1.2 Mục tiêu dự án

#### 1.2.1 Mục tiêu tổng quát
Xây dựng một nền tảng thương mại điện tử chuyên nghiệp, mang đến trải nghiệm mua sắm trực tuyến thuận tiện, an toàn và hiệu quả cho người dùng trong lĩnh vực công nghệ.

#### 1.2.2 Mục tiêu cụ thể

##### Về chức năng hệ thống
- Xây dựng hệ thống quản lý sản phẩm đa dạng với nhiều danh mục
- Phát triển tính năng tìm kiếm và lọc sản phẩm thông minh
- Tích hợp hệ thống giỏ hàng và thanh toán trực tuyến an toàn
- Xây dựng hệ thống quản lý đơn hàng tự động
- Phát triển tính năng so sánh sản phẩm
- Tích hợp hệ thống đánh giá và bình luận sản phẩm

##### Về trải nghiệm người dùng
- Thiết kế giao diện người dùng thân thiện, responsive
- Tối ưu hóa tốc độ tải trang và hiệu suất hệ thống
- Cung cấp thông tin sản phẩm chi tiết và hình ảnh chất lượng cao
- Đơn giản hóa quy trình mua hàng và thanh toán

##### Về quản lý và vận hành
- Xây dựng hệ thống quản lý kho hàng hiệu quả
- Theo dõi và phân tích dữ liệu bán hàng
- Tự động hóa quy trình xử lý đơn hàng
- Quản lý thông tin khách hàng và lịch sử mua hàng

##### Về bảo mật
- Đảm bảo an toàn thông tin cá nhân của khách hàng
- Bảo mật trong giao dịch thanh toán
- Xác thực và phân quyền người dùng
- Bảo vệ dữ liệu hệ thống

### 1.3 Phạm vi dự án
- Xây dựng website thương mại điện tử hoàn chỉnh
- Tập trung vào các sản phẩm công nghệ
- Hỗ trợ đa nền tảng và thiết bị
- Tích hợp các phương thức thanh toán phổ biến

## CHƯƠNG 2: CƠ SỞ LÝ THUYẾT

### 2.1 Công nghệ sử dụng

#### 2.1.1 Frontend
- React 18: Framework JavaScript cho phát triển UI
- TypeScript: Ngôn ngữ lập trình mở rộng từ JavaScript
- Tailwind CSS: Framework CSS cho styling
- Shadcn UI: Thư viện components
- React Query: Quản lý state và data fetching
- React Hook Form: Xử lý form và validation
- Wouter: Routing cho ứng dụng

#### 2.1.2 Backend
- Node.js: Runtime environment
- Express.js: Web framework
- TypeScript: Ngôn ngữ lập trình
- Drizzle ORM: Object-Relational Mapping
- Session-based authentication: Xác thực người dùng
- RESTful API: Kiến trúc API

#### 2.1.3 Development Tools
- Git: Version control
- Stripe: Payment processing
- Vite: Development server và build tool
- ESLint: Code linting
- TypeScript: Type checking

### 2.2 Kiến trúc hệ thống

#### 2.2.1 Frontend Architecture
- Component-based architecture
- Custom hooks cho logic tái sử dụng
- Context API cho global state
- Responsive design
- Progressive enhancement

#### 2.2.2 Backend Architecture
- MVC pattern
- Middleware-based processing
- RESTful API endpoints
- Session management
- Error handling

## CHƯƠNG 3: PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG

### 3.1 Phân tích yêu cầu

#### 3.1.1 Yêu cầu chức năng
1. Quản lý sản phẩm
   - Thêm, sửa, xóa sản phẩm
   - Phân loại sản phẩm
   - Quản lý kho hàng
   
2. Quản lý người dùng
   - Đăng ký/đăng nhập
   - Quản lý thông tin cá nhân
   - Phân quyền người dùng

3. Quản lý đơn hàng
   - Tạo đơn hàng
   - Theo dõi trạng thái
   - Xử lý đơn hàng

4. Tính năng mua sắm
   - Tìm kiếm sản phẩm
   - Giỏ hàng
   - Thanh toán
   - So sánh sản phẩm

#### 3.1.2 Yêu cầu phi chức năng
1. Hiệu năng
   - Thời gian phản hồi nhanh
   - Tối ưu tải trang
   - Xử lý đồng thời nhiều người dùng

2. Bảo mật
   - Mã hóa dữ liệu
   - Xác thực người dùng
   - Bảo vệ thông tin thanh toán

3. Độ tin cậy
   - Sao lưu dữ liệu
   - Xử lý lỗi
   - Khả năng phục hồi

### 3.2 Thiết kế hệ thống

#### 3.2.1 Database Schema
1. Users
   - id: Primary key
   - email: String
   - password: String (hashed)
   - name: String
   - role: Enum

2. Products
   - id: Primary key
   - name: String
   - description: Text
   - price: Number
   - category: String
   - stock: Number

3. Orders
   - id: Primary key
   - userId: Foreign key
   - status: String
   - total: Number
   - created_at: Timestamp

4. OrderItems
   - id: Primary key
   - orderId: Foreign key
   - productId: Foreign key
   - quantity: Number
   - price: Number

#### 3.2.2 API Endpoints

1. Authentication
   ```
   POST /api/auth/register
   POST /api/auth/login
   GET /api/auth/me
   POST /api/auth/logout
   ```

2. Products
   ```
   GET /api/products
   GET /api/products/:id
   POST /api/products
   PUT /api/products/:id
   DELETE /api/products/:id
   ```

3. Orders
   ```
   GET /api/orders
   POST /api/orders
   GET /api/orders/:id
   PUT /api/orders/:id
   ```

4. Cart
   ```
   GET /api/cart
   POST /api/cart
   DELETE /api/cart/:id
   ```

## CHƯƠNG 4: TRIỂN KHAI VÀ KIỂM THỬ

### 4.1 Triển khai

#### 4.1.1 Môi trường phát triển
- IDE: Visual Studio Code
- Version Control: Git
- Package Manager: npm
- Database: PostgreSQL
- Hosting: Replit

#### 4.1.2 Quy trình triển khai
1. Khởi tạo dự án
2. Cài đặt dependencies
3. Cấu hình môi trường
4. Phát triển tính năng
5. Kiểm thử
6. Deploy

### 4.2 Kiểm thử

#### 4.2.1 Unit Testing
- Jest cho testing
- React Testing Library
- Coverage reports

#### 4.2.2 Integration Testing
- API endpoints
- Database operations
- Authentication flow

#### 4.2.3 End-to-end Testing
- User flows
- Payment processing
- Order management

## CHƯƠNG 5: KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN

### 5.1 Kết quả đạt được
- Hoàn thành các tính năng cơ bản
- UI/UX thân thiện người dùng
- Performance tốt
- Codebase dễ maintain
- Bảo mật đảm bảo
- Khả năng mở rộng cao

### 5.2 Hạn chế
- Chưa có tính năng chat support
- Chưa tối ưu SEO
- Chưa có mobile app
- Chưa có analytics dashboard

### 5.3 Hướng phát triển
1. Tính năng mới
   - Chat support real-time
   - Review và rating system
   - Wishlist
   - Recommendations engine

2. Tối ưu hóa
   - SEO optimization
   - Performance improvement
   - Mobile app development
   - Analytics integration

3. Mở rộng
   - Multi-language support
   - Multiple payment methods
   - Marketplace features
   - Social media integration

## TÀI LIỆU THAM KHẢO

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
