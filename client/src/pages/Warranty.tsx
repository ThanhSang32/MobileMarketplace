import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Shield, Headphones, RefreshCcw } from '@/components/ui/icons';

const Warranty: React.FC = () => {
  return (
    <div className="bg-white dark:bg-neutral-900">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Chính Sách Bảo Hành</h1>

        <div className="max-w-4xl mx-auto">
          {/* Warranty Overview */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <Shield className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold">Tổng Quan Chính Sách Bảo Hành</h2>
            </div>
            <Separator className="mb-6" />

            <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg mb-8">
              <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                TechStore cam kết mang đến cho khách hàng sự an tâm khi mua sắm với chính sách bảo hành toàn diện. Chúng tôi cung cấp dịch vụ bảo hành chính hãng cho tất cả sản phẩm, đảm bảo khách hàng không phải lo lắng khi sản phẩm gặp sự cố.
              </p>

              <h3 className="text-lg font-semibold mb-2">Cam Kết Của TechStore:</h3>
              <ul className="list-disc pl-6 space-y-2 text-neutral-600 dark:text-neutral-300">
                <li>Bảo hành chính hãng theo tiêu chuẩn của nhà sản xuất</li>
                <li>Quy trình bảo hành nhanh chóng, minh bạch</li>
                <li>Đội ngũ kỹ thuật chuyên nghiệp, được đào tạo bài bản</li>
                <li>Linh kiện thay thế chính hãng 100%</li>
                <li>Hỗ trợ tư vấn kỹ thuật 24/7</li>
              </ul>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">Thời Gian Bảo Hành</h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                  Thời gian bảo hành sẽ tùy theo từng loại sản phẩm và nhà sản xuất:
                </p>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white dark:bg-neutral-800 shadow-sm rounded-lg overflow-hidden">
                    <thead className="bg-neutral-100 dark:bg-neutral-700">
                      <tr>
                        <th className="py-3 px-4 text-left">Sản Phẩm</th>
                        <th className="py-3 px-4 text-left">Thời Gian Bảo Hành</th>
                        <th className="py-3 px-4 text-left">Ghi Chú</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                      <tr>
                        <td className="py-3 px-4">Điện thoại iPhone</td>
                        <td className="py-3 px-4">12 tháng</td>
                        <td className="py-3 px-4">Theo tiêu chuẩn Apple</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Điện thoại Samsung</td>
                        <td className="py-3 px-4">24 tháng</td>
                        <td className="py-3 px-4">Bảo hành chính hãng Samsung Việt Nam</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Laptop Apple</td>
                        <td className="py-3 px-4">12 tháng</td>
                        <td className="py-3 px-4">Có thể mua Apple Care+ để kéo dài thời gian bảo hành</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Laptop Dell, HP, Lenovo</td>
                        <td className="py-3 px-4">24-36 tháng</td>
                        <td className="py-3 px-4">Tùy dòng sản phẩm và gói bảo hành</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Tai nghe, Phụ kiện</td>
                        <td className="py-3 px-4">6-12 tháng</td>
                        <td className="py-3 px-4">Tùy thương hiệu và loại sản phẩm</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-neutral-600 dark:text-neutral-300 mt-4">
                  <em>Lưu ý: Thời gian bảo hành được tính từ ngày xuất hóa đơn. Khách hàng vui lòng giữ hóa đơn và phiếu bảo hành để được hỗ trợ khi cần thiết.</em>
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Phạm Vi Bảo Hành</h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                  Sản phẩm sẽ được bảo hành miễn phí nếu gặp các vấn đề sau:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-neutral-600 dark:text-neutral-300">
                  <li>Lỗi phần cứng do nhà sản xuất</li>
                  <li>Lỗi phần mềm hệ thống (không phải do người dùng cài đặt)</li>
                  <li>Sản phẩm không hoạt động đúng chức năng dù đã sử dụng theo hướng dẫn</li>
                  <li>Sự cố về pin (nằm trong tiêu chuẩn của nhà sản xuất)</li>
                  <li>Lỗi về màn hình (điểm chết, sọc màn hình, không hiển thị)</li>
                </ul>

                <p className="text-neutral-600 dark:text-neutral-300 mt-6 mb-4">
                  Các trường hợp <span className="font-semibold">KHÔNG</span> được bảo hành:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-neutral-600 dark:text-neutral-300">
                  <li>Sản phẩm hết thời hạn bảo hành</li>
                  <li>Sản phẩm bị hư hỏng do người dùng (va đập, rơi vỡ, vào nước)</li>
                  <li>Sản phẩm bị can thiệp, sửa chữa bởi đơn vị không được ủy quyền</li>
                  <li>Số serial, mã IMEI, tem bảo hành bị rách, mất hoặc không khớp</li>
                  <li>Lỗi phần mềm do người dùng cài đặt hoặc jailbreak/root</li>
                  <li>Hư hỏng do thiên tai, hỏa hoạn, điện áp không ổn định</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="py-8">
            <Separator />
          </div>

          {/* Warranty Process */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <RefreshCcw className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold">Quy Trình Bảo Hành</h2>
            </div>
            <Separator className="mb-6" />

            <div className="space-y-6">
              <p className="text-neutral-600 dark:text-neutral-300">
                Để đảm bảo việc bảo hành diễn ra thuận lợi và nhanh chóng, khách hàng vui lòng thực hiện theo quy trình sau:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg text-center">
                  <div className="bg-primary/10 rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold text-xl">1</span>
                  </div>
                  <h3 className="font-semibold mb-3">Liên Hệ TechStore</h3>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                    Thông báo về sự cố sản phẩm qua hotline 1800-123-456 hoặc mang trực tiếp đến cửa hàng
                  </p>
                </div>

                <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg text-center">
                  <div className="bg-primary/10 rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold text-xl">2</span>
                  </div>
                  <h3 className="font-semibold mb-3">Kiểm Tra & Xác Nhận</h3>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                    Nhân viên kỹ thuật sẽ kiểm tra sản phẩm và xác định nguyên nhân lỗi
                  </p>
                </div>

                <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg text-center">
                  <div className="bg-primary/10 rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold text-xl">3</span>
                  </div>
                  <h3 className="font-semibold mb-3">Xử Lý Bảo Hành</h3>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                    Sửa chữa hoặc thay thế linh kiện, cập nhật tiến độ cho khách hàng
                  </p>
                </div>
              </div>

              <div className="mt-4 text-center">
                <div className="w-1 h-8 bg-neutral-200 dark:bg-neutral-700 mx-auto"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto max-w-2xl">
                <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg text-center">
                  <div className="bg-primary/10 rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold text-xl">4</span>
                  </div>
                  <h3 className="font-semibold mb-3">Kiểm Tra Chất Lượng</h3>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                    Kiểm tra kỹ lưỡng sau khi sửa chữa để đảm bảo sản phẩm hoạt động hoàn hảo
                  </p>
                </div>

                <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg text-center">
                  <div className="bg-primary/10 rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold text-xl">5</span>
                  </div>
                  <h3 className="font-semibold mb-3">Bàn Giao & Hướng Dẫn</h3>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                    Bàn giao sản phẩm và hướng dẫn sử dụng, phòng tránh lỗi tương tự
                  </p>
                </div>
              </div>

              <div className="bg-primary/10 p-6 rounded-lg mt-8">
                <h3 className="text-xl font-semibold mb-3">Warranty Processing Time</h3>
                <ul className="list-disc pl-6 space-y-2 text-neutral-600 dark:text-neutral-300">
                  <li>
                    <span className="font-medium">Fast processing (1-3 business days):</span> Applies to minor issues with available replacement parts
                  </li>
                  <li>
                    <span className="font-medium">Standard processing (3-10 business days):</span> Applies to more complex issues requiring thorough inspection
                  </li>
                  <li>
                    <span className="font-medium">Special processing (10-30 days):</span> Applies to cases requiring manufacturer return or special parts ordering
                  </li>
                </ul>
                <p className="text-neutral-600 dark:text-neutral-300 mt-4">
                  <em>TechStore sẽ thông báo cụ thể thời gian xử lý cho từng trường hợp sau khi tiếp nhận và kiểm tra sản phẩm.</em>
                </p>
              </div>
            </div>
          </section>

          <div className="py-8">
            <Separator />
          </div>

          {/* Extended Warranty */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <Headphones className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold">Gói Bảo Hành Mở Rộng</h2>
            </div>
            <Separator className="mb-6" />

            <div className="space-y-6">
              <p className="text-neutral-600 dark:text-neutral-300">
                Ngoài gói bảo hành tiêu chuẩn, TechStore còn cung cấp các gói bảo hành mở rộng giúp khách hàng an tâm hơn khi sử dụng sản phẩm:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden">
                  <div className="bg-neutral-100 dark:bg-neutral-800 p-4">
                    <h3 className="text-lg font-semibold text-center">Gói Bảo Vệ Cơ Bản</h3>
                  </div>
                  <div className="p-6">
                    <div className="text-center mb-4">
                      <span className="text-3xl font-bold">+6 tháng</span>
                      <p className="text-neutral-500 dark:text-neutral-400">gia hạn bảo hành</p>
                    </div>
                    <ul className="space-y-2 text-neutral-600 dark:text-neutral-300 mb-6">
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Gia hạn bảo hành thêm 6 tháng
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Ưu tiên xử lý bảo hành
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Miễn phí vệ sinh sản phẩm 1 lần
                      </li>
                    </ul>
                    <div className="text-center">
                      <span className="block text-2xl font-bold text-primary mb-4">500.000 VNĐ</span>
                      <button className="w-full py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-md transition-colors">
                        Tìm Hiểu Thêm
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-2 border-primary rounded-lg overflow-hidden relative">
                  <div className="absolute top-0 right-0 bg-primary text-white text-xs px-2 py-1 rounded-bl-lg">
                    Phổ biến nhất
                  </div>
                  <div className="bg-primary/10 dark:bg-primary/20 p-4">
                    <h3 className="text-lg font-semibold text-center">Gói Bảo Vệ Toàn Diện</h3>
                  </div>
                  <div className="p-6">
                    <div className="text-center mb-4">
                      <span className="text-3xl font-bold">+12 tháng</span>
                      <p className="text-neutral-500 dark:text-neutral-400">gia hạn bảo hành</p>
                    </div>
                    <ul className="space-y-2 text-neutral-600 dark:text-neutral-300 mb-6">
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Gia hạn bảo hành thêm 12 tháng
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Bảo vệ rơi vỡ 1 lần
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Ưu tiên xử lý bảo hành
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Miễn phí vệ sinh sản phẩm 2 lần
                      </li>
                    </ul>
                    <div className="text-center">
                      <span className="block text-2xl font-bold text-primary mb-4">1.200.000 VNĐ</span>
                      <button className="w-full py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-md transition-colors">
                        Tìm Hiểu Thêm
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden">
                  <div className="bg-neutral-100 dark:bg-neutral-800 p-4">
                    <h3 className="text-lg font-semibold text-center">Gói Bảo Vệ Premium</h3>
                  </div>
                  <div className="p-6">
                    <div className="text-center mb-4">
                      <span className="text-3xl font-bold">+24 tháng</span>
                      <p className="text-neutral-500 dark:text-neutral-400">gia hạn bảo hành</p>
                    </div>
                    <ul className="space-y-2 text-neutral-600 dark:text-neutral-300 mb-6">
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Gia hạn bảo hành thêm 24 tháng
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Bảo vệ rơi vỡ 2 lần
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Hỗ trợ kỹ thuật ưu tiên 24/7
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Miễn phí vệ sinh sản phẩm không giới hạn
                      </li>
                    </ul>
                    <div className="text-center">
                      <span className="block text-2xl font-bold text-primary mb-4">2.500.000 VNĐ</span>
                      <button className="w-full py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-md transition-colors">
                        Tìm Hiểu Thêm
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-neutral-600 dark:text-neutral-300 text-sm mt-4">
                <em>Lưu ý: Gói bảo hành mở rộng phải được mua trong vòng 30 ngày kể từ ngày mua sản phẩm. Giá gói bảo hành mở rộng có thể thay đổi tùy theo giá trị và loại sản phẩm.</em>
              </p>
            </div>
          </section>

          {/* Contact */}
          <div className="mt-12 bg-primary/10 dark:bg-primary/5 rounded-lg p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Còn Thắc Mắc Về Bảo Hành?</h2>
            <p className="mb-6 text-neutral-600 dark:text-neutral-300">
              Liên hệ với đội ngũ hỗ trợ kỹ thuật của chúng tôi để được giải đáp mọi thắc mắc về bảo hành.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/contact" className="inline-flex items-center justify-center py-3 px-6 bg-primary hover:bg-primary/90 text-white font-medium rounded-md transition-colors">
                Liên Hệ Hỗ Trợ
              </a>
              <a href="/repair" className="inline-flex items-center justify-center py-3 px-6 bg-white dark:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 border border-neutral-200 dark:border-neutral-600 font-medium rounded-md transition-colors">
                Dịch Vụ Sửa Chữa
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Warranty;