import React from 'react';
import { PropertyType } from '../types';
import { Building2, Home, Trees, Store, Warehouse, Briefcase, Building } from 'lucide-react';

interface CategoryItem {
  id: PropertyType | 'all';
  label: string;
  sublabel: string;
  icon: React.ElementType;
  count?: number;
}

interface PopularCategoriesProps {
  selectedCategory: string;
  onSelectCategory: (type: PropertyType | 'all') => void;
  categoryCounts: Record<string, number>;
}

export const PopularCategories: React.FC<PopularCategoriesProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts
}) => {
  const categories: CategoryItem[] = [
    { id: 'apartment', label: 'شقق سكنية', sublabel: 'داخل وخارج بيروت', icon: Building2 },
    { id: 'shop', label: 'محلات تجارية', sublabel: 'شوارع رئيسية وسدد', icon: Store },
    { id: 'warehouse', label: 'مستودعات', sublabel: 'تخزين ومداخل شاحنات', icon: Warehouse },
    { id: 'office', label: 'مكاتب تجارية', sublabel: 'عيادات ومقرات شركات', icon: Briefcase },
    { id: 'villa', label: 'فيلات ودوبلكس', sublabel: 'منازل فاخرة وحدائق', icon: Home },
    { id: 'land', label: 'أراضي استثمارية', sublabel: 'سند تمليك وبناء', icon: Trees },
    { id: 'building', label: 'عمارات وبنايات', sublabel: 'مبانٍ سكنية وتجارية', icon: Building }
  ];

  return (
    <section className="py-6 px-4 sm:px-8 bg-stone-50 border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto">
        {/* Section Title with Gold Right Border Accent */}
        <div className="flex items-center justify-between mb-4 text-right">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-stone-900 border-r-4 border-[#D4AF37] pr-3">
              تصنيفات العقارات (سكني وتجاري)
            </h2>
            <span className="text-xs text-stone-500 font-medium hidden sm:inline">
              (شقق، محلات، مستودعات، مكاتب والمزيد)
            </span>
          </div>

          {selectedCategory !== '' && selectedCategory !== 'all' && (
            <button
              onClick={() => onSelectCategory('all')}
              className="text-xs font-bold text-[#064E3B] hover:text-[#D4AF37] transition-colors"
            >
              عرض جميع الفئات ×
            </button>
          )}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            const count = categoryCounts[cat.id] || 0;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(isSelected ? 'all' : cat.id as PropertyType)}
                className={`group bg-white border p-3 rounded-xl flex flex-col items-center gap-1.5 text-center transition-all cursor-pointer relative ${
                  isSelected
                    ? 'border-[#D4AF37] ring-1 ring-[#D4AF37] bg-emerald-50/50 shadow-sm'
                    : 'border-stone-200 hover:border-[#D4AF37] hover:shadow-sm'
                }`}
              >
                {/* Count Badge */}
                {count > 0 && (
                  <span className={`absolute top-2 right-2 text-[9px] font-extrabold px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-[#064E3B] text-white' : 'bg-stone-100 text-stone-600'
                  }`}>
                    {count}
                  </span>
                )}

                {/* Category Icon */}
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105 ${
                  isSelected ? 'bg-[#064E3B] text-[#D4AF37]' : 'bg-stone-100 text-[#064E3B] group-hover:bg-[#064E3B] group-hover:text-white'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>

                {/* Category Name */}
                <span className={`text-xs font-bold ${isSelected ? 'text-[#064E3B]' : 'text-stone-900'}`}>
                  {cat.label}
                </span>
                <span className="text-[10px] text-stone-400 hidden xl:inline">
                  {cat.sublabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
