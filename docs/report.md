# BÁO CÁO ĐỒ ÁN SANGSTORE

## ABSTRACT

This project presents the development of SangStore, a modern e-commerce platform specializing in technology products. The system is built using React and TypeScript for the frontend, with Express.js and Node.js powering the backend infrastructure. The platform implements essential e-commerce functionalities including product browsing, shopping cart management, user authentication, and secure payment processing through Stripe integration.

## ACKNOWLEDGEMENT

I would like to express my sincere gratitude to my project supervisor for their invaluable guidance and support throughout the development of this e-commerce platform. Their expertise and constructive feedback have significantly contributed to the success of this project.

## CHƯƠNG 1: TỔNG QUAN

### 1.1 Giới thiệu
SangStore là một nền tảng thương mại điện tử chuyên về các sản phẩm công nghệ, được xây dựng với mục tiêu tạo ra trải nghiệm mua sắm trực tuyến thuận tiện và an toàn cho người dùng. Dự án sử dụng các công nghệ web hiện đại và tuân thủ các tiêu chuẩn phát triển phần mềm.

### 1.2 Mục tiêu
#### Mục tiêu tổng quát
- Xây dựng một nền tảng thương mại điện tử hoàn chỉnh
- Tối ưu hóa trải nghiệm người dùng
- Đảm bảo tính bảo mật và hiệu suất cao

#### Mục tiêu cụ thể
- Phát triển hệ thống quản lý sản phẩm đa dạng (Thêm, sửa, xóa sản phẩm; Phân loại sản phẩm; Quản lý kho hàng)
- Tích hợp thanh toán trực tuyến an toàn
- Xây dựng giao diện người dùng responsive
- Tối ưu hóa quy trình mua hàng (Tìm kiếm sản phẩm; Giỏ hàng; Thanh toán; So sánh sản phẩm)


### 1.3 Phạm vi
- Quản lý danh mục sản phẩm công nghệ
- Quản lý đơn hàng và thanh toán
- Quản lý người dùng và xác thực
- Tích hợp các dịch vụ bên thứ ba (Stripe)


## CHƯƠNG 2: CƠ SỞ LÝ THUYẾT

### 2.1 Kiến trúc hệ thống
#### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Shadcn UI
- React Query
- React Hook Form
- Wouter: Routing cho ứng dụng

#### Backend
- Node.js
- Express.js
- TypeScript
- Drizzle ORM
- Session-based authentication
- RESTful API


### 2.2 Công nghệ sử dụng
#### Development Tools
- Visual Studio Code
- Git
- npm
- Vite
- ESLint: Code linting
- TypeScript: Type checking
- Stripe: Payment processing


## CHƯƠNG 3: PHÂN TÍCH VÀ THIẾT KẾ

### 3.1 Yêu cầu hệ thống
#### Yêu cầu chức năng
- Đăng ký/đăng nhập người dùng
- Quản lý giỏ hàng
- Tìm kiếm và lọc sản phẩm
- Thanh toán trực tuyến
- Quản lý đơn hàng (Tạo đơn hàng; Theo dõi trạng thái; Xử lý đơn hàng)

#### Yêu cầu phi chức năng
- Thời gian phản hồi nhanh
- Giao diện thân thiện
- Bảo mật dữ liệu (Mã hóa dữ liệu; Xác thực người dùng; Bảo vệ thông tin thanh toán)
- Khả năng mở rộng (Sao lưu dữ liệu; Xử lý lỗi; Khả năng phục hồi)

### 3.2 Thiết kế hệ thống
#### Thiết kế cơ sở dữ liệu
- Bảng Users (id: Primary key, email: String, password: String (hashed), name: String, role: Enum)
- Bảng Products (id: Primary key, name: String, description: Text, price: Number, category: String, stock: Number)
- Bảng Orders (id: Primary key, userId: Foreign key, status: String, total: Number, created_at: Timestamp)
- Bảng OrderItems (id: Primary key, orderId: Foreign key, productId: Foreign key, quantity: Number, price: Number)
- Bảng Categories


#### Thiết kế giao diện
- Responsive design
- Mobile-first approach
- Dark mode support


## CHƯƠNG 4: TRIỂN KHAI

### 4.1 Môi trường phát triển
- Node.js runtime
- npm package manager
- Replit IDE
- Git version control
- PostgreSQL: Database


### 4.2 Cấu trúc mã nguồn
```
├── client/          # Frontend React application
├── server/          # Backend Express server
├── shared/          # Shared TypeScript types
└── docs/           # Documentation
```

### 4.3 Triển khai các module
#### Module người dùng
- Đăng ký/đăng nhập
- Quản lý thông tin cá nhân
- Xác thực JWT

#### Module sản phẩm
- Danh sách sản phẩm
- Chi tiết sản phẩm
- Tìm kiếm và lọc

#### Module giỏ hàng
- Thêm/xóa sản phẩm
- Cập nhật số lượng
- Tính tổng tiền

## CHƯƠNG 5: KIỂM THỬ VÀ ĐÁNH GIÁ

### 5.1 Kiểm thử
#### Unit Testing
- Jest framework
- React Testing Library
- API endpoint testing

#### Integration Testing
- End-to-end testing
- User flow testing
- Payment integration testing

### 5.2 Đánh giá kết quả
#### Ưu điểm
- Giao diện người dùng thân thiện
- Hiệu suất tốt
- Tính năng đầy đủ
- Bảo mật cao
- Codebase dễ maintain
- Khả năng mở rộng cao


#### Hạn chế
- Cần tối ưu hóa thêm cho SEO
- Chưa có tính năng chat trực tiếp
- Cần bổ sung thêm phương thức thanh toán (chưa có mobile app; chưa có analytics dashboard)

## CHƯƠNG 6: KẾT LUẬN

### 6.1 Kết quả đạt được
- Hoàn thành các mục tiêu đề ra
- Xây dựng được hệ thống hoàn chỉnh
- Áp dụng được các công nghệ hiện đại

### 6.2 Hướng phát triển
- Tích hợp AI cho gợi ý sản phẩm
- Thêm tính năng chat trực tiếp
- Mở rộng danh mục sản phẩm
- Tối ưu hóa hiệu suất (SEO optimization; Performance improvement; Mobile app development; Analytics integration)
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