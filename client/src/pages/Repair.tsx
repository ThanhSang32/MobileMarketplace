import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Headphones, Shield, Phone } from '@/components/ui/icons';

const Repair: React.FC = () => {
  return (
    <div className="bg-white dark:bg-neutral-900">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Dịch Vụ Sửa Chữa</h1>
        
        <div className="max-w-4xl mx-auto">
          {/* Service Overview */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <Headphones className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold">Dịch Vụ Sửa Chữa Chuyên Nghiệp</h2>
            </div>
            <Separator className="mb-6" />
            
            <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg mb-8">
              <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                TechStore tự hào cung cấp dịch vụ sửa chữa thiết bị công nghệ chuyên nghiệp. Với đội ngũ kỹ thuật viên được đào tạo bài bản và trang thiết bị hiện đại, chúng tôi cam kết mang đến dịch vụ sửa chữa nhanh chóng, chất lượng cao và đáng tin cậy.
              </p>
              
              <h3 className="text-lg font-semibold mb-2">Ưu Điểm Dịch Vụ Sửa Chữa TechStore:</h3>
              <ul className="list-disc pl-6 space-y-2 text-neutral-600 dark:text-neutral-300">
                <li>Đội ngũ kỹ thuật viên chuyên nghiệp, được chứng nhận bởi các thương hiệu lớn</li>
                <li>Sử dụng linh kiện chính hãng 100%</li>
                <li>Quy trình làm việc minh bạch, thông báo chi phí trước khi sửa chữa</li>
                <li>Dịch vụ bảo hành sau sửa chữa từ 1-3 tháng</li>
                <li>Hỗ trợ sửa chữa tận nơi cho khách hàng doanh nghiệp</li>
              </ul>
            </div>
          </section>
          
          {/* Repair Services */}
          <section className="mb-12">
            <h3 className="text-xl font-semibold mb-6">Các Dịch Vụ Sửa Chữa</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Smartphone Repair */}
              <div className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-sm border border-neutral-200 dark:border-neutral-700">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Sửa Chữa Điện Thoại</h4>
                      <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-4">
                        Dịch vụ sửa chữa toàn diện cho điện thoại di động các thương hiệu
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h5 className="font-medium mb-2">Dịch vụ bao gồm:</h5>
                    <ul className="space-y-2 text-neutral-600 dark:text-neutral-300 text-sm">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Thay màn hình, pin, camera, loa, mic</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Sửa lỗi phần mềm, phục hồi dữ liệu</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Sửa lỗi nguồn, sạc không vào điện</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Xử lý điện thoại bị vào nước</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-neutral-50 dark:bg-neutral-700 p-4 flex justify-between items-center">
                  <div>
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">Từ</span>
                    <span className="font-semibold ml-1">200.000 VNĐ</span>
                  </div>
                  <a 
                    href="/contact" 
                    className="px-4 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Tư Vấn Ngay
                  </a>
                </div>
              </div>
              
              {/* Laptop Repair */}
              <div className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-sm border border-neutral-200 dark:border-neutral-700">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" strokeWidth="2" />
                        <path d="M7 21h10" strokeWidth="2" strokeLinecap="round" />
                        <path d="M12 17v4" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Sửa Chữa Laptop</h4>
                      <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-4">
                        Dịch vụ sửa chữa, nâng cấp cho laptop tất cả các thương hiệu
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h5 className="font-medium mb-2">Dịch vụ bao gồm:</h5>
                    <ul className="space-y-2 text-neutral-600 dark:text-neutral-300 text-sm">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Thay màn hình, bàn phím, pin, ổ cứng</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Sửa lỗi phần mềm, cài đặt hệ điều hành</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Nâng cấp RAM, SSD, card đồ họa</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Vệ sinh, bảo dưỡng, thay paste tản nhiệt</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-neutral-50 dark:bg-neutral-700 p-4 flex justify-between items-center">
                  <div>
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">Từ</span>
                    <span className="font-semibold ml-1">300.000 VNĐ</span>
                  </div>
                  <a 
                    href="/contact" 
                    className="px-4 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Tư Vấn Ngay
                  </a>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Tablet Repair */}
              <div className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-sm border border-neutral-200 dark:border-neutral-700">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect width="16" height="20" x="4" y="2" rx="2" strokeWidth="2" />
                        <line x1="12" x2="12" y1="18" y2="18" strokeWidth="2" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Sửa Chữa Máy Tính Bảng</h4>
                      <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-4">
                        Dịch vụ sửa chữa cho iPad và tablet Android các loại
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h5 className="font-medium mb-2">Dịch vụ bao gồm:</h5>
                    <ul className="space-y-2 text-neutral-600 dark:text-neutral-300 text-sm">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Thay màn hình, pin, camera, loa</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Sửa lỗi phần mềm, khôi phục cài đặt gốc</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Sửa lỗi cảm ứng, nút nguồn, nút home</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-neutral-50 dark:bg-neutral-700 p-4 flex justify-between items-center">
                  <div>
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">Từ</span>
                    <span className="font-semibold ml-1">300.000 VNĐ</span>
                  </div>
                  <a 
                    href="/contact" 
                    className="px-4 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Tư Vấn Ngay
                  </a>
                </div>
              </div>
              
              {/* Accessories Repair */}
              <div className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-sm border border-neutral-200 dark:border-neutral-700">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M20 7h-7l-3-3H4a1 1 0 00-1 1v12a1 1 0 001 1h16a1 1 0 001-1V8a1 1 0 00-1-1z" strokeWidth="2"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Sửa Chữa Phụ Kiện</h4>
                      <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-4">
                        Dịch vụ sửa chữa tai nghe, loa, đồng hồ thông minh và phụ kiện khác
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h5 className="font-medium mb-2">Dịch vụ bao gồm:</h5>
                    <ul className="space-y-2 text-neutral-600 dark:text-neutral-300 text-sm">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Sửa tai nghe, loa, đồng hồ thông minh</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Thay pin, dây đeo cho smartwatch</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Sửa lỗi kết nối, cập nhật phần mềm</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-neutral-50 dark:bg-neutral-700 p-4 flex justify-between items-center">
                  <div>
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">Từ</span>
                    <span className="font-semibold ml-1">150.000 VNĐ</span>
                  </div>
                  <a 
                    href="/contact" 
                    className="px-4 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Tư Vấn Ngay
                  </a>
                </div>
              </div>
            </div>
          </section>
          
          {/* Repair Process */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <Shield className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold">Quy Trình Sửa Chữa</h2>
            </div>
            <Separator className="mb-6" />
            
            <div className="space-y-8">
              <p className="text-neutral-600 dark:text-neutral-300">
                Tại TechStore, chúng tôi áp dụng quy trình sửa chữa chuyên nghiệp, minh bạch để đảm bảo chất lượng dịch vụ tốt nhất:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg text-center relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold">
                    1
                  </div>
                  <h3 className="font-semibold mt-4 mb-2">Tiếp Nhận</h3>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                    Kiểm tra ban đầu và ghi nhận tình trạng thiết bị
                  </p>
                </div>
                
                <div className="hidden md:block pt-6">
                  <div className="w-full border-t-2 border-dashed border-neutral-300 dark:border-neutral-600 mt-4"></div>
                </div>
                
                <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg text-center relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold">
                    2
                  </div>
                  <h3 className="font-semibold mt-4 mb-2">Kiểm Tra</h3>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                    Chẩn đoán lỗi chính xác và báo giá chi tiết
                  </p>
                </div>
                
                <div className="hidden md:block pt-6">
                  <div className="w-full border-t-2 border-dashed border-neutral-300 dark:border-neutral-600 mt-4"></div>
                </div>
                
                <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg text-center relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold">
                    3
                  </div>
                  <h3 className="font-semibold mt-4 mb-2">Sửa Chữa</h3>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                    Thực hiện sửa chữa với linh kiện chính hãng
                  </p>
                </div>
                
                <div className="hidden md:block pt-6">
                  <div className="w-full border-t-2 border-dashed border-neutral-300 dark:border-neutral-600 mt-4"></div>
                </div>
                
                <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg text-center relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold">
                    4
                  </div>
                  <h3 className="font-semibold mt-4 mb-2">Kiểm Tra & Bàn Giao</h3>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                    Kiểm tra kỹ lưỡng và bàn giao thiết bị đã sửa
                  </p>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Cam Kết Dịch Vụ</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <h4 className="font-semibold">Thời Gian Nhanh Chóng</h4>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                      Phần lớn các sửa chữa được hoàn thành trong 24-48 giờ, giảm thiểu thời gian chờ đợi
                    </p>
                  </div>
                  
                  <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <h4 className="font-semibold">Bảo Hành Sau Sửa Chữa</h4>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                      Tất cả dịch vụ sửa chữa đều được bảo hành từ 1-3 tháng tùy theo loại sửa chữa
                    </p>
                  </div>
                  
                  <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <h4 className="font-semibold">Minh Bạch Chi Phí</h4>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                      Báo giá chi tiết trước khi thực hiện sửa chữa, không có phí ẩn hay phát sinh
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* FAQ */}
          <section className="mt-12">
            <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Câu Hỏi Thường Gặp</h3>
              
              <div className="space-y-4">
                <div className="border-b border-neutral-200 dark:border-neutral-700 pb-4">
                  <h4 className="font-medium mb-2">Làm thế nào để đăng ký sử dụng dịch vụ sửa chữa?</h4>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                    Bạn có thể đăng ký sử dụng dịch vụ sửa chữa bằng cách gọi đến hotline 1800-123-456, đặt lịch qua website, hoặc mang thiết bị trực tiếp đến cửa hàng TechStore gần nhất.
                  </p>
                </div>
                
                <div className="border-b border-neutral-200 dark:border-neutral-700 pb-4">
                  <h4 className="font-medium mb-2">Có phí kiểm tra thiết bị không?</h4>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                    TechStore miễn phí kiểm tra và chẩn đoán lỗi cho tất cả thiết bị. Bạn chỉ phải trả phí khi đồng ý với báo giá sửa chữa và yêu cầu thực hiện sửa chữa.
                  </p>
                </div>
                
                <div className="border-b border-neutral-200 dark:border-neutral-700 pb-4">
                  <h4 className="font-medium mb-2">Có dịch vụ sửa chữa tại nhà không?</h4>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                    Có, TechStore cung cấp dịch vụ sửa chữa tại nhà đối với khách hàng doanh nghiệp và khách hàng VIP. Vui lòng liên hệ trước ít nhất 24 giờ để đặt lịch hẹn.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Có thể theo dõi tiến độ sửa chữa không?</h4>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                    Có, khi tiếp nhận thiết bị, bạn sẽ nhận được mã phiếu sửa chữa. Bạn có thể sử dụng mã này để tra cứu tiến độ sửa chữa trên website hoặc qua hotline hỗ trợ.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Contact */}
          <div className="mt-12 bg-primary/10 dark:bg-primary/5 rounded-lg p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Cần Hỗ Trợ Sửa Chữa?</h2>
            <p className="mb-6 text-neutral-600 dark:text-neutral-300">
              Liên hệ ngay với đội ngũ kỹ thuật của chúng tôi để được tư vấn và hỗ trợ nhanh chóng.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/contact" className="inline-flex items-center justify-center py-3 px-6 bg-primary hover:bg-primary/90 text-white font-medium rounded-md transition-colors">
                Liên Hệ Ngay
              </a>
              <a href="tel:1800123456" className="inline-flex items-center justify-center py-3 px-6 bg-white dark:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 border border-neutral-200 dark:border-neutral-600 font-medium rounded-md transition-colors">
                Gọi Hotline: 1800-123-456
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Repair;