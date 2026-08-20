import React, { useState } from 'react';
import { FilterOptions, RegionCategory, TransactionType } from '../types';
import { BEIRUT_SECTORS, OUTSIDE_BEIRUT_AREAS, PROPERTY_TYPE_CATEGORIES } from '../data/locations';
import { Search, MapPin, Building, RefreshCw, Layers, Compass, Building2, Store } from 'lucide-react';

interface HeroSectionProps {
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  onSearch: () => void;
  onReset: () => void;
  activePropertyCount: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  filters,
  setFilters,
  onSearch,
  onReset,
  activePropertyCount
}) => {
  // Quick active sector pill selection
  const activeSector = filters.sector || 'all';

  const handleSectorChange = (sectorId: string) => {
    if (sectorId === 'all') {
      setFilters(f => ({ ...f, sector: undefined, regionCategory: 'all', location: '' }));
    } else if (sectorId === 'mazraa' || sectorId === 'msaytbeh' || sectorId === 'ras_beirut') {
      setFilters(f => ({ ...f, sector: sectorId, regionCategory: 'inside_beirut' }));
    } else if (sectorId === 'outside_beirut' || sectorId === 'mount_lebanon') {
      setFilters(f => ({ ...f, sector: 'mount_lebanon', regionCategory: 'outside_beirut' }));
    }
  };

  // Get available sub-locations based on selected sector/region
  const getSubLocations = () => {
    if (filters.sector === 'mazraa') {
      return BEIRUT_SECTORS.find(s => s.id === 'mazraa')?.subLocations || [];
    }
    if (filters.sector === 'msaytbeh') {
      return BEIRUT_SECTORS.find(s => s.id === 'msaytbeh')?.subLocations || [];
    }
    if (filters.sector === 'ras_beirut') {
      return BEIRUT_SECTORS.find(s => s.id === 'ras_beirut')?.subLocations || [];
    }
    return [
      ...BEIRUT_SECTORS.flatMap(s => s.subLocations),
      'المتن (برمانا، بعبدات)', 'كسروان (جونيه، كفردبيان)', 'الشوف (الجية، الدامور)', 'بعبدا والحازمية'
    ];
  };

  return (
    <div className="relative py-10 lg:py-14 px-4 sm:px-8 text-right overflow-hidden dir-rtl" id="hero-search-section">
      {/* Background Image with Deep Emerald Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000" 
          alt="M.Nassar Real Estate Luxury Beirut Properties" 
          className="w-full h-full object-cover object-center filter brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#064E3B]/95 via-[#064E3B]/80 to-[#04281f]/85 z-10" />
      </div>

      <div className="relative z-20 max-w-6xl mx-auto space-y-6">
        {/* Header Branding & Slogan */}
        <div className="max-w-3xl text-white space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#064E3B]/80 border border-[#D4AF37]/60 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-[#D4AF37]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>شركة م. نصار العقارية | بيروت (المزرعة - المصيطبة - راس بيروت) وجبل لبنان</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
            عقارك المثالي في بيروت والجبل <br />
            <span className="text-[#D4AF37]">شقق سكنية وعقارات تجارية جاهزة</span>
          </h1>

          <p className="text-stone-200 text-xs sm:text-sm font-medium max-w-2xl leading-relaxed">
            استكشف أفضل الشقق المعروضة للبيع وللإيجار، بالإضافة إلى المحلات التجارية، المستودعات، والمكاتب في كافة مناطق بيروت وخارجها.
          </p>
        </div>

        {/* Floating Search Container */}
        <div className="bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-2xl border border-stone-200/90 text-stone-800 space-y-4">
          
          {/* Row 1: Transaction Type Buttons (بيع / إيجار / الكل) + Sector Quick Filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-3">
            
            {/* Sale / Rent Switcher */}
            <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl border border-stone-200">
              <button
                id="filter-type-sale"
                type="button"
                onClick={() => setFilters(f => ({ ...f, transactionType: 'sale' }))}
                className={`px-4 py-1.5 rounded-lg text-xs font-extrabold transition-all whitespace-nowrap ${
                  filters.transactionType === 'sale'
                    ? 'bg-[#064E3B] text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                للبيع
              </button>
              <button
                id="filter-type-rent"
                type="button"
                onClick={() => setFilters(f => ({ ...f, transactionType: 'rent' }))}
                className={`px-4 py-1.5 rounded-lg text-xs font-extrabold transition-all whitespace-nowrap ${
                  filters.transactionType === 'rent'
                    ? 'bg-[#064E3B] text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                للإيجار
              </button>
              <button
                id="filter-type-all"
                type="button"
                onClick={() => setFilters(f => ({ ...f, transactionType: 'all' }))}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  filters.transactionType === 'all'
                    ? 'bg-[#D4AF37] text-stone-950 font-black shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                الكل
              </button>
            </div>

            {/* Quick Sector Pills: Beirut 3 Sectors & Outside Beirut */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-[11px] font-bold text-stone-400 ml-1 hidden md:inline">القطاع:</span>
              
              <button
                type="button"
                onClick={() => handleSectorChange('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeSector === 'all'
                    ? 'bg-stone-800 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                كافة القطاعات
              </button>

              <button
                type="button"
                onClick={() => handleSectorChange('mazraa')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeSector === 'mazraa'
                    ? 'bg-[#064E3B] text-[#D4AF37] ring-1 ring-[#D4AF37] shadow-xs'
                    : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
                }`}
              >
                المزرعة ومحيطها
              </button>

              <button
                type="button"
                onClick={() => handleSectorChange('msaytbeh')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeSector === 'msaytbeh'
                    ? 'bg-[#064E3B] text-[#D4AF37] ring-1 ring-[#D4AF37] shadow-xs'
                    : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
                }`}
              >
                المصيطبة ومحيطها
              </button>

              <button
                type="button"
                onClick={() => handleSectorChange('ras_beirut')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeSector === 'ras_beirut'
                    ? 'bg-[#064E3B] text-[#D4AF37] ring-1 ring-[#D4AF37] shadow-xs'
                    : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
                }`}
              >
                راس بيروت ومحيطها
              </button>

              <button
                type="button"
                onClick={() => handleSectorChange('outside_beirut')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeSector === 'mount_lebanon'
                    ? 'bg-[#064E3B] text-[#D4AF37] ring-1 ring-[#D4AF37] shadow-xs'
                    : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
                }`}
              >
                خارج بيروت والجبل
              </button>
            </div>

            {/* Total count badge */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-[#064E3B] font-extrabold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <Building className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{activePropertyCount} عقار متوفر</span>
            </div>
          </div>

          {/* Row 2: Search Inputs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
            
            {/* 1. Keyword / Location Search */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-stone-600 block">
                بحث بالكلمات أو الشارع
              </label>
              <input
                id="search-keyword-input"
                type="text"
                placeholder="كورنيش المزرعة، الحمرا، مار الياس..."
                value={filters.searchTerm}
                onChange={(e) => setFilters(f => ({ ...f, searchTerm: e.target.value }))}
                className="w-full bg-stone-100 border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800 placeholder-stone-400 outline-none focus:ring-1 focus:ring-[#D4AF37]"
              />
            </div>

            {/* 2. Region / Sector Dropdown */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-stone-600 block">
                المنطقة والقطاع الرئيسي
              </label>
              <select
                id="search-sector-select"
                value={filters.sector || (filters.regionCategory === 'all' ? 'all' : filters.regionCategory)}
                onChange={(e) => handleSectorChange(e.target.value)}
                className="w-full bg-stone-100 border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800 outline-none focus:ring-1 focus:ring-[#D4AF37] cursor-pointer"
              >
                <option value="all">كافة المناطق</option>
                <optgroup label="داخل بيروت (3 قطاعات)">
                  <option value="mazraa">المزرعة ومحيطها (طريق الجديدة، العدلية، السوديكو...)</option>
                  <option value="msaytbeh">المصيطبة ومحيطها (تلة الخياط، فردان، مار الياس...)</option>
                  <option value="ras_beirut">راس بيروت ومحيطها (الحمرا، الروشة، المنارة...)</option>
                </optgroup>
                <optgroup label="خارج بيروت">
                  <option value="mount_lebanon">جبل لبنان (المتن، كسروان، الشوف، بعبدا...)</option>
                </optgroup>
              </select>
            </div>

            {/* 3. Specific Sub-Neighborhood */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-stone-600 block">
                الحي / المنطقة الفرعية
              </label>
              <select
                id="search-sublocation-select"
                value={filters.location}
                onChange={(e) => setFilters(f => ({ ...f, location: e.target.value }))}
                className="w-full bg-stone-100 border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800 outline-none focus:ring-1 focus:ring-[#D4AF37] cursor-pointer"
              >
                <option value="">كافة الأحياء والمناطق الفرعية</option>
                {getSubLocations().map((loc, idx) => (
                  <option key={idx} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* 4. Property Type (Residential & Commercial) */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-stone-600 block">
                نوع العقار (سكني / تجاري)
              </label>
              <select
                id="search-property-type-select"
                value={filters.propertyType}
                onChange={(e) => setFilters(f => ({ ...f, propertyType: e.target.value }))}
                className="w-full bg-stone-100 border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800 outline-none focus:ring-1 focus:ring-[#D4AF37] cursor-pointer font-medium"
              >
                <option value="">كافة الأنواع (سكني وتجاري)</option>
                {PROPERTY_TYPE_CATEGORIES.map((cat, idx) => (
                  <optgroup key={idx} label={cat.group}>
                    {cat.types.map(t => (
                      <option key={t.id} value={t.id}>{t.label}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* 5. Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                id="hero-submit-search-btn"
                type="button"
                onClick={onSearch}
                className="flex-1 bg-[#064E3B] hover:bg-[#04382a] text-white font-bold text-xs py-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-sm border border-[#D4AF37]"
              >
                <Search className="w-4 h-4 text-[#D4AF37]" />
                <span>بحث العقارات</span>
              </button>

              <button
                id="hero-reset-search-btn"
                type="button"
                onClick={onReset}
                title="إعادة ضبط البحث"
                className="p-2.5 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-lg transition-colors border border-stone-200"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
