import React from 'react';
import { Logo } from './Logo';
import { StorageService, DISPLAY_PHONE } from '../services/storage';
import { SocialLinks } from './SocialLinks';
import { MessageCircle, Phone, Smartphone, ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
  setActiveTab: (tab: string) => void;
  onOpenAppDownload?: (tab?: 'unified' | 'android' | 'ios' | 'qr') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, setActiveTab, onOpenAppDownload }) => {
  const waLink = StorageService.getWhatsAppLink();

  return (
    <footer className="bg-[#121212] text-white border-t border-stone-800 dir-rtl text-right">
      {/* Top Footer Banner: Social Media Connect */}
      <div className="bg-stone-900/90 border-b border-stone-800 py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo size="sm" showText={false} />
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <span>تابع منصات شركة م. نصار العقارية</span>
                <span className="text-[10px] bg-[#D4AF37] text-black font-extrabold px-2 py-0.5 rounded">رسمي</span>
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                تغطية يومية لأحدث الفرص العقارية والشقق المعروضة في بيروت والجبل
              </p>
            </div>
          </div>

          <SocialLinks variant="pills" />
        </div>
      </div>

      {/* Main Footer Details */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-stone-800">
          {/* Col 1: Brand Info & Logo */}
          <div className="space-y-3">
            <Logo size="md" />
            <p className="text-xs text-stone-400 leading-relaxed">
              شركة م. نصار العقارية (M.Nassar Real Estate) — شريكك الموثوق في شراء، بيع، واستئجار الشقق والعقارات التجارية في العاصمة بيروت وكافة المحافظات اللبنانية.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#D4AF37] font-bold">
              <span>هاتف / واتساب: {DISPLAY_PHONE}</span>
            </div>
          </div>

          {/* Col 2: Navigation & Quick Links */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-stone-300 uppercase tracking-wider">روابط وتصفح سريع</p>
            <div className="flex flex-col gap-2 text-xs text-stone-400">
              <button 
                onClick={() => setActiveTab('all')} 
                className="hover:text-amber-300 transition-colors text-right py-1 flex items-center justify-between bg-stone-800/60 hover:bg-stone-800 px-3 rounded-lg border border-stone-800"
              >
                <span>جميع العقارات المعروضة</span>
                <span className="text-[10px] text-[#D4AF37]">تصفح</span>
              </button>
              <button 
                onClick={() => setActiveTab('inside_beirut')} 
                className="hover:text-amber-300 transition-colors text-right py-1 flex items-center justify-between bg-stone-800/60 hover:bg-stone-800 px-3 rounded-lg border border-stone-800"
              >
                <span>عقارات وشقق داخل بيروت</span>
                <span className="text-[10px] text-[#D4AF37]">بيروت</span>
              </button>
              <button 
                onClick={() => setActiveTab('outside_beirut')} 
                className="hover:text-amber-300 transition-colors text-right py-1 flex items-center justify-between bg-stone-800/60 hover:bg-stone-800 px-3 rounded-lg border border-stone-800"
              >
                <span>عقارات خارج بيروت والمحافظات</span>
                <span className="text-[10px] text-[#D4AF37]">الجبل والمناطق</span>
              </button>
            </div>
          </div>

          {/* Col 3: Unified Mobile Application for Both iPhone and Android */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-stone-300 uppercase tracking-wider">تطبيق الهاتف الذكي</p>
            <p className="text-xs text-stone-400 leading-relaxed">
              تطبيق شامل وسريع يعمل على كافة أجهزة <strong>الأيفون والأندرويد</strong> (iPhone, iPad & Android) لتصفح أحدث العقارات فورياً.
            </p>

            <div className="pt-1">
              <button 
                onClick={() => onOpenAppDownload?.('unified')} 
                className="w-full bg-gradient-to-r from-emerald-900 via-stone-800 to-stone-900 hover:from-emerald-800 hover:to-stone-800 p-3 rounded-xl border border-[#D4AF37]/60 flex items-center justify-between gap-3 cursor-pointer transition-all shadow-md group hover:scale-[1.02]"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#064E3B] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shrink-0">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors whitespace-nowrap">تحميل تطبيق الهواتف الذكية</span>
                      <span className="text-[9px] bg-[#D4AF37] text-stone-950 font-black px-1.5 py-0.5 rounded-full whitespace-nowrap">iOS & Android</span>
                    </div>
                    <span className="text-[10px] text-stone-300 block">متوافق مع أجهزة iPhone و Android</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm shrink-0 bg-white/10 p-1.5 rounded-lg text-white">
                  <span>🍏</span>
                  <span>🤖</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Admin link */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <p>© 2026 M.Nassar Real Estate — كافة الحقوق محفوظة</p>
          <button 
            onClick={onOpenAdmin} 
            className="text-[#D4AF37] hover:underline font-bold flex items-center gap-1"
          >
            <span>دخول لوحة التحكم الإدارية</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
};
