import React, { useState } from 'react';
import { Logo } from './Logo';
import { StorageService, DISPLAY_PHONE } from '../services/storage';
import { SocialLinks } from './SocialLinks';
import { Phone, MessageCircle, Menu, X, Shield, Home, Building2, MapPin, Archive, Heart, Bell, Bot, Sparkles, QrCode, Smartphone } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAdmin: () => void;
  onOpenAiAdvisor?: () => void;
  onOpenFavorites?: () => void;
  favoritesCount?: number;
  onOpenAlerts?: () => void;
  onOpenAppDownload?: (tab?: 'unified' | 'android' | 'ios' | 'qr') => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenAdmin,
  onOpenAiAdvisor,
  onOpenFavorites,
  favoritesCount = 0,
  onOpenAlerts,
  onOpenAppDownload
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'all', label: 'الرئيسية', icon: Home },
    { id: 'inside_beirut', label: 'داخل بيروت', icon: Building2 },
    { id: 'outside_beirut', label: 'خارج بيروت', icon: MapPin },
    { id: 'archived', label: 'الأرشيف (مباع)', icon: Archive },
  ];

  const waLink = StorageService.getWhatsAppLink();

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm text-stone-800 dir-rtl transition-all">
      {/* Top Bar with WhatsApp & Phone info */}
      <div className="bg-[#064E3B] text-white text-xs py-1.5 px-4 sm:px-8 border-b border-[#04382a]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <a 
              href={waLink}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors font-medium text-amber-300"
            >
              <MessageCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>واتساب المبيعات: {DISPLAY_PHONE}</span>
            </a>
            <span className="hidden sm:inline text-emerald-800">|</span>
            <span className="hidden sm:inline text-emerald-100/90">
              عقارات فاخرة في بيروت وكافة المناطق اللبنانية
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            {/* Social Media Links */}
            <div className="flex items-center gap-1.5">
              <span className="hidden md:inline text-stone-300 font-bold ml-1">تابعنا:</span>
              <SocialLinks variant="header" />
            </div>

            <span className="text-emerald-800">|</span>

            {/* Direct Phone */}
            <a href="tel:+96176743414" className="flex items-center gap-1.5 text-amber-300 hover:text-white font-bold">
              <Phone className="w-3 h-3 text-amber-400" />
              <span dir="ltr">{DISPLAY_PHONE}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Editorial Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button 
          onClick={() => setActiveTab('all')} 
          className="text-right focus:outline-none group shrink-0"
        >
          <Logo size="md" />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-stone-600">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 py-1 text-sm font-bold transition-all ${
                  isActive
                    ? 'text-[#064E3B] border-b-2 border-[#D4AF37]'
                    : 'text-stone-600 hover:text-[#064E3B]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#064E3B]' : 'text-stone-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Interactive Features Buttons (AI, Favorites, Alerts, App/QR) */}
        <div className="flex items-center gap-2">
          {/* Professional Universal App Button */}
          {onOpenAppDownload && (
            <button
              id="header-app-download-btn"
              onClick={() => onOpenAppDownload('unified')}
              className="py-1.5 px-3 rounded-full bg-emerald-50 text-[#064E3B] hover:bg-[#064E3B] hover:text-white transition-all border border-emerald-300 relative shrink-0 flex items-center gap-1.5 group shadow-xs whitespace-nowrap"
              title="تحميل تطبيق الهواتف الذكية (iPhone & Android)"
            >
              <Smartphone className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform shrink-0" />
              <span className="text-xs font-extrabold whitespace-nowrap">
                تحميل تطبيق الهواتف الذكية
              </span>
              <span className="hidden xl:inline text-[9px] bg-[#D4AF37] text-stone-950 font-black px-1.5 py-0.5 rounded-full whitespace-nowrap">
                iOS & Android
              </span>
            </button>
          )}

          {/* AI Advisor Button */}
          {onOpenAiAdvisor && (
            <button
              onClick={onOpenAiAdvisor}
              className="bg-[#064E3B] hover:bg-[#04382a] text-white px-3 sm:px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 hover:scale-105 border border-[#D4AF37]/50"
              title="مستشار الذكاء الاصطناعي"
            >
              <Bot className="w-4 h-4 text-[#D4AF37]" />
              <span className="hidden sm:inline">مستشار AI</span>
              <Sparkles className="w-3 h-3 text-amber-300" />
            </button>
          )}

          {/* Property Alerts Bell Button */}
          {onOpenAlerts && (
            <button
              onClick={onOpenAlerts}
              className="p-2 rounded-full bg-stone-100 text-stone-700 hover:bg-[#064E3B] hover:text-white transition-all border border-stone-200 relative shrink-0"
              title="تنبيهات العقارات الجديدة"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping"></span>
            </button>
          )}

          {/* Favorites Heart Button */}
          {onOpenFavorites && (
            <button
              onClick={onOpenFavorites}
              className="p-2 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white transition-all border border-rose-200 relative shrink-0 flex items-center gap-1 px-3"
              title="عقاراتي المفضلة"
            >
              <Heart className="w-4 h-4 fill-current" />
              <span className="text-xs font-bold">{favoritesCount}</span>
            </button>
          )}

          {/* Admin Dashboard */}
          <button
            onClick={onOpenAdmin}
            className="hidden sm:flex items-center gap-1.5 bg-[#D4AF37] hover:bg-[#B45309] text-white font-bold text-xs px-3.5 py-2 rounded-full transition-colors shadow-sm"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>لوحة التحكم</span>
          </button>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-stone-100 text-stone-700 hover:text-[#064E3B] border border-stone-200"
              aria-label="القائمة"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 py-4 space-y-3">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-start gap-3 w-full px-4 py-3 rounded-xl text-sm font-bold text-right ${
                    isActive
                      ? 'bg-[#064E3B] text-white'
                      : 'text-stone-700 bg-stone-50 hover:bg-stone-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-stone-200 flex flex-col gap-2">
            {onOpenAppDownload && (
              <button
                id="drawer-app-download-btn"
                onClick={() => {
                  onOpenAppDownload('unified');
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#064E3B] to-stone-900 text-white font-bold py-3 rounded-xl shadow-sm border border-[#D4AF37]"
              >
                <Smartphone className="w-5 h-5 text-[#D4AF37]" />
                <span>تحميل تطبيق الهواتف الذكية</span>
                <span className="text-xs bg-[#D4AF37] text-stone-900 px-1.5 py-0.5 rounded font-black">iOS & Android</span>
              </button>
            )}

            {onOpenAiAdvisor && (
              <button
                onClick={() => {
                  onOpenAiAdvisor();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full bg-[#064E3B] text-white font-bold py-3 rounded-xl shadow-sm border border-[#D4AF37]"
              >
                <Bot className="w-5 h-5 text-[#D4AF37]" />
                <span>مستشار الذكاء الاصطناعي العقاري</span>
              </button>
            )}

            <button
              onClick={() => {
                onOpenAdmin();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 w-full bg-[#D4AF37] text-white font-bold py-3 rounded-xl shadow-sm"
            >
              <Shield className="w-5 h-5" />
              <span>لوحة التحكم وإدارة العقارات</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
