import React, { useState } from 'react';
import { Bell, X, Check, Smartphone, Sparkles, Send } from 'lucide-react';
import { StorageService, WHATSAPP_NUMBER } from '../services/storage';

interface PropertyAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PropertyAlertModal: React.FC<PropertyAlertModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [region, setRegion] = useState('inside_beirut');
  const [propertyType, setPropertyType] = useState('apartment');
  const [maxPrice, setMaxPrice] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;

    StorageService.saveAlert({
      name,
      phone,
      region,
      propertyType,
      maxPrice
    });

    setIsSubmitted(true);

    // Formulate direct WhatsApp message link
    const regLabel = region === 'inside_beirut' ? 'داخل بيروت' : region === 'outside_beirut' ? 'خارج بيروت' : 'كافة المناطق';
    const typeLabel = propertyType === 'apartment' ? 'شقة سكنية' : propertyType === 'villa' ? 'فيلا' : propertyType === 'land' ? 'أرض' : 'عقار تجاري';
    const msgText = `مرحباً م. نصار العقارية 🌲\nأود الاشتراك في *تنبيهات العقارات الجديدة*:\n- *الاسم:* ${name || 'عميل محترم'}\n- *المنطقة المطلوبة:* ${regLabel}\n- *نوع العقار:* ${typeLabel}\n- *الميزانية القصوى:* $${maxPrice || 'غير محددة'}\nيرجى التواصل معي فور توفر أي شقة أو عقار ينطبق عليه الطلب.`;
    
    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msgText)}`, '_blank');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/80 backdrop-blur-sm dir-rtl animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#064E3B] text-white p-4 sm:p-5 flex items-center justify-between border-b border-[#D4AF37]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37] text-white flex items-center justify-center shadow-md font-bold">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold flex items-center gap-1.5">
                <span>تنبيهات العقارات الجديدة</span>
                <span className="bg-[#D4AF37] text-white text-[9px] px-2 py-0.5 rounded font-bold">
                  فوري
                </span>
              </h3>
              <p className="text-xs text-stone-200 mt-0.5">
                احصل على إشعار فور عرض شقة أو عقار جديد ينطبق مع طلبك
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-black/20 text-stone-200 hover:text-white hover:bg-black/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#064E3B] flex items-center justify-center mx-auto border border-emerald-300">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-stone-900">تم تسجيل طلب التنبيه بنجاح!</h4>
              <p className="text-xs text-stone-600 leading-relaxed max-w-xs mx-auto">
                جاري توجيهك إلى واتساب لإرسال مواصفاتك مباشرة إلى وكيل م. نصار العقارية ومتابعة طلبك.
              </p>
              <button
                onClick={onClose}
                className="mt-2 bg-[#064E3B] text-white font-bold text-xs px-5 py-2 rounded-lg"
              >
                إغلاق النافذة
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-stone-700 font-bold mb-1">الاسم الكامل</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="أدخل اسمك الكريم"
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-[#064E3B]"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">رقم الهاتف / واتساب</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+961 70 000 000"
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-[#064E3B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">المنطقة المفضلة</label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-[#064E3B]"
                  >
                    <option value="inside_beirut">داخل بيروت (الحمرا، المصيطبة...)</option>
                    <option value="outside_beirut">خارج بيروت (المتن، كسروان...)</option>
                    <option value="all">كافة المناطق</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">نوع العقار</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-[#064E3B]"
                  >
                    <option value="apartment">شقة سكنية</option>
                    <option value="villa">فيلا / بيت</option>
                    <option value="land">أرض</option>
                    <option value="commercial">عقار تجاري</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">الميزانية القصوى بالدولار ($)</label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="مثال: 150000"
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-[#064E3B]"
                />
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-[11px] text-[#064E3B] font-medium flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>سيتم حفظ طلبك وتنبيهك فور قيام شركة م. نصار العقارية بإدراج شقة جديدة ينطبق عليها الطلب.</span>
              </div>

              <button
                type="submit"
                className="w-full bg-[#064E3B] hover:bg-[#04382a] text-white font-bold text-xs py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Send className="w-4 h-4 rotate-180" />
                <span>تفعيل التنبيه والتواصل عبر واتساب</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
