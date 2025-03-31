import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Truck, RefreshCcw, ShoppingBag } from '@/components/ui/icons';

const Shipping: React.FC = () => {
  return (
    <div className="bg-white dark:bg-neutral-900">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Chính Sách Vận Chuyển & Đổi Trả</h1>
        
        <div className="max-w-4xl mx-auto">
          {/* Shipping Policy */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <Truck className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold">Chính Sách Vận Chuyển</h2>
            </div>
            <Separator className="mb-6" />
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Thời Gian Giao Hàng</h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                  TechStore cam kết giao hàng nhanh chóng và đúng hẹn. Thời gian giao hàng dự kiến như sau:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-neutral-600 dark:text-neutral-300">
                  <li>
                    <span className="font-medium">Nội thành Hà Nội & TP.HCM:</span> 1-2 ngày làm việc
                  </li>
                  <li>
                    <span className="font-medium">Các thành phố lớn khác:</span> 2-3 ngày làm việc
                  </li>
                  <li>
                    <span className="font-medium">Các tỉnh thành khác:</span> 3-5 ngày làm việc
                  </li>
                  <li>
                    <span className="font-medium">Khu vực miền núi, hải đảo:</span> 5-7 ngày làm việc
                  </li>
                </ul>
                <p className="text-neutral-600 dark:text-neutral-300 mt-4">
                  <em>Lưu ý: Thời gian giao hàng có thể bị ảnh hưởng bởi điều kiện thời tiết, giao thông hoặc các sự kiện đặc biệt.</em>
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Phí Vận Chuyển</h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                  Phí vận chuyển được tính dựa trên khoảng cách và trọng lượng sản phẩm. Chúng tôi áp dụng các chính sách ưu đãi sau:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-neutral-600 dark:text-neutral-300">
                  <li>
                    <span className="font-medium">Miễn phí vận chuyển</span> cho đơn hàng từ 500.000 VNĐ trở lên (áp dụng toàn quốc)
                  </li>
                  <li>
                    <span className="font-medium">Phí vận chuyển cố định 30.000 VNĐ</span> cho đơn hàng dưới 500.000 VNĐ tại nội thành Hà Nội và TP.HCM
                  </li>
                  <li>
                    <span className="font-medium">Phí vận chuyển từ 30.000 - 100.000 VNĐ</span> cho đơn hàng dưới 500.000 VNĐ đến các tỉnh thành khác
                  </li>
                </ul>
                <p className="text-neutral-600 dark:text-neutral-300 mt-4">
                  <em>Phí vận chuyển chính xác sẽ được hiển thị trong quá trình thanh toán, sau khi bạn nhập địa chỉ giao hàng.</em>
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Phương Thức Vận Chuyển</h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                  TechStore hợp tác với các đối tác vận chuyển uy tín để đảm bảo hàng hóa được giao đến tay bạn an toàn và đúng hẹn:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-neutral-600 dark:text-neutral-300">
                  <li>
                    <span className="font-medium">Giao hàng tiêu chuẩn:</span> Giao hàng thông thường với các đối tác như GHN, GHTK, Viettel Post
                  </li>
                  <li>
                    <span className="font-medium">Giao hàng nhanh:</span> Dịch vụ giao hàng ưu tiên trong 24h (chỉ áp dụng cho nội thành Hà Nội và TP.HCM)
                  </li>
                  <li>
                    <span className="font-medium">Nhận tại cửa hàng:</span> Khách hàng có thể chọn nhận hàng tại các cửa hàng TechStore gần nhất (miễn phí)
                  </li>
                </ul>
              </div>
            </div>
          </section>
          
          <div className="py-8">
            <Separator />
          </div>
          
          {/* Return Policy */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <RefreshCcw className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold">Chính Sách Đổi Trả</h2>
            </div>
            <Separator className="mb-6" />
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Return Conditions</h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                  TechStore is committed to ensuring customer satisfaction with products purchased from our store. Products are eligible for return when:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-neutral-600 dark:text-neutral-300">
                  <li>
                    Product is within the return period (7 days from receipt)
                  </li>
                  <li>
                    Product is intact, with all labels, packaging, and accessories included
                  </li>
                  <li>
                    Product has no dấu hiệu đã qua sử dụng, va đập, trầy xước, hư hỏng
                  </li>
                  <li>
                    Có hóa đơn mua hàng hoặc phiếu giao hàng kèm theo
                  </li>
                </ul>
                <p className="text-neutral-600 dark:text-neutral-300 mt-4">
                  <em>Lưu ý: Một số sản phẩm sẽ không được áp dụng chính sách đổi trả như tai nghe in-ear, phụ kiện cá nhân, phần mềm đã kích hoạt bản quyền.</em>
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Quy Trình Đổi Trả</h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                  Để đổi trả sản phẩm, khách hàng vui lòng thực hiện theo các bước sau:
                </p>
                <ol className="list-decimal pl-6 space-y-2 text-neutral-600 dark:text-neutral-300">
                  <li>
                    Liên hệ bộ phận CSKH của SangStore qua số hotline 0337170559 hoặc email support@sangstore.com để thông báo về việc đổi/trả
                  </li>
                  <li>
                    Cung cấp thông tin đơn hàng, lý do đổi/trả và hình ảnh sản phẩm (nếu cần)
                  </li>
                  <li>
                    Nhận mã đổi/trả và hướng dẫn đóng gói sản phẩm
                  </li>
                  <li>
                    Gửi sản phẩm về địa chỉ của TechStore hoặc mang trực tiếp đến cửa hàng
                  </li>
                  <li>
                    Sau khi nhận được sản phẩm và kiểm tra, TechStore sẽ tiến hành đổi sản phẩm mới hoặc hoàn tiền trong vòng 7 ngày làm việc
                  </li>
                </ol>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Hình Thức Hoàn Tiền</h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                  TechStore cung cấp các hình thức hoàn tiền sau:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-neutral-600 dark:text-neutral-300">
                  <li>
                    <span className="font-medium">Hoàn tiền vào tài khoản ngân hàng:</span> Thời gian xử lý từ 3-5 ngày làm việc
                  </li>
                  <li>
                    <span className="font-medium">Hoàn tiền vào thẻ tín dụng/ghi nợ:</span> Thời gian xử lý từ 7-14 ngày làm việc, tùy theo ngân hàng phát hành thẻ
                  </li>
                  <li>
                    <span className="font-medium">Đổi sang sản phẩm khác:</span> Có thể bù thêm hoặc hoàn lại tiền chênh lệch nếu giá sản phẩm mới khác với sản phẩm cũ
                  </li>
                </ul>
              </div>
            </div>
          </section>
          
          <div className="py-8">
            <Separator />
          </div>
          
          {/* Contact */}
          <section className="bg-neutral-50 dark:bg-neutral-800 p-8 rounded-lg mt-6">
            <div className="flex items-center gap-4 mb-6">
              <ShoppingBag className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold">Hỗ Trợ Vận Chuyển & Đổi Trả</h2>
            </div>
            
            <p className="text-neutral-600 dark:text-neutral-300 mb-6">
              Nếu bạn có thắc mắc về chính sách vận chuyển và đổi trả, hoặc cần hỗ trợ với đơn hàng, vui lòng liên hệ với chúng tôi qua các kênh sau:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Hotline Hỗ Trợ:</h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  1800-123-456 (miễn phí, 8:00 - 20:00 hàng ngày)
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Email Hỗ Trợ:</h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  support@techstore.com
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Địa Chỉ Gửi Hàng Đổi/Trả:</h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  TechStore - Phòng Đổi Trả<br />
                  123 Đường Công Nghệ, Quận 1<br />
                  TP. Hồ Chí Minh, Việt Nam
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Thời Gian Làm Việc:</h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  Thứ Hai - Thứ Sáu: 8:00 - 20:00<br />
                  Thứ Bảy - Chủ Nhật: 9:00 - 18:00
                </p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <a href="/contact" className="inline-flex items-center justify-center py-3 px-6 bg-primary hover:bg-primary/90 text-white font-medium rounded-md transition-colors">
                Liên Hệ Hỗ Trợ
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Shipping;