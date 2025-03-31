import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Phone, Mail } from '@/components/ui/icons';

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng điền đầy đủ các trường bắt buộc",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Đã gửi thông tin",
        description: "Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất!"
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="bg-white dark:bg-neutral-900">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Liên Hệ Với Chúng Tôi</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-neutral-50 dark:bg-neutral-800 p-8 rounded-lg text-center">
            <div className="flex justify-center mb-4">
              <MapPin className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Địa Chỉ</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              123 Đường Công Nghệ<br />
              Quận 1, TP. Hồ Chí Minh<br />
              Việt Nam
            </p>
          </div>
          
          <div className="bg-neutral-50 dark:bg-neutral-800 p-8 rounded-lg text-center">
            <div className="flex justify-center mb-4">
              <Phone className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Điện Thoại</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Tổng đài: 1800-123-456<br />
              Hỗ trợ kỹ thuật: 1800-789-012<br />
              Bán hàng: (028) 1234-5678
            </p>
          </div>
          
          <div className="bg-neutral-50 dark:bg-neutral-800 p-8 rounded-lg text-center">
            <div className="flex justify-center mb-4">
              <Mail className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Hỗ trợ: support@techstore.com<br />
              Bán hàng: sales@techstore.com<br />
              Thông tin chung: info@techstore.com
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Gửi Tin Nhắn</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">
                  Họ tên <span className="text-red-500">*</span>
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nhập họ tên của bạn"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-2 font-medium">
                  Email <span className="text-red-500">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Nhập địa chỉ email của bạn"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block mb-2 font-medium">
                  Tiêu đề
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Nhập tiêu đề"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 font-medium">
                  Nội dung <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Nhập nội dung tin nhắn"
                  rows={6}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full py-6 bg-primary hover:bg-primary/90 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Đang Gửi..." : "Gửi Tin Nhắn"}
              </Button>
            </form>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6">Vị Trí Cửa Hàng</h2>
            <div className="bg-neutral-100 dark:bg-neutral-800 h-[400px] rounded-lg flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Bản Đồ</h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Vị trí cửa hàng TechStore tại trung tâm TP. Hồ Chí Minh
                </p>
                <p className="text-neutral-500 dark:text-neutral-500 text-sm">
                  (Bản đồ sẽ được hiển thị ở đây - Google Maps integration)
                </p>
              </div>
            </div>
            
            <div className="mt-8 bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Giờ Làm Việc</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">Thứ Hai - Thứ Sáu:</span>
                  <span className="font-medium">8:00 - 20:00</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">Thứ Bảy:</span>
                  <span className="font-medium">9:00 - 18:00</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">Chủ Nhật:</span>
                  <span className="font-medium">10:00 - 16:00</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;