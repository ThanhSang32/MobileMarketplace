
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

const PromoSection: React.FC = () => {
  return (
    <section className="py-12 bg-primary">
      <div className="container mx-auto px-4">
        <div className="text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Khuyến mãi mùa hè - Giảm đến 30%</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Cơ hội sở hữu những sản phẩm công nghệ với giá ưu đãi. Chương trình có hạn, nhanh tay đặt hàng!
          </p>
          <Link href="/shop">
            <Button className="inline-block px-6 py-3 bg-white text-primary font-medium rounded-md hover:bg-neutral-100 transition-colors">
              Xem ngay
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
