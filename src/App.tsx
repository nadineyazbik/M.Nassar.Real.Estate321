import React, { useState, useEffect, useMemo } from 'react';
import { Property, BannerAd, PropertyComment, FilterOptions } from './types';
import { StorageService } from './services/storage';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PopularCategories } from './components/PopularCategories';
import { PropertyCard } from './components/PropertyCard';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { AiAdvisorModal } from './components/AiAdvisorModal';
import { PropertyAlertModal } from './components/PropertyAlertModal';
import { FavoritesModal } from './components/FavoritesModal';
import { AppDownloadModal } from './components/AppDownloadModal';
import { ScrollToTop } from './components/ScrollToTop';
import { Search, RefreshCw, Bot, Sparkles, Bell, Heart } from 'lucide-react';

export default function App() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [banners, setBanners] = useState<BannerAd[]>([]);
  const [comments, setComments] = useState<PropertyComment[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  // Navigation tab state
  const [activeTab, setActiveTab] = useState<string>('all'); // 'all' | 'inside_beirut' | 'outside_beirut' | 'archived'

  // Admin Modal state
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Selected Property for Modal
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // AI Advisor Modal State
  const [isAiAdvisorOpen, setIsAiAdvisorOpen] = useState<boolean>(false);
  const [selectedPropertyForValuation, setSelectedPropertyForValuation] = useState<Property | null>(null);

  // Property Alerts Modal State
  const [isAlertsOpen, setIsAlertsOpen] = useState<boolean>(false);

  // Favorites Modal State
  const [isFavoritesOpen, setIsFavoritesOpen] = useState<boolean>(false);

  // App Download / QR Modal State
  const [isAppDownloadOpen, setIsAppDownloadOpen] = useState<boolean>(false);
  const [appDownloadTab, setAppDownloadTab] = useState<'unified' | 'android' | 'ios' | 'qr'>('unified');

  // Filter state
  const [filters, setFilters] = useState<FilterOptions>({
    searchTerm: '',
    location: '',
    regionCategory: 'all',
    propertyType: '',
    transactionType: 'sale',
    minPrice: null,
    maxPrice: null,
    bedrooms: 'all',
    showArchivedOnly: false
  });

  // Load data on mount & refresh
  const loadData = () => {
    setProperties(StorageService.getProperties());
    setBanners(StorageService.getBanners());
    setComments(StorageService.getComments());
    setFavoriteIds(StorageService.getFavorites());
  };

  useEffect(() => {
    loadData();
  }, []);

  // Sync tab clicks with filter options
  useEffect(() => {
    if (activeTab === 'inside_beirut') {
      setFilters(f => ({ ...f, regionCategory: 'inside_beirut', showArchivedOnly: false }));
    } else if (activeTab === 'outside_beirut') {
      setFilters(f => ({ ...f, regionCategory: 'outside_beirut', showArchivedOnly: false }));
    } else if (activeTab === 'archived') {
      setFilters(f => ({ ...f, showArchivedOnly: true }));
    } else if (activeTab === 'all') {
      setFilters(f => ({ ...f, regionCategory: 'all', showArchivedOnly: false }));
    }
  }, [activeTab]);

  // Favorites Handler
  const handleToggleFavorite = (propertyId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated = StorageService.toggleFavorite(propertyId);
    setFavoriteIds(updated);
  };

  // Reset filters helper
  const handleResetFilters = () => {
    setFilters({
      searchTerm: '',
      location: '',
      regionCategory: 'all',
      propertyType: '',
      transactionType: 'sale',
      minPrice: null,
      maxPrice: null,
      bedrooms: 'all',
      showArchivedOnly: false
    });
    setActiveTab('all');
  };

  // Filtered properties computation
  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      // 1. Archive filter check
      if (filters.showArchivedOnly) {
        if (p.status !== 'archived' && p.status !== 'sold') return false;
      } else {
        if (p.status === 'archived' || p.status === 'sold') return false;
      }

      // 2. Region Category & Sector check
      if (filters.regionCategory !== 'all' && p.regionCategory !== filters.regionCategory) {
        return false;
      }
      if (filters.sector && filters.sector !== 'all') {
        if (p.sector) {
          if (p.sector !== filters.sector) return false;
        } else {
          // fallback check in location string
          const term = filters.sector.toLowerCase();
          if (term === 'mazraa' && !p.location.includes('المزرعة') && !p.location.includes('الجديدة') && !p.location.includes('قصقص') && !p.location.includes('السوديكو')) return false;
          if (term === 'msaytbeh' && !p.location.includes('المصيطبة') && !p.location.includes('تلة الخياط') && !p.location.includes('فردان') && !p.location.includes('مار الياس')) return false;
          if (term === 'ras_beirut' && !p.location.includes('الحمرا') && !p.location.includes('راس بيروت') && !p.location.includes('الروشة')) return false;
        }
      }

      // Specific Sub-location
      if (filters.location && filters.location.trim()) {
        if (!p.location.toLowerCase().includes(filters.location.toLowerCase().trim())) {
          return false;
        }
      }

      // 3. Property Type check
      if (filters.propertyType && p.propertyType !== filters.propertyType) {
        return false;
      }

      // 4. Bedrooms check
      if (filters.bedrooms !== 'all') {
        if (filters.bedrooms === 5) {
          if (p.bedrooms < 5) return false;
        } else if (p.bedrooms !== filters.bedrooms) {
          return false;
        }
      }

      // 5. Transaction type
      if (filters.transactionType !== 'all' && p.transactionType !== filters.transactionType) {
        return false;
      }

      // 6. Search term / location check
      if (filters.searchTerm.trim()) {
        const term = filters.searchTerm.toLowerCase().trim();
        const matchesTitle = p.title.toLowerCase().includes(term);
        const matchesLocation = p.location.toLowerCase().includes(term);
        const matchesDesc = p.description.toLowerCase().includes(term);
        if (!matchesTitle && !matchesLocation && !matchesDesc) return false;
      }

      return true;
    });
  }, [properties, filters]);

  // Favorites list computation
  const favoriteProperties = useMemo(() => {
    return properties.filter(p => favoriteIds.includes(p.id));
  }, [properties, favoriteIds]);

  // Counts for Category cards
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    properties.forEach(p => {
      if (p.status === 'active') {
        counts[p.propertyType] = (counts[p.propertyType] || 0) + 1;
      }
    });
    return counts;
  }, [properties]);

  const activePropertiesCount = properties.filter(p => p.status === 'active').length;

  // Add Comment handler
  const handleAddComment = (commentData: Omit<PropertyComment, 'id' | 'createdAt' | 'status'>) => {
    StorageService.addComment(commentData);
    setComments(StorageService.getComments());
  };

  const activeBanners = banners.filter(b => b.active);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 flex flex-col font-['Tajawal'] dir-rtl selection:bg-[#064E3B] selection:text-white">
      {/* 1. Header Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenAiAdvisor={() => {
          setSelectedPropertyForValuation(null);
          setIsAiAdvisorOpen(true);
        }}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        favoritesCount={favoriteIds.length}
        onOpenAlerts={() => setIsAlertsOpen(true)}
        onOpenAppDownload={(tab) => {
          setAppDownloadTab(tab || 'unified');
          setIsAppDownloadOpen(true);
        }}
      />

      {/* 2. Hero Section & Confidencerealestate.com style filter bar */}
      <HeroSection
        filters={filters}
        setFilters={setFilters}
        onSearch={() => {
          const el = document.getElementById('listings-grid');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onReset={handleResetFilters}
        activePropertyCount={activePropertiesCount}
      />

      {/* AI Floating Hero Callout Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full mt-6">
        <div className="bg-gradient-to-r from-[#064E3B] via-emerald-900 to-[#064E3B] text-white p-4 sm:p-5 rounded-2xl shadow-lg border border-[#D4AF37] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37] text-[#064E3B] flex items-center justify-center shrink-0 shadow-md font-bold">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base flex items-center gap-2">
                <span>مستشار م. نصار بالذكاء الاصطناعي (Gemini AI)</span>
                <span className="bg-[#D4AF37] text-white text-[9px] px-2 py-0.5 rounded font-bold">جديد</span>
              </h3>
              <p className="text-xs text-stone-200 mt-0.5">
                تحدث مع المستشار الذكي فوراً حول أسعار شقق بيروت، المعاملات بالسند الأخضر، وتثمين العقارات.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-end">
            <button
              onClick={() => {
                setSelectedPropertyForValuation(null);
                setIsAiAdvisorOpen(true);
              }}
              className="bg-[#D4AF37] hover:bg-amber-400 text-[#064E3B] font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow hover:scale-105 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>ابدأ محادثة مع المستشار الذكي</span>
            </button>

            <button
              onClick={() => setIsAlertsOpen(true)}
              className="bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5"
            >
              <Bell className="w-4 h-4 text-[#D4AF37]" />
              <span>تنبيهات العقارات</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Promotional Banners Slider / Highlight */}
      {activeBanners.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeBanners.map((banner) => (
              <div
                key={banner.id}
                className="relative rounded-xl overflow-hidden shadow-md border border-stone-200 text-white min-h-[130px] flex items-center p-6 bg-[#064E3B] group"
              >
                <img
                  src={banner.imageUrl}
                  alt={banner.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#064E3B]/95 via-[#064E3B]/80 to-transparent" />

                <div className="relative z-10 space-y-1 text-right max-w-md">
                  {banner.badgeText && (
                    <span className="inline-block px-2.5 py-0.5 bg-[#D4AF37] text-white font-bold text-[10px] rounded shadow-sm mb-1">
                      {banner.badgeText}
                    </span>
                  )}
                  <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                    {banner.title}
                  </h3>
                  <p className="text-xs text-stone-200 line-clamp-2">
                    {banner.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Popular Categories Quick Selector */}
      <PopularCategories
        selectedCategory={filters.propertyType}
        onSelectCategory={(type) => {
          setFilters(f => ({ ...f, propertyType: type === 'all' ? '' : type }));
          const el = document.getElementById('listings-grid');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        categoryCounts={categoryCounts}
      />

      {/* 5. Main Property Listings Grid Section */}
      <main id="listings-grid" className="flex-1 max-w-7xl mx-auto px-4 sm:px-8 py-8 w-full space-y-6">
        {/* Section Header & Sub-Tabs with Gold Border Accent */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div className="text-right">
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 border-r-4 border-[#D4AF37] pr-3">
                {filters.showArchivedOnly ? 'أرشيف العقارات المباعة' : filters.regionCategory === 'inside_beirut' ? 'شقق داخل بيروت' : filters.regionCategory === 'outside_beirut' ? 'عقارات خارج بيروت' : 'أحدث العقارات المتاحة'}
              </h2>
              <span className="bg-[#064E3B] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                {filteredProperties.length} عقار
              </span>
            </div>
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeTab === 'all' ? 'bg-[#064E3B] text-white' : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              الكل
            </button>

            <button
              onClick={() => setActiveTab('inside_beirut')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeTab === 'inside_beirut' ? 'bg-[#064E3B] text-white' : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              داخل بيروت
            </button>

            <button
              onClick={() => setActiveTab('outside_beirut')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeTab === 'outside_beirut' ? 'bg-[#064E3B] text-white' : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              خارج بيروت
            </button>

            <button
              onClick={() => setActiveTab('archived')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeTab === 'archived' ? 'bg-stone-800 text-white' : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              الأرشيف
            </button>
          </div>
        </div>

        {/* Active Filters Bar */}
        {(filters.searchTerm || filters.propertyType || filters.bedrooms !== 'all' || filters.regionCategory !== 'all') && (
          <div className="bg-amber-50/80 border border-[#D4AF37]/40 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-stone-800">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-stone-500 font-semibold">الفلاتر النشطة:</span>
              {filters.searchTerm && <span className="bg-white px-2.5 py-1 rounded border border-stone-200">بحث: {filters.searchTerm}</span>}
              {filters.regionCategory !== 'all' && (
                <span className="bg-white px-2.5 py-1 rounded border border-stone-200">
                  {filters.regionCategory === 'inside_beirut' ? 'داخل بيروت' : 'خارج بيروت'}
                </span>
              )}
              {filters.propertyType && <span className="bg-white px-2.5 py-1 rounded border border-stone-200">النوع: {filters.propertyType}</span>}
              {filters.bedrooms !== 'all' && <span className="bg-white px-2.5 py-1 rounded border border-stone-200">{filters.bedrooms} نوم</span>}
            </div>

            <button
              onClick={handleResetFilters}
              className="text-xs text-[#B45309] hover:underline flex items-center gap-1 font-bold"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>إلغاء الفلاتر</span>
            </button>
          </div>
        )}

        {/* Listings Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onSelectProperty={setSelectedProperty}
                isFavorite={favoriteIds.includes(property.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-10 text-center border border-stone-200 max-w-md mx-auto my-12 space-y-4">
            <div className="w-12 h-12 bg-stone-100 text-stone-400 rounded-full flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-stone-800">لا توجد عقارات تطابق بحثك حالياً</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              تواصل معنا مباشرة عبر واتساب لاستكشاف الخيارات الجديدة.
            </p>
            <button
              onClick={handleResetFilters}
              className="bg-[#064E3B] text-white font-bold text-xs px-5 py-2.5 rounded-lg hover:bg-[#04382a] transition-colors shadow-sm"
            >
              عرض كافة العقارات
            </button>
          </div>
        )}
      </main>

      {/* 6. Property Detail Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        comments={comments}
        onAddComment={handleAddComment}
        onOpenAiValuation={(prop) => {
          setSelectedPropertyForValuation(prop);
          setIsAiAdvisorOpen(true);
        }}
        isFavorite={selectedProperty ? favoriteIds.includes(selectedProperty.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* 7. Gemini AI Real Estate Advisor Modal */}
      <AiAdvisorModal
        isOpen={isAiAdvisorOpen}
        onClose={() => setIsAiAdvisorOpen(false)}
        selectedPropertyForValuation={selectedPropertyForValuation}
        onSelectProperty={setSelectedProperty}
      />

      {/* 8. New Property Alerts Modal */}
      <PropertyAlertModal
        isOpen={isAlertsOpen}
        onClose={() => setIsAlertsOpen(false)}
      />

      {/* 9. Favorites Modal */}
      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favoriteProperties}
        onSelectProperty={setSelectedProperty}
        onRemoveFavorite={(id) => handleToggleFavorite(id)}
      />

      {/* 10. App Download & QR Code Modal */}
      <AppDownloadModal
        isOpen={isAppDownloadOpen}
        onClose={() => setIsAppDownloadOpen(false)}
        defaultTab={appDownloadTab}
      />

      {/* 11. Admin Dashboard Modal */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        properties={properties}
        banners={banners}
        comments={comments}
        onRefreshData={loadData}
      />

      {/* 12. Scroll To Top Smooth Button */}
      <ScrollToTop />

      {/* 13. Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        setActiveTab={setActiveTab}
        onOpenAppDownload={(tab) => {
          setAppDownloadTab(tab || 'unified');
          setIsAppDownloadOpen(true);
        }}
      />
    </div>
  );
}
