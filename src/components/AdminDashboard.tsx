import React, { useState } from 'react';
import { Property, BannerAd, PropertyComment, PropertyType, RegionCategory, TransactionType } from '../types';
import { StorageService } from '../services/storage';
import { X, Plus, Edit2, Trash2, Archive, Check, Sparkles, Image, Shield, Layers, Database, Smartphone, FileCode, CheckCircle2, RefreshCw } from 'lucide-react';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
  banners: BannerAd[];
  comments: PropertyComment[];
  onRefreshData: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  properties,
  banners,
  comments,
  onRefreshData
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'properties' | 'banners' | 'comments' | 'database'>('properties');
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);

  // New Property Form State
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<number | ''>(250000);
  const [location, setLocation] = useState('الحمرا - بيروت');
  const [regionCategory, setRegionCategory] = useState<RegionCategory>('inside_beirut');
  const [propertyType, setPropertyType] = useState<PropertyType>('apartment');
  const [bedrooms, setBedrooms] = useState<number>(3);
  const [bathrooms, setBathrooms] = useState<number>(2);
  const [areaSqM, setAreaSqM] = useState<number>(180);
  const [transactionType, setTransactionType] = useState<TransactionType>('sale');
  const [description, setDescription] = useState('');
  const [featuresInput, setFeaturesInput] = useState('مولد كهرباء 24/7, موقف سيارة, سند 2400 سهم');
  const [imageUrlsInput, setImageUrlsInput] = useState('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80');
  const [isFeatured, setIsFeatured] = useState(false);

  // New Banner Form State
  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerSubtitle, setBannerSubtitle] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [bannerBadge, setBannerBadge] = useState('عرض جديد');

  const resetForm = () => {
    setTitle('');
    setPrice(250000);
    setLocation('الحمرا - بيروت');
    setRegionCategory('inside_beirut');
    setPropertyType('apartment');
    setBedrooms(3);
    setBathrooms(2);
    setAreaSqM(180);
    setDescription('');
    setEditingPropertyId(null);
  };

  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !price) return;

    const features = featuresInput.split(',').map(s => s.trim()).filter(Boolean);
    const images = imageUrlsInput.split('\n').map(s => s.trim()).filter(Boolean);

    if (editingPropertyId) {
      StorageService.updateProperty(editingPropertyId, {
        title,
        price: Number(price),
        location,
        regionCategory,
        propertyType,
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        areaSqM: Number(areaSqM),
        transactionType,
        description,
        features,
        images,
        featured: isFeatured
      });
    } else {
      StorageService.addProperty({
        title,
        price: Number(price),
        location,
        regionCategory,
        propertyType,
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        areaSqM: Number(areaSqM),
        status: 'active',
        transactionType,
        description,
        features,
        images,
        featured: isFeatured
      });
    }

    resetForm();
    onRefreshData();
  };

  const handleEditClick = (p: Property) => {
    setEditingPropertyId(p.id);
    setTitle(p.title);
    setPrice(p.price);
    setLocation(p.location);
    setRegionCategory(p.regionCategory);
    setPropertyType(p.propertyType);
    setBedrooms(p.bedrooms);
    setBathrooms(p.bathrooms);
    setAreaSqM(p.areaSqM);
    setTransactionType(p.transactionType);
    setDescription(p.description);
    setFeaturesInput(p.features.join(', '));
    setImageUrlsInput(p.images.join('\n'));
    setIsFeatured(!!p.featured);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleArchive = (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'archived' ? 'active' : 'archived';
    StorageService.updateProperty(id, { status: nextStatus as any });
    onRefreshData();
  };

  const handleDeleteProperty = (id: string) => {
    if (confirm('هل أنت تأكد من حذف هذا العقار نهائياً؟')) {
      StorageService.deleteProperty(id);
      onRefreshData();
    }
  };

  const handleApproveComment = (id: string) => {
    StorageService.updateCommentStatus(id, 'approved');
    onRefreshData();
  };

  const handleDeleteComment = (id: string) => {
    StorageService.deleteComment(id);
    onRefreshData();
  };

  const handleAddBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bannerTitle.trim() || !bannerImage.trim()) return;

    const currentBanners = StorageService.getBanners();
    const newBanner: BannerAd = {
      id: 'banner-' + Date.now(),
      title: bannerTitle,
      subtitle: bannerSubtitle,
      imageUrl: bannerImage,
      active: true,
      badgeText: bannerBadge
    };
    StorageService.saveBanners([newBanner, ...currentBanners]);
    setBannerTitle('');
    setBannerSubtitle('');
    setBannerImage('');
    onRefreshData();
  };

  const handleToggleBanner = (id: string, active: boolean) => {
    const currentBanners = StorageService.getBanners();
    const updated = currentBanners.map(b => b.id === id ? { ...b, active: !active } : b);
    StorageService.saveBanners(updated);
    onRefreshData();
  };

  const samplePhotoPresets = [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-right my-4 flex flex-col max-h-[92vh]">
        
        {/* Admin Header */}
        <div className="bg-emerald-950 text-white p-5 sm:p-6 border-b border-emerald-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-black">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-amber-300">
                لوحة التحكم الإدارية (Admin Dashboard)
              </h2>
              <p className="text-xs text-emerald-200/80">
                م. نصار العقارية - إدارة العقارات، الصور، الإعلانات والمزامنة مع Supabase/Firebase
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-slate-900 text-white hover:bg-rose-600 transition-all"
            aria-label="إغلاق لوحة التحكم"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dashboard Tabs Bar */}
        <div className="bg-slate-100 p-2 border-b border-slate-200 flex flex-wrap gap-2 text-xs font-bold">
          <button
            onClick={() => setActiveTab('properties')}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'properties' ? 'bg-emerald-800 text-white shadow' : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>إضافة وتعديل العقارات ({properties.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('banners')}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'banners' ? 'bg-emerald-800 text-white shadow' : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Image className="w-4 h-4" />
            <span>إدارة الإعلانات والبَنَرات ({banners.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('comments')}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'comments' ? 'bg-emerald-800 text-white shadow' : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>مراجعة التعليقات ({comments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'database' ? 'bg-amber-500 text-emerald-950 font-black shadow' : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>ربط Database & Mobile App (Supabase / React Native)</span>
          </button>
        </div>

        {/* Modal Body Scroll Area */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1">
          
          {/* TAB 1: PROPERTIES MANAGEMENT */}
          {activeTab === 'properties' && (
            <div className="space-y-8">
              
              {/* Form Section */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h3 className="font-black text-lg text-slate-900 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-emerald-700" />
                    <span>{editingPropertyId ? 'تعديل بيانات العقار' : 'إضافة عقار جديد لـ M.Nassar Real Estate'}</span>
                  </h3>

                  {editingPropertyId && (
                    <button
                      onClick={resetForm}
                      className="text-xs bg-rose-100 text-rose-800 font-bold px-3 py-1.5 rounded-lg hover:bg-rose-200"
                    >
                      إلغاء التعديل
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveProperty} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-bold text-slate-700">
                  <div className="md:col-span-2 space-y-1">
                    <label>عنوان العقار (Arabic Title) *</label>
                    <input
                      type="text"
                      required
                      placeholder="مثلاً: شقة فخمة 3 نوم مطلة على البحر في الحمرا"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-white p-2.5 rounded-xl border border-slate-300 focus:border-emerald-700 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label>السعر بالدولار ($ Price) *</label>
                    <input
                      type="number"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full bg-white p-2.5 rounded-xl border border-slate-300 focus:border-emerald-700 focus:outline-none font-['Plus_Jakarta_Sans']"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold">الموقع / الحي التفصيلي *</label>
                    <input
                      type="text"
                      required
                      placeholder="مثلاً: كورنيش المزرعة، الحمرا، مار الياس، فردان..."
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-white p-2.5 rounded-xl border border-slate-300 focus:border-emerald-700 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold">التقسيم الإقليمي والقطاع *</label>
                    <select
                      value={regionCategory}
                      onChange={(e) => setRegionCategory(e.target.value as RegionCategory)}
                      className="w-full bg-white p-2.5 rounded-xl border border-slate-300 focus:border-emerald-700 focus:outline-none cursor-pointer"
                    >
                      <option value="inside_beirut">داخل بيروت (Inside Beirut)</option>
                      <option value="outside_beirut">خارج بيروت - جبل لبنان والمحافظات (Outside Beirut)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold">نوع العقار (سكني / تجاري) *</label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                      className="w-full bg-white p-2.5 rounded-xl border border-slate-300 focus:border-emerald-700 focus:outline-none cursor-pointer font-bold"
                    >
                      <optgroup label="شقق وعقارات سكنية">
                        <option value="apartment">شقة سكنية (Apartment)</option>
                        <option value="furnished_apartment">شقة مفروشة (Furnished Apartment)</option>
                        <option value="duplex">دوبلكس / بنتهاوس (Duplex)</option>
                        <option value="villa">فيلا مستقلة (Villa)</option>
                        <option value="chalet">شاليه بحري / جبلي (Chalet)</option>
                        <option value="house">بيت مستقل (House)</option>
                      </optgroup>
                      <optgroup label="عقارات تجارية واستثمارية">
                        <option value="shop">محل تجاري (Shop / Store)</option>
                        <option value="warehouse">مستودع تجاري (Warehouse)</option>
                        <option value="office">مكتب تجاري (Office)</option>
                        <option value="building">عمارة / مبنى كامل (Building)</option>
                        <option value="land">أرض استثمارية / بناء (Land)</option>
                        <option value="commercial">عقار تجاري عام (Commercial)</option>
                      </optgroup>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label>عدد غرف النوم</label>
                    <input
                      type="number"
                      value={bedrooms}
                      onChange={(e) => setBedrooms(Number(e.target.value))}
                      className="w-full bg-white p-2.5 rounded-xl border border-slate-300 focus:border-emerald-700 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label>عدد الحمامات</label>
                    <input
                      type="number"
                      value={bathrooms}
                      onChange={(e) => setBathrooms(Number(e.target.value))}
                      className="w-full bg-white p-2.5 rounded-xl border border-slate-300 focus:border-emerald-700 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label>المساحة بالمتر المربع (م²)</label>
                    <input
                      type="number"
                      value={areaSqM}
                      onChange={(e) => setAreaSqM(Number(e.target.value))}
                      className="w-full bg-white p-2.5 rounded-xl border border-slate-300 focus:border-emerald-700 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1 md:col-span-3">
                    <label>وصف العقار التفصيلي</label>
                    <textarea
                      rows={3}
                      placeholder="أدخل الوصف التفصيلي وحالة البناء والمميزات..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full bg-white p-2.5 rounded-xl border border-slate-300 focus:border-emerald-700 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <label>المميزات (مفصولة بفاصلة)</label>
                    <input
                      type="text"
                      placeholder="مولد كهرباء 24/7, موقف سيارة, سند 2400 سهم..."
                      value={featuresInput}
                      onChange={(e) => setFeaturesInput(e.target.value)}
                      className="w-full bg-white p-2.5 rounded-xl border border-slate-300 focus:border-emerald-700 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1 flex items-center justify-start pt-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isFeatured}
                        onChange={(e) => setIsFeatured(e.target.checked)}
                        className="w-4 h-4 text-emerald-600 rounded"
                      />
                      <span className="font-bold text-emerald-900">تمييز هذا العقار على الرئيسية</span>
                    </label>
                  </div>

                  <div className="space-y-2 md:col-span-3">
                    <label className="block font-bold">روابط الصور (رابط في كل سطر / Multi-image URLs)</label>
                    <textarea
                      rows={2}
                      placeholder="https://..."
                      value={imageUrlsInput}
                      onChange={(e) => setImageUrlsInput(e.target.value)}
                      className="w-full bg-white p-2.5 rounded-xl border border-slate-300 focus:border-emerald-700 focus:outline-none font-mono"
                    />
                    
                    {/* Preset photo helper */}
                    <div className="flex items-center gap-2 overflow-x-auto pt-1">
                      <span className="text-[11px] text-slate-500 font-semibold">أو اختر صورة جاهزة:</span>
                      {samplePhotoPresets.map((img, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setImageUrlsInput(prev => prev ? prev + '\n' + img : img)}
                          className="w-8 h-8 rounded-lg overflow-hidden border border-slate-300 hover:border-amber-400 flex-shrink-0"
                        >
                          <img src={img} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-3 pt-2">
                    <button
                      type="submit"
                      className="w-full bg-emerald-800 hover:bg-emerald-700 text-white font-black text-sm py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <Plus className="w-5 h-5" />
                      <span>{editingPropertyId ? 'حفظ التعديلات' : 'إضافة العقار للنظام'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Existing Properties Table */}
              <div className="space-y-3">
                <h3 className="font-black text-base text-slate-900">قائمة العقارات الحالية ({properties.length})</h3>
                <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-emerald-950 text-white font-bold">
                      <tr>
                        <th className="p-3">الصورة</th>
                        <th className="p-3">العنوان</th>
                        <th className="p-3">الموقع</th>
                        <th className="p-3">السعر</th>
                        <th className="p-3">الحالة</th>
                        <th className="p-3 text-center">إجراءات التحكم</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {properties.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50 font-medium">
                          <td className="p-2 w-16">
                            <img src={p.images[0]} className="w-12 h-12 object-cover rounded-lg border" />
                          </td>
                          <td className="p-3 max-w-xs font-bold text-slate-900">
                            {p.title}
                            {p.featured && <span className="text-[10px] bg-amber-200 text-amber-900 font-bold px-1.5 py-0.5 rounded mr-1">مميز</span>}
                          </td>
                          <td className="p-3 text-slate-600">{p.location}</td>
                          <td className="p-3 font-bold text-emerald-800 font-['Plus_Jakarta_Sans']">${p.price.toLocaleString()}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              p.status === 'archived' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {p.status === 'archived' ? 'مؤرشف/مباع' : 'نشط'}
                            </span>
                          </td>
                          <td className="p-3 flex items-center justify-center gap-1">
                            <button
                              onClick={() => handleEditClick(p)}
                              className="p-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg"
                              title="تعديل"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleToggleArchive(p.id, p.status)}
                              className="p-1.5 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-lg"
                              title={p.status === 'archived' ? 'إعادة تنشيط' : 'أرشفة (مباع)'}
                            >
                              <Archive className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProperty(p.id)}
                              className="p-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg"
                              title="حذف"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BANNERS & ADS */}
          {activeTab === 'banners' && (
            <div className="space-y-6">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <h3 className="font-black text-lg text-slate-900">إضافة بنر / إعلان جديد على الرئيسية</h3>
                <form onSubmit={handleAddBanner} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold">
                  <div className="space-y-1">
                    <label>عنوان البنر *</label>
                    <input
                      type="text"
                      required
                      placeholder="عنوان الإعلان الرئيسي..."
                      value={bannerTitle}
                      onChange={(e) => setBannerTitle(e.target.value)}
                      className="w-full bg-white p-2.5 rounded-xl border border-slate-300"
                    />
                  </div>

                  <div className="space-y-1">
                    <label>شارة الإعلان (Badge Text)</label>
                    <input
                      type="text"
                      placeholder="عرض فريد، حصرية..."
                      value={bannerBadge}
                      onChange={(e) => setBannerBadge(e.target.value)}
                      className="w-full bg-white p-2.5 rounded-xl border border-slate-300"
                    />
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <label>الوصف الفرعي (Subtitle)</label>
                    <input
                      type="text"
                      placeholder="تفاصيل إضافية للإعلان..."
                      value={bannerSubtitle}
                      onChange={(e) => setBannerSubtitle(e.target.value)}
                      className="w-full bg-white p-2.5 rounded-xl border border-slate-300"
                    />
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <label>رابط صورة الخلفية (Background Image URL) *</label>
                    <input
                      type="text"
                      required
                      placeholder="https://..."
                      value={bannerImage}
                      onChange={(e) => setBannerImage(e.target.value)}
                      className="w-full bg-white p-2.5 rounded-xl border border-slate-300"
                    />
                  </div>

                  <button
                    type="submit"
                    className="md:col-span-2 bg-emerald-800 text-white font-bold p-3 rounded-xl hover:bg-emerald-700"
                  >
                    حفظ البنر ونشره
                  </button>
                </form>
              </div>

              {/* Banners list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {banners.map((b) => (
                  <div key={b.id} className="relative rounded-2xl overflow-hidden border border-slate-200 p-4 bg-slate-900 text-white space-y-2">
                    <img src={b.imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-40" />
                    <div className="relative z-10 space-y-1">
                      <span className="text-[10px] bg-amber-400 text-emerald-950 font-black px-2 py-0.5 rounded">{b.badgeText || 'إعلان'}</span>
                      <h4 className="font-bold text-base">{b.title}</h4>
                      <p className="text-xs text-slate-200">{b.subtitle}</p>
                      <button
                        onClick={() => handleToggleBanner(b.id, b.active)}
                        className={`mt-2 text-xs font-bold px-3 py-1 rounded-lg ${
                          b.active ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        {b.active ? 'الإعلان نشط' : 'الإعلان متوقف'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: COMMENTS MODERATION */}
          {activeTab === 'comments' && (
            <div className="space-y-4">
              <h3 className="font-black text-lg text-slate-900">إدارة ومراجعة تعليقات الزوار ({comments.length})</h3>
              {comments.length === 0 ? (
                <p className="text-slate-500 text-xs">لا توجد تعليقات جديدة للمراجعة حالياً.</p>
              ) : (
                <div className="space-y-3">
                  {comments.map((c) => (
                    <div key={c.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-emerald-900">{c.userName} ({c.userPhone || 'بدون هاتف'})</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          c.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {c.status === 'approved' ? 'معتمد ومظاهر' : 'معلق بحاجة موافقة'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-800 font-medium">{c.content}</p>
                      <p className="text-[10px] text-slate-500">العقار: {c.propertyTitle || c.propertyId}</p>
                      <div className="flex items-center gap-2 pt-1">
                        {c.status !== 'approved' && (
                          <button
                            onClick={() => handleApproveComment(c.id)}
                            className="bg-emerald-700 text-white text-xs font-bold px-3 py-1 rounded-lg hover:bg-emerald-600"
                          >
                            اعتماد واستعراض
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteComment(c.id)}
                          className="bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-lg hover:bg-rose-500"
                        >
                          حذف التعليق
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: DATABASE & MOBILE SYNC (Supabase / Firebase / React Native) */}
          {activeTab === 'database' && (
            <div className="space-y-6">
              <div className="bg-emerald-950 text-white p-6 rounded-2xl border border-amber-400/40 space-y-3">
                <div className="flex items-center gap-2 text-amber-300 font-black text-lg">
                  <Database className="w-6 h-6" />
                  <span>تجهيز قاعدة البيانات ومستقبل الربط بالموبايل (React Native / Flutter)</span>
                </div>
                <p className="text-xs text-emerald-100/90 leading-relaxed">
                  تم تصميم وتجهيز الهيكلية الكاملة لقاعدة البيانات بحيث يمكن ربط نفس قاعدة البيانات مستقبلاً بتطبيق الموبايل مباشرة ببيانات متزامنة 100%.
                </p>
              </div>

              {/* Supabase SQL Schema Box */}
              <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-amber-400">
                  <span className="flex items-center gap-1.5">
                    <FileCode className="w-4 h-4" />
                    1. Supabase PostgreSQL Schema (كود الجداول لـ Supabase)
                  </span>
                  <span className="bg-emerald-800 text-white px-2 py-0.5 rounded text-[10px]">جاهز للنسخ</span>
                </div>

                <pre className="text-[11px] font-mono bg-slate-950 p-4 rounded-xl border border-slate-800 text-emerald-300 overflow-x-auto dir-ltr text-left">
{`-- Table: Properties
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  price NUMERIC NOT NULL,
  location TEXT NOT NULL,
  region_category TEXT CHECK (region_category IN ('inside_beirut', 'outside_beirut')),
  property_type TEXT NOT NULL,
  bedrooms INT DEFAULT 0,
  bathrooms INT DEFAULT 0,
  area_sqm NUMERIC,
  status TEXT DEFAULT 'active',
  transaction_type TEXT DEFAULT 'sale',
  description TEXT,
  features TEXT[],
  images TEXT[],
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: Comments
CREATE TABLE property_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  user_phone TEXT,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`}
                </pre>
              </div>

              {/* Mobile Integration Box */}
              <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-amber-400">
                  <span className="flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4" />
                    2. React Native / Flutter API Setup (ربط تطبيق الموبايل)
                  </span>
                  <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-[10px]">React Native Ready</span>
                </div>

                <pre className="text-[11px] font-mono bg-slate-950 p-4 rounded-xl border border-slate-800 text-blue-300 overflow-x-auto dir-ltr text-left">
{`// Mobile app data fetch snippet
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
export const supabase = createClient(supabaseUrl, supabaseKey);

// Fetch Inside Beirut properties for React Native / Flutter
export async function fetchBeirutProperties() {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('region_category', 'inside_beirut')
    .eq('status', 'active');
  return data;
}`}
                </pre>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
