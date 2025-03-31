import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilter from '@/components/products/ProductFilter';
import { Separator } from '@/components/ui/separator';
import { Product } from '@shared/schema';

const Accessories: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  
  // Fetch products
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });
  
  // Filter accessories products
  const accessoriesProducts = products.filter(
    product => product.category === 'accessories'
  );
  
  // Get unique brands
  const brands = Array.from(new Set(accessoriesProducts.map(product => product.brand)));
  
  // Define valid accessory types
  type AccessoryType = 'audio' | 'cases' | 'charging' | 'cables' | 'other';
  
  // Get accessory types from products
  const types = Array.from(new Set(accessoriesProducts.map(product => {
    const type: AccessoryType = product.name.includes('Headphones') || product.name.includes('Earbuds') 
      ? 'audio' 
      : product.name.includes('Case') || product.name.includes('Cover')
      ? 'cases'
      : product.name.includes('Charger') || product.name.includes('Power')
      ? 'charging'
      : product.name.includes('Cable') || product.name.includes('Adapter')
      ? 'cables'
      : 'other';
    return type;
  })));
  
  // Brand filter options
  const brandFilterOptions = [
    { value: 'all', label: 'Tất cả thương hiệu' },
    ...brands.map(brand => ({ value: brand, label: brand }))
  ];
  
  // Type filter options
  const typeFilterOptions = [
    { value: 'all', label: 'Tất cả phụ kiện' },
    { value: 'audio', label: 'Âm thanh' },
    { value: 'cases', label: 'Ốp lưng & Bao da' },
    { value: 'charging', label: 'Sạc & Pin' },
    { value: 'cables', label: 'Cáp & Adapter' },
    { value: 'other', label: 'Khác' }
  ].filter(option => option.value === 'all' || types.includes(option.value as AccessoryType));
  
  // Apply filters
  const filteredProducts = accessoriesProducts.filter(product => {
    const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
    
    const type: AccessoryType = product.name.includes('Headphones') || product.name.includes('Earbuds') 
      ? 'audio' 
      : product.name.includes('Case') || product.name.includes('Cover')
      ? 'cases'
      : product.name.includes('Charger') || product.name.includes('Power')
      ? 'charging'
      : product.name.includes('Cable') || product.name.includes('Adapter')
      ? 'cables'
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
        <h1 className="text-3xl font-bold mb-4">Phụ Kiện Công Nghệ</h1>
        <p className="text-neutral-600 dark:text-neutral-300 mb-8">
          Khám phá bộ sưu tập phụ kiện chất lượng cao cho điện thoại, laptop và các thiết bị công nghệ khác.
          Từ tai nghe, ốp lưng đến sạc dự phòng - tất cả đều được bảo hành chính hãng.
        </p>
        
        <Separator className="mb-8" />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with filters */}
          <div className="lg:col-span-1">
            <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Bộ Lọc</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="font-medium mb-4">Loại Phụ Kiện</h3>
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
        
        {/* Popular accessories */}
        {filteredProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Phụ Kiện Phổ Biến</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {accessoriesProducts
                .filter(product => product.rating >= 4.5)
                .slice(0, 3)
                .map(product => (
                  <div key={product.id} className="bg-neutral-50 dark:bg-neutral-800 rounded-lg overflow-hidden flex">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-1/3 object-cover" 
                    />
                    <div className="p-4">
                      <h3 className="font-medium mb-2">{product.name}</h3>
                      <p className="text-primary font-semibold">${product.price.toFixed(2)}</p>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                        ★ {product.rating} ({product.reviews} đánh giá)
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
        
        {/* Info section */}
        <div className="mt-16 bg-neutral-50 dark:bg-neutral-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Tại Sao Chọn Phụ Kiện Tại TechStore?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="bg-primary/10 rounded-full h-12 w-12 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Sản Phẩm Chính Hãng 100%</h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                Tất cả phụ kiện tại TechStore đều là hàng chính hãng, có đầy đủ tem nhãn và được bảo hành theo tiêu chuẩn nhà sản xuất.
              </p>
            </div>
            
            <div>
              <div className="bg-primary/10 rounded-full h-12 w-12 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Chính Sách Đổi Trả 30 Ngày</h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                Nếu sản phẩm có lỗi hoặc không đáp ứng được nhu cầu sử dụng, bạn có thể đổi trả trong vòng 30 ngày kể từ ngày mua.
              </p>
            </div>
            
            <div>
              <div className="bg-primary/10 rounded-full h-12 w-12 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Tương Thích Hoàn Hảo</h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                Các phụ kiện tại TechStore được kiểm tra kỹ lưỡng để đảm bảo tương thích tốt nhất với các thiết bị của bạn.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accessories;