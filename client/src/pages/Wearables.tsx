import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilter from '@/components/products/ProductFilter';
import { Separator } from '@/components/ui/separator';
import { Product } from '@shared/schema';

const Wearables: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  
  // Fetch products
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });
  
  // Filter wearables products
  const wearablesProducts = products.filter(
    product => product.category === 'wearables'
  );
  
  // Get unique brands
  const brands = Array.from(new Set(wearablesProducts.map(product => product.brand)));
  
  // Brand filter options
  const brandFilterOptions = [
    { value: 'all', label: 'All Brands' },
    ...brands.map(brand => ({ value: brand, label: brand }))
  ];
  
  // Type filter options
  const typeFilterOptions = [
    { value: 'all', label: 'All Devices' },
    { value: 'smartwatch', label: 'Smart Watches' },
    { value: 'fitnesstracker', label: 'Fitness Trackers' },
    { value: 'hearable', label: 'Wireless Earbuds' },
    { value: 'smartglasses', label: 'Smart Glasses' }
  ];
  
  // Apply filters
  const filteredProducts = wearablesProducts.filter(product => {
    const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
    
    // Determine type based on product name/description
    const type = product.name.toLowerCase().includes('watch') || product.description.toLowerCase().includes('watch')
      ? 'smartwatch' 
      : product.name.toLowerCase().includes('band') || product.name.toLowerCase().includes('tracker')
      ? 'fitnesstracker'
      : product.name.toLowerCase().includes('buds') || product.name.toLowerCase().includes('pods')
      ? 'hearable'
      : product.name.toLowerCase().includes('glass') || product.name.toLowerCase().includes('lens')
      ? 'smartglasses'
      : 'other';
      
    const matchesType = selectedType === 'all' || type === selectedType;
    
    return matchesBrand && matchesType;
  });
  
  // Handle filter changes
  const handleBrandFilterChange = (value: string) => {
    setSelectedBrand(value);
  };
  
  const handleTypeFilterChange = (value: string) => {
    setSelectedType(value);
  };
  
  return (
    <div className="bg-white dark:bg-neutral-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Thiết Bị Đeo Thông Minh</h1>
        <p className="text-neutral-600 dark:text-neutral-300 mb-8">
          Khám phá bộ sưu tập thiết bị đeo thông minh mới nhất từ các thương hiệu hàng đầu.
          Từ đồng hồ thông minh đến tai nghe không dây - tất cả đều có thiết kế hiện đại và tính năng tiên tiến.
        </p>
        
        {/* Hero banner */}
        <div className="relative rounded-lg overflow-hidden mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40"></div>
          <img 
            src="https://images.unsplash.com/photo-1544117519-cc0d19612622?q=80&w=2070&auto=format&fit=crop" 
            alt="Wearables collection" 
            className="w-full h-[300px] object-cover object-center"
          />
          <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Nâng Tầm Cuộc Sống Với Công Nghệ Đeo</h2>
            <p className="text-white/90 text-lg mb-6 max-w-lg">
              Thiết bị đeo thông minh giúp bạn theo dõi sức khỏe, kết nối liền mạch và tận hưởng tiện ích hàng ngày.
            </p>
            <button className="bg-white text-primary hover:bg-neutral-100 px-6 py-3 rounded-md font-medium transition-colors w-fit">
              Khám Phá Ngay
            </button>
          </div>
        </div>
        
        <Separator className="mb-8" />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with filters */}
          <div className="lg:col-span-1">
            <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Bộ Lọc</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="font-medium mb-4">Loại Thiết Bị</h3>
                  <ProductFilter 
                    options={typeFilterOptions}
                    selectedOption={selectedType}
                    onChange={handleTypeFilterChange}
                  />
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-4">Thương Hiệu</h3>
                  <ProductFilter 
                    options={brandFilterOptions}
                    selectedOption={selectedBrand}
                    onChange={handleBrandFilterChange}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-3">
            {/* Display number of results */}
            <div className="mb-6">
              <p className="text-neutral-600 dark:text-neutral-400">
                Hiển thị {filteredProducts.length} sản phẩm
              </p>
            </div>
            
            {/* Products grid */}
            <ProductGrid products={filteredProducts} isLoading={isLoading} />
            
            {/* No results message */}
            {!isLoading && filteredProducts.length === 0 && (
              <div className="py-12 text-center">
                <h3 className="text-xl font-semibold mb-4">Không tìm thấy sản phẩm</h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-6">
                  Không tìm thấy sản phẩm phù hợp với bộ lọc đã chọn.
                </p>
                <button 
                  onClick={() => {
                    setSelectedBrand('all');
                    setSelectedType('all');
                  }}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                  Xóa Bộ Lọc
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Features section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Tính Năng Nổi Bật</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg text-center">
              <div className="bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Theo Dõi Sức Khỏe</h3>
              <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                Đo nhịp tim, SpO2, theo dõi giấc ngủ và nhiều chỉ số sức khỏe khác 24/7
              </p>
            </div>
            
            <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg text-center">
              <div className="bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Thông Báo Thông Minh</h3>
              <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                Nhận thông báo cuộc gọi, tin nhắn và ứng dụng trực tiếp trên thiết bị đeo
              </p>
            </div>
            
            <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg text-center">
              <div className="bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Pin Siêu Bền</h3>
              <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                Thời lượng pin dài từ 5-14 ngày tùy thiết bị, luôn sẵn sàng đồng hành cùng bạn
              </p>
            </div>
            
            <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg text-center">
              <div className="bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Kết Nối Đa Nền Tảng</h3>
              <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                Tương thích với Android và iOS, đồng bộ hóa dữ liệu liền mạch với điện thoại của bạn
              </p>
            </div>
          </div>
        </div>
        
        {/* FAQ section */}
        <div className="mt-16 bg-neutral-50 dark:bg-neutral-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Câu Hỏi Thường Gặp</h2>
          <div className="space-y-4">
            <div className="border-b border-neutral-200 dark:border-neutral-700 pb-4">
              <h3 className="font-semibold mb-2">Thiết bị đeo có chống nước không?</h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                Hầu hết các thiết bị đeo tại TechStore đều có khả năng chống nước, với chuẩn kháng nước khác nhau từ IP67 đến IP68. Đồng hồ thông minh cao cấp còn có thể đeo khi bơi lội ở độ sâu tối đa 50m.
              </p>
            </div>
            
            <div className="border-b border-neutral-200 dark:border-neutral-700 pb-4">
              <h3 className="font-semibold mb-2">Thời lượng pin của thiết bị đeo thường là bao lâu?</h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                Thời lượng pin rất khác nhau tùy theo từng sản phẩm. Đồng hồ thông minh thường có thời lượng pin từ 1-5 ngày, trong khi vòng đeo tay theo dõi sức khỏe có thể kéo dài 7-14 ngày. Tai nghe không dây thường có thời lượng 5-8 giờ liên tục và có thể sạc thêm nhiều lần với hộp sạc.
              </p>
            </div>
            
            <div className="border-b border-neutral-200 dark:border-neutral-700 pb-4">
              <h3 className="font-semibold mb-2">Các thiết bị đeo có theo dõi được giấc ngủ không?</h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                Đúng vậy, hầu hết các đồng hồ thông minh và vòng đeo tay thông minh hiện nay đều có khả năng theo dõi giấc ngủ. Chúng có thể phân tích thời gian ngủ sâu, ngủ nhẹ, ngủ REM và thời gian thức giấc, giúp bạn hiểu rõ hơn về chất lượng giấc ngủ của mình.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wearables;