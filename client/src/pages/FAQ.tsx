import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ: React.FC = () => {
  const faqCategories = [
    {
      title: "Sản Phẩm & Đặt Hàng",
      items: [
        {
          question: "Làm thế nào để tìm sản phẩm trên website?",
          answer: "Bạn có thể tìm sản phẩm thông qua thanh tìm kiếm ở đầu trang, hoặc duyệt qua các danh mục sản phẩm như Điện thoại, Laptop trong menu chính. Bạn cũng có thể lọc sản phẩm theo thương hiệu, giá cả và các tính năng khác."
        },
        {
          question: "Sản phẩm có bảo hành chính hãng không?",
          answer: "Tất cả sản phẩm bán tại TechStore đều là hàng chính hãng và được bảo hành theo chính sách của nhà sản xuất. Thời gian bảo hành thông thường từ 12-24 tháng tùy vào sản phẩm, và được ghi rõ trong thông tin sản phẩm."
        },
        {
          question: "Làm thế nào để đặt hàng trên website?",
          answer: "Để đặt hàng, hãy chọn sản phẩm bạn muốn mua, nhấn nút 'Thêm vào giỏ hàng'. Sau đó, bạn có thể tiếp tục mua sắm hoặc nhấn vào biểu tượng giỏ hàng để thanh toán. Trong quá trình thanh toán, bạn sẽ được yêu cầu nhập thông tin giao hàng và phương thức thanh toán."
        },
        {
          question: "Tôi có thể hủy đơn hàng sau khi đã đặt không?",
          answer: "Bạn có thể hủy đơn hàng trong vòng 24 giờ sau khi đặt, với điều kiện đơn hàng chưa được xử lý để giao. Để hủy đơn hàng, vui lòng liên hệ với bộ phận hỗ trợ khách hàng qua số hotline 1800-123-456 hoặc email support@techstore.com."
        }
      ]
    },
    {
      title: "Thanh Toán & Giá Cả",
      items: [
        {
          question: "TechStore chấp nhận những phương thức thanh toán nào?",
          answer: "Chúng tôi chấp nhận nhiều phương thức thanh toán bao gồm: thẻ tín dụng/ghi nợ (Visa, MasterCard, JCB), chuyển khoản ngân hàng, ví điện tử (MoMo, ZaloPay, VNPay), và thanh toán khi nhận hàng (COD)."
        },
        {
          question: "Tôi có được hoàn tiền nếu tìm thấy sản phẩm giá rẻ hơn ở nơi khác không?",
          answer: "TechStore cam kết đảm bảo giá cạnh tranh. Nếu bạn tìm thấy sản phẩm giống hệt với giá thấp hơn (từ cửa hàng uy tín khác) trong vòng 7 ngày sau khi mua, chúng tôi sẽ hoàn lại phần chênh lệch. Vui lòng liên hệ bộ phận CSKH để được hỗ trợ."
        },
        {
          question: "Tại sao tôi bị tính phí vận chuyển?",
          answer: "TechStore miễn phí vận chuyển cho các đơn hàng từ 500.000 VNĐ trở lên. Đối với đơn hàng dưới mức này, phí vận chuyển sẽ được tính dựa trên khoảng cách và trọng lượng sản phẩm. Phí vận chuyển sẽ được hiển thị rõ trong quá trình thanh toán."
        },
        {
          question: "Tôi có thể nhận hóa đơn VAT không?",
          answer: "Có, TechStore cung cấp hóa đơn VAT cho tất cả đơn hàng khi có yêu cầu. Bạn có thể yêu cầu xuất hóa đơn VAT trong quá trình thanh toán bằng cách chọn tùy chọn 'Yêu cầu hóa đơn VAT' và điền thông tin về công ty của bạn."
        }
      ]
    },
    {
      title: "Vận Chuyển & Giao Hàng",
      items: [
        {
          question: "Mất bao lâu để nhận được đơn hàng?",
          answer: "Thời gian giao hàng phụ thuộc vào vị trí của bạn. Đối với khu vực nội thành Hà Nội và TP.HCM, thời gian giao hàng thường là 1-2 ngày làm việc. Đối với các tỉnh thành khác, thời gian giao hàng khoảng 2-5 ngày làm việc."
        },
        {
          question: "Tôi có thể theo dõi đơn hàng của mình không?",
          answer: "Có, bạn có thể theo dõi đơn hàng của mình. Sau khi đặt hàng, bạn sẽ nhận được email xác nhận kèm theo mã đơn hàng và liên kết theo dõi. Bạn cũng có thể đăng nhập vào tài khoản TechStore của mình để theo dõi trạng thái đơn hàng."
        },
        {
          question: "TechStore có giao hàng quốc tế không?",
          answer: "Hiện tại, TechStore chỉ giao hàng trong lãnh thổ Việt Nam. Chúng tôi đang mở rộng dịch vụ để phục vụ khách hàng quốc tế và sẽ thông báo khi dịch vụ này được triển khai."
        },
        {
          question: "Tôi cần làm gì nếu đơn hàng bị trễ?",
          answer: "Nếu đơn hàng của bạn bị trễ so với thời gian giao hàng dự kiến, vui lòng liên hệ với bộ phận hỗ trợ khách hàng của chúng tôi qua số hotline 1800-123-456 hoặc email support@techstore.com. Chúng tôi sẽ kiểm tra và cập nhật tình trạng đơn hàng của bạn."
        }
      ]
    },
    {
      title: "Bảo Hành & Hỗ Trợ",
      items: [
        {
          question: "Làm thế nào để yêu cầu bảo hành sản phẩm?",
          answer: "Để yêu cầu bảo hành, bạn có thể mang sản phẩm đến trực tiếp cửa hàng TechStore gần nhất hoặc gửi sản phẩm đến trung tâm bảo hành của chúng tôi. Đừng quên mang theo hóa đơn mua hàng hoặc phiếu bảo hành. Bạn cũng có thể liên hệ bộ phận CSKH để được hướng dẫn chi tiết."
        },
        {
          question: "Chính sách đổi trả sản phẩm như thế nào?",
          answer: "TechStore cho phép đổi trả sản phẩm trong vòng 7 ngày kể từ ngày mua. Sản phẩm phải còn nguyên vẹn, đầy đủ phụ kiện, bao bì và không có dấu hiệu hư hỏng do người dùng. Một số sản phẩm như tai nghe, phụ kiện cá nhân có thể có điều kiện đổi trả đặc biệt."
        },
        {
          question: "Tôi cần làm gì nếu sản phẩm bị lỗi sau khi mua?",
          answer: "Nếu sản phẩm bị lỗi trong thời gian bảo hành, vui lòng liên hệ ngay với bộ phận hỗ trợ khách hàng. Chúng tôi sẽ hướng dẫn bạn cách thức để sửa chữa hoặc thay thế sản phẩm. Nếu sản phẩm bị lỗi trong 7 ngày đầu tiên sau khi mua, bạn có thể yêu cầu đổi sản phẩm mới."
        },
        {
          question: "TechStore có cung cấp dịch vụ sửa chữa không?",
          answer: "Có, TechStore cung cấp dịch vụ sửa chữa cho tất cả các sản phẩm do chúng tôi bán ra. Đối với sản phẩm trong thời gian bảo hành, dịch vụ sửa chữa (nếu thuộc phạm vi bảo hành) sẽ miễn phí. Đối với sản phẩm hết hạn bảo hành hoặc lỗi không thuộc phạm vi bảo hành, chúng tôi sẽ báo giá trước khi tiến hành sửa chữa."
        }
      ]
    }
  ];

  return (
    <div className="bg-white dark:bg-neutral-900">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Câu Hỏi Thường Gặp (FAQ)</h1>
        
        <div className="max-w-3xl mx-auto">
          <div className="grid gap-8">
            {faqCategories.map((category, index) => (
              <div key={index} className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">{category.title}</h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.items.map((item, itemIndex) => (
                    <AccordionItem key={itemIndex} value={`item-${index}-${itemIndex}`}>
                      <AccordionTrigger className="text-left font-medium">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-neutral-600 dark:text-neutral-300">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
          
          <div className="mt-12 bg-primary/10 dark:bg-primary/5 rounded-lg p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Bạn không tìm thấy câu trả lời?</h2>
            <p className="mb-6 text-neutral-600 dark:text-neutral-300">
              Nếu bạn không tìm thấy câu trả lời cho thắc mắc của mình, vui lòng liên hệ với chúng tôi.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/contact" className="inline-flex items-center justify-center py-3 px-6 bg-primary hover:bg-primary/90 text-white font-medium rounded-md transition-colors">
                Liên Hệ Hỗ Trợ
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

export default FAQ;