
# BÁO CÁO ĐỒ ÁN SANGSTORE

## ABSTRACT

This project presents the development of SangStore, a modern e-commerce platform specializing in technology products. The system is built using React and TypeScript for the frontend, with Express.js and Node.js powering the backend infrastructure. The platform implements essential e-commerce functionalities including product browsing, shopping cart management, user authentication, and secure payment processing through Stripe integration. By leveraging contemporary web technologies and following best practices in software development, SangStore delivers a responsive, user-friendly shopping experience while maintaining robust security measures and efficient data management.

## ACKNOWLEDGEMENT

I would like to express my sincere gratitude to my project supervisor for their invaluable guidance and support throughout the development of this e-commerce platform. Their expertise and constructive feedback have significantly contributed to the success of this project.

I am also grateful to the faculty members of the Computer Science department for providing the necessary resources and knowledge that formed the foundation of this work. Special thanks to my fellow students for their collaborative spirit and technical discussions that helped refine various aspects of the project.

Additionally, I would like to acknowledge the open-source community for their contributions to the various libraries and frameworks used in this project, which made the development process more efficient and effective.

## 1. GIỚI THIỆU

### 1.1 Tổng quan
SangStore là một trang web thương mại điện tử được xây dựng bằng công nghệ hiện đại, cho phép người dùng mua sắm các sản phẩm công nghệ như điện thoại, laptop, tablet và phụ kiện.

### 1.2 Mục tiêu
- Xây dựng platform thương mại điện tử hoàn chỉnh
- Tối ưu trải nghiệm người dùng với giao diện thân thiện
- Tích hợp thanh toán trực tuyến an toàn
- Quản lý đơn hàng và kho hàng hiệu quả

## 2. CÔNG NGHỆ SỬ DỤNG

### 2.1 Frontend
- React 18 + TypeScript
- Tailwind CSS cho styling
- Shadcn UI cho components
- React Query cho state management
- React Hook Form cho form handling
- Wouter cho routing

### 2.2 Backend
- Node.js + Express.js
- TypeScript
- Drizzle ORM cho database
- Session-based authentication
- RESTful API

### 2.3 Tools & Services
- Git cho version control
- Stripe cho thanh toán
- Vite cho development server
- ESLint + TypeScript cho code quality

## 3. KIẾN TRÚC HỆ THỐNG

### 3.1 Frontend Architecture
- Component-based architecture
- Custom hooks cho logic tái sử dụng
- Context API cho global state
- Responsive design
- Progressive enhancement

### 3.2 Backend Architecture
- MVC pattern
- Middleware-based processing
- RESTful API endpoints
- Session management
- Error handling

## 4. TÍNH NĂNG CHÍNH

### 4.1 User Features
- Đăng ký/đăng nhập tài khoản
- Xem danh sách sản phẩm theo danh mục
- Tìm kiếm và lọc sản phẩm
- Giỏ hàng và thanh toán
- Theo dõi đơn hàng

### 4.2 Admin Features
- Quản lý sản phẩm
- Quản lý đơn hàng
- Quản lý người dùng
- Thống kê báo cáo

## 5. TRIỂN KHAI

### 5.1 Database Schema
- Users
- Products
- Categories
- Orders
- Cart Items
- Sessions

### 5.2 API Endpoints
- /api/auth/* - Authentication routes
- /api/products/* - Product management
- /api/cart/* - Shopping cart
- /api/orders/* - Order management

## 6. KẾT LUẬN

### 6.1 Kết quả đạt được
- Hoàn thành các tính năng cơ bản
- UI/UX thân thiện người dùng
- Performance tốt
- Codebase dễ maintain

### 6.2 Hướng phát triển
- Thêm tính năng đánh giá sản phẩm
- Tích hợp thêm phương thức thanh toán
- Thêm tính năng chat support
- Tối ưu SEO

## 7. TÀI LIỆU THAM KHẢO
- React Documentation
- TypeScript Handbook
- Tailwind CSS Documentation
- Express.js Guide
- Stripe API Documentation
