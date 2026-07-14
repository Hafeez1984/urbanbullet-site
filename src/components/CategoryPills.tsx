'use client';

import React from 'react';

interface CategoryPillsProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 't-shirts', label: 'T-Shirts' },
  { id: 'hoodies', label: 'Hoodies' },
  { id: 'jackets', label: 'Jackets' },
  { id: 'accessories', label: 'Accessories' },
  { id: 'limited', label: 'Limited Edition' },
];

export const CategoryPills: React.FC<CategoryPillsProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <section className="py-6 sticky top-20 z-30 glass-header">
      <div className="container mx-auto px-6">
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`category-pill px-6 py-3 rounded-full whitespace-nowrap font-semibold text-sm uppercase tracking-wider cursor-pointer ${
                activeCategory === cat.id ? 'active' : ''
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
export default CategoryPills;
