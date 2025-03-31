import React from 'react';
import { Button } from '@/components/ui/button';

interface FilterOption {
  value: string;
  label: string;
}

interface ProductFilterProps {
  options: FilterOption[];
  selectedOption: string;
  onChange: (value: string) => void;
  title?: string;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  options,
  selectedOption,
  onChange,
  title
}) => {
  return (
    <div className="mb-8">
      {title && (
        <h3 className="text-lg font-medium mb-4">{title}</h3>
      )}
      <div className="flex flex-wrap gap-4">
        {options.map((option) => (
          <Button
            key={option.value}
            variant={selectedOption === option.value ? 'default' : 'outline'}
            onClick={() => onChange(option.value)}
            className={selectedOption === option.value 
              ? 'bg-primary text-white' 
              : 'bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700'
            }
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
