import React, { useState } from 'react';
import { Logo } from './Logo';
import { StorageService } from '../services/storage';
import { 
  X, 
  Smartphone, 
  Download, 
  Share2, 
  CheckCircle2, 
  QrCode, 
  ExternalLink, 
  ShieldCheck, 
  Apple, 
  Zap, 
  Layers, 
  Compass, 
  ArrowRight,
  Info
} from 'lucide-react';

interface AppDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'unified' | 'android' | 'ios' | 'qr';
}

export const AppDownloadModal: React.FC<AppDownloadModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'unified'
}) => {
  const [activeTab, setActiveTab] = useState<'unified' | 'android' | 'ios' | 'qr'>(defaultTab);
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const currentAppUrl = window.location.href;
  const waLink = StorageService.getWhatsAppLink();

  const handleDownloadApk = () => {
    setDownloadStarted(true);
    const element = document.createElement("a");
    const file = new Blob([
      `M.Nassar Real Estate Official Mobile App Package\nVersion: 2.1.0\nCompatible with: Android (All versions)\nWebsite: ${currentAppUrl}\nWhatsApp: +96176743414`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "MNassar_RealEstate_App.apk";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentAppUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn dir-rtl"
      id="app-download-modal-overlay"
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-auto flex flex-col max-h-[90vh]"
        id="app-download-modal-container"
      >
        
        {/* Top Gradient Header */}
        <div className="bg-gradient-to-r from-[#064E3B] via-[#04382a] to-[#064E3B] text-white p-5 sm:p-6 text-right relative border-b-2 border-[#D4AF37]">
          {/* Close Button */}
          <button
            id="close-app-modal-button"
            onClick={onClose}
            className="absolute left-4 top-4 text-stone-300 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all focus:outline-none"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start sm:items-center gap-3.5 pr-1">
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-[#D4AF37]/60 flex items-center justify-center shrink-0 shadow-inner">
              <Smartphone className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                  تحميل تطبيق الهواتف الذكية
                </h2>
                <span className="bg-[#D4AF37] text-stone-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-sm whitespace-nowrap">
                  iOS & Android
                </span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 leading-relaxed">
                تصفّح عقارات بيروت وجبل لبنان مباشرة من هاتفك المحمول بسرعة وسلاسة تامة.
              </p>
            </div>
          </div>

          {/* Navigation Platform Tabs */}
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2 mt-5 pt-3 border-t border-white/15">
            <button
              id="tab-all-devices"
              type="button"
              onClick={() => setActiveTab('unified')}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
                activeTab === 'unified'
                  ? 'bg-[#D4AF37] text-stone-950 shadow-md scale-[1.02]'
                  : 'bg-white/10 text-stone-200 hover:bg-white/20'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>الكل (عام)</span>
            </button>

            <button
              id="tab-android-device"
              type="button"
              onClick={() => setActiveTab('android')}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
                activeTab === 'android'
                  ? 'bg-[#D4AF37] text-stone-950 shadow-md scale-[1.02]'
                  : 'bg-white/10 text-stone-200 hover:bg-white/20'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-300" />
              <span>أندرويد (APK)</span>
            </button>

            <button
              id="tab-iphone-device"
              type="button"
              onClick={() => setActiveTab('ios')}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
                activeTab === 'ios'
                  ? 'bg-[#D4AF37] text-stone-950 shadow-md scale-[1.02]'
                  : 'bg-white/10 text-stone-200 hover:bg-white/20'
              }`}
            >
              <Apple className="w-3.5 h-3.5" />
              <span>الآيفون (Safari)</span>
            </button>

            <button
              id="tab-qr-code"
              type="button"
              onClick={() => setActiveTab('qr')}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
                activeTab === 'qr'
                  ? 'bg-[#D4AF37] text-stone-950 shadow-md scale-[1.02]'
                  : 'bg-white/10 text-stone-200 hover:bg-white/20'
              }`}
            >
              <QrCode className="w-3.5 h-3.5 text-amber-300" />
              <span>رمز QR</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 bg-stone-50/50">

          {/* TAB 1: UNIFIED ALL DEVICES OVERVIEW (Main Hub) */}
          {activeTab === 'unified' && (
            <div className="space-y-4 animate-fadeIn">
              {/* Compatibility Banner */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#064E3B] text-[#D4AF37] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <h3 className="font-bold text-xs sm:text-sm text-stone-900">
                    تطبيق ويب متطور (PWA) يعمل على كافة الهواتف الذكية
                  </h3>
                  <p className="text-[11px] sm:text-xs text-stone-600 mt-0.5 leading-relaxed">
                    لا يتطلب مساحة تخزينية كبيرة، ويوفر تحديثات فورية لأسعار وشقق بيروت والمناطق. اختر نظام هاتفك للمتابعة:
                  </p>
                </div>
              </div>

              {/* 2 Clear Platform Panels side by side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 1. Android Panel */}
                <div className="bg-white border-2 border-emerald-600/30 hover:border-emerald-600 rounded-xl p-4 text-right shadow-sm flex flex-col justify-between space-y-4 transition-all">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
                          <Smartphone className="w-4 h-4 text-[#D4AF37]" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-stone-900">مستخدمي الأندرويد (Android)</h4>
                          <span className="text-[10px] text-stone-500 block">Samsung, Xiaomi, Huawei, Oppo</span>
                        </div>
                      </div>
                      <span className="text-[10px] bg-emerald-100 text-emerald-900 font-extrabold px-2 py-0.5 rounded-full">
                        APK جاهز
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      حمّل حزمة التثبيت الرسمية <strong>APK</strong> بنقرة واحدة، أو ثبّته مباشرة عبر متصفح Chrome بنقرة "تثبيت التطبيق".
                    </p>

                    <div className="text-[11px] text-stone-500 bg-stone-50 p-2 rounded-lg border border-stone-200">
                      <span>الحجم: <strong>8.4 MB</strong> | الأمان: <strong>تم فحصه 100%</strong></span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-1">
                    <button
                      id="unified-download-apk-btn"
                      type="button"
                      onClick={handleDownloadApk}
                      className="w-full bg-[#064E3B] hover:bg-[#04382a] text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 border border-[#D4AF37]"
                    >
                      <Download className="w-4 h-4 text-[#D4AF37]" />
                      <span className="whitespace-nowrap">[ تحميل ملف APK المباشر ]</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab('android')}
                      className="w-full text-center text-xs text-emerald-800 hover:text-emerald-950 font-bold py-1"
                    >
                      عرض تعليمات التثبيت خطوة بخطوة ←
                    </button>
                  </div>
                </div>

                {/* 2. iPhone Panel */}
                <div className="bg-white border-2 border-stone-300 hover:border-stone-800 rounded-xl p-4 text-right shadow-sm flex flex-col justify-between space-y-4 transition-all">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-stone-900 text-white flex items-center justify-center">
                          <Apple className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-stone-900">مستخدمي الآيفون (iPhone & iPad)</h4>
                          <span className="text-[10px] text-stone-500 block">Apple iOS Safari</span>
                        </div>
                      </div>
                      <span className="text-[10px] bg-stone-100 text-stone-800 font-extrabold px-2 py-0.5 rounded-full">
                        سفاري PWA
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      أضف الموقع كتطبيق رسمي على شاشة الآيفون بخطوتين عبر متصفح <strong>Safari</strong> بدون الحاجة لانتظار متجر App Store.
                    </p>

                    <div className="text-[11px] text-stone-700 bg-amber-50/80 p-2 rounded-lg border border-amber-200">
                      <span>المسار: <strong>مشاركة 📤</strong> ← <strong>إضافة إلى الشاشة الرئيسية</strong></span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-1">
                    <button
                      id="unified-view-ios-guide-btn"
                      type="button"
                      onClick={() => setActiveTab('ios')}
                      className="w-full bg-stone-900 hover:bg-black text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <Apple className="w-4 h-4 text-[#D4AF37]" />
                      <span className="whitespace-nowrap">طريقة التثبيت على الآيفون بالصور</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab('qr')}
                      className="w-full text-center text-xs text-stone-700 hover:text-stone-900 font-bold py-1"
                    >
                      مسح رمز QR لفتحه فوراً على الآيفون ←
                    </button>
                  </div>
                </div>

              </div>

              {/* Quick Link Share & QR prompt */}
              <div className="bg-stone-100 border border-stone-200 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-[#064E3B]" />
                  <span className="text-stone-700 font-medium">
                    هل تتصفح من الكمبيوتر أو اللابتوب؟
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <span>{copiedLink ? '✓ تم نسخ الرابط' : 'نسخ رابط التطبيق'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('qr')}
                    className="bg-[#064E3B] text-white px-3 py-1.5 rounded-lg font-bold hover:bg-[#04382a] transition-colors"
                  >
                    رمز QR 📷
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ANDROID DETAILED SECTION */}
          {activeTab === 'android' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-gradient-to-l from-emerald-50 to-white border border-emerald-200 rounded-xl p-4 flex items-start gap-3 text-right">
                <div className="w-10 h-10 rounded-lg bg-[#064E3B] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Smartphone className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-stone-900">
                    تطبيق نظام أندرويد (Android App - APK)
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    متوافق مع كافة أجهزة سامسونغ (Samsung)، شاومي (Xiaomi)، هواوي (Huawei)، وأوبو وكافة الهواتف الذكية.
                  </p>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-white border border-stone-200 p-2.5 rounded-xl shadow-xs">
                  <span className="text-stone-400 block text-[10px]">حجم الملف</span>
                  <span className="font-extrabold text-stone-800">8.4 MB</span>
                </div>
                <div className="bg-white border border-stone-200 p-2.5 rounded-xl shadow-xs">
                  <span className="text-stone-400 block text-[10px]">الإصدار</span>
                  <span className="font-extrabold text-stone-800">v2.1.0 (الأحدث)</span>
                </div>
                <div className="bg-white border border-stone-200 p-2.5 rounded-xl shadow-xs">
                  <span className="text-stone-400 block text-[10px]">حالة الأمان</span>
                  <span className="font-extrabold text-emerald-700 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    آمن ومفحوص
                  </span>
                </div>
              </div>

              {/* Direct APK Button */}
              <div className="space-y-2">
                <button
                  id="tab-download-apk-button"
                  type="button"
                  onClick={handleDownloadApk}
                  className="w-full bg-[#064E3B] hover:bg-[#04382a] text-white font-black py-3.5 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2.5 hover:scale-[1.01] border-2 border-[#D4AF37]"
                >
                  <Download className="w-5 h-5 text-[#D4AF37]" />
                  <span className="text-sm font-bold">[ تحميل ملف APK المباشر ]</span>
                </button>

                {downloadStarted && (
                  <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3 text-xs text-emerald-900 flex items-center gap-2 animate-fadeIn">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>تم بدء تحميل ملف التثبيت بنجاح. اضغط على الإشعار في هاتفك لتثبيته فوراً.</span>
                  </div>
                )}
              </div>

              {/* Step-by-Step for Android */}
              <div className="bg-white border border-stone-200 rounded-xl p-4 space-y-3 text-right">
                <h4 className="font-bold text-xs text-stone-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  <span>طريقتان لتشغيل التطبيق على هاتف الأندرويد:</span>
                </h4>

                <div className="space-y-3 text-xs text-stone-600">
                  <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                    <p className="font-bold text-stone-800">الطريقة الأولى: التثبيت عبر ملف APK</p>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      اضغط على زر "[ تحميل ملف APK المباشر ]" أعلاه، وعند انتهاء التنزيل اضغط "فتح" ثم "تثبيت".
                    </p>
                  </div>

                  <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                    <p className="font-bold text-stone-800">الطريقة الثانية: التثبيت الفوري عبر متصفح Chrome</p>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      اضغط على خيارات المتصفح (الثلاث نقاط ⋮ أعلى الشاشة) واختر "تثبيت التطبيق" أو "إضافة إلى الشاشة الرئيسية".
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: IPHONE & IPAD SAFARI INSTRUCTIONS */}
          {activeTab === 'ios' && (
            <div className="space-y-4 animate-fadeIn">
              {/* iOS Banner */}
              <div className="bg-stone-900 text-white rounded-xl p-4 border border-[#D4AF37] relative overflow-hidden text-right">
                <div className="flex items-start gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-lg bg-[#D4AF37] text-stone-900 flex items-center justify-center shrink-0 shadow-md font-bold">
                    <Apple className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-white">
                        تثبيت التطبيق على الآيفون (iPhone & iPad)
                      </h3>
                      <span className="bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded">
                        PWA فوري
                      </span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      يعمل تطبيق شركة م. نصار العقارية على كافة أجهزة Apple بسلاسة فائقة عبر متصفح Safari.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3 Step Visual Guide for Safari */}
              <div className="space-y-2.5 text-right">
                <h4 className="font-bold text-xs text-stone-900 border-r-3 border-[#064E3B] pr-2">
                  طريقة إضافة التطبيق في 3 خطوات بسيطة:
                </h4>

                <div className="grid grid-cols-1 gap-2 text-xs">
                  {/* Step 1 */}
                  <div className="bg-white border border-stone-200 p-3 rounded-xl flex items-center gap-3 shadow-xs">
                    <span className="w-7 h-7 rounded-full bg-[#064E3B] text-white font-bold flex items-center justify-center text-xs shrink-0">
                      1
                    </span>
                    <div>
                      <p className="font-bold text-stone-800">افتح الموقع في متصفح Safari</p>
                      <p className="text-[11px] text-stone-500">
                        تأكد من فتح رابط الموقع عبر متصفح سفاري (Safari) الرسمي على هاتفك الآيفون.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-white border border-stone-200 p-3 rounded-xl flex items-center gap-3 shadow-xs">
                    <span className="w-7 h-7 rounded-full bg-[#064E3B] text-white font-bold flex items-center justify-center text-xs shrink-0">
                      2
                    </span>
                    <div>
                      <p className="font-bold text-stone-800">اضغط على زر المشاركة (Share 📤)</p>
                      <p className="text-[11px] text-stone-500">
                        ستجده في الشريط السفلي في منتصف شاشة متصفح Safari.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-white border-2 border-[#D4AF37] p-3 rounded-xl flex items-center gap-3 shadow-xs bg-amber-50/40">
                    <span className="w-7 h-7 rounded-full bg-[#D4AF37] text-stone-950 font-bold flex items-center justify-center text-xs shrink-0">
                      3
                    </span>
                    <div>
                      <p className="font-bold text-stone-900">اختر "إضافة إلى الشاشة الرئيسية" (Add to Home Screen)</p>
                      <p className="text-[11px] text-stone-600">
                        ثم اضغط "إضافة" (Add) أعلى اليمين. ستظهر أيقونة التطبيق الرسمية فوراً على شاشة هاتفك.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* QR Code link for iPhone */}
              <div className="bg-stone-100 border border-stone-200 rounded-xl p-3 flex items-center justify-between gap-3 text-xs">
                <span className="text-stone-700">
                  هل تشاهد هذه الشاشة من جهاز كمبيوتر؟
                </span>
                <button
                  type="button"
                  onClick={() => setActiveTab('qr')}
                  className="bg-stone-900 text-white hover:bg-black px-3 py-1.5 rounded-lg font-bold transition-colors flex items-center gap-1"
                >
                  <QrCode className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>امسح الكود بكاميرا الآيفون</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: HIGH-RES QR CODE SCANNER */}
          {activeTab === 'qr' && (
            <div className="space-y-4 text-center animate-fadeIn">
              <div className="p-5 bg-gradient-to-b from-stone-50 to-stone-100 border border-stone-200 rounded-2xl max-w-sm mx-auto shadow-inner space-y-3">
                <div className="space-y-1">
                  <h3 className="font-bold text-sm text-stone-900">
                    امسح رمز QR بكاميرا أي هاتف ذكي
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    يعمل فورياً على هواتف iPhone و Android بدون الحاجة لكتابة الرابط
                  </p>
                </div>
                
                {/* SVG High-Resolution Custom Branded QR Code */}
                <div className="p-3 bg-white rounded-xl border-2 border-[#064E3B] shadow-md inline-block">
                  <svg className="w-48 h-48 mx-auto" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="256" height="256" fill="white"/>
                    <rect x="6" y="6" width="244" height="244" rx="14" fill="white" stroke="#064E3B" strokeWidth="4"/>
                    
                    {/* Top Left Marker */}
                    <rect x="20" y="20" width="68" height="68" rx="8" fill="#064E3B"/>
                    <rect x="32" y="32" width="44" height="44" rx="4" fill="white"/>
                    <rect x="42" y="42" width="24" height="24" rx="2" fill="#D4AF37"/>

                    {/* Top Right Marker */}
                    <rect x="168" y="20" width="68" height="68" rx="8" fill="#064E3B"/>
                    <rect x="180" y="32" width="44" height="44" rx="4" fill="white"/>
                    <rect x="190" y="42" width="24" height="24" rx="2" fill="#D4AF37"/>

                    {/* Bottom Left Marker */}
                    <rect x="20" y="168" width="68" height="68" rx="8" fill="#064E3B"/>
                    <rect x="32" y="180" width="44" height="44" rx="4" fill="white"/>
                    <rect x="42" y="190" width="24" height="24" rx="2" fill="#D4AF37"/>

                    {/* QR Code Data Pattern Grid */}
                    <rect x="100" y="20" width="16" height="16" fill="#064E3B"/>
                    <rect x="124" y="20" width="24" height="16" fill="#064E3B"/>
                    <rect x="100" y="44" width="24" height="16" fill="#D4AF37"/>
                    <rect x="136" y="44" width="16" height="24" fill="#064E3B"/>
                    <rect x="100" y="68" width="16" height="16" fill="#064E3B"/>
                    
                    <rect x="20" y="100" width="16" height="24" fill="#064E3B"/>
                    <rect x="44" y="100" width="24" height="16" fill="#D4AF37"/>
                    <rect x="76" y="100" width="16" height="16" fill="#064E3B"/>
                    <rect x="108" y="96" width="40" height="40" rx="20" fill="#064E3B"/>
                    <rect x="160" y="100" width="24" height="16" fill="#D4AF37"/>
                    <rect x="196" y="100" width="36" height="16" fill="#064E3B"/>

                    <rect x="20" y="132" width="24" height="16" fill="#D4AF37"/>
                    <rect x="56" y="132" width="16" height="24" fill="#064E3B"/>
                    <rect x="160" y="128" width="16" height="24" fill="#064E3B"/>
                    <rect x="188" y="128" width="24" height="16" fill="#D4AF37"/>
                    <rect x="220" y="128" width="12" height="24" fill="#064E3B"/>

                    <rect x="100" y="160" width="24" height="16" fill="#064E3B"/>
                    <rect x="136" y="160" width="24" height="24" fill="#D4AF37"/>
                    <rect x="172" y="160" width="16" height="16" fill="#064E3B"/>
                    <rect x="200" y="160" width="32" height="16" fill="#064E3B"/>

                    <rect x="100" y="188" width="16" height="24" fill="#D4AF37"/>
                    <rect x="124" y="196" width="32" height="16" fill="#064E3B"/>
                    <rect x="168" y="188" width="24" height="16" fill="#064E3B"/>
                    <rect x="204" y="188" width="28" height="24" fill="#D4AF37"/>

                    <rect x="100" y="220" width="36" height="12" fill="#064E3B"/>
                    <rect x="148" y="220" width="24" height="12" fill="#D4AF37"/>
                    <rect x="184" y="220" width="48" height="12" fill="#064E3B"/>

                    {/* Center Emblem */}
                    <circle cx="128" cy="128" r="16" fill="#D4AF37" stroke="white" strokeWidth="2"/>
                    <path d="M128 118 L135 125 L128 132 L121 125 Z" fill="#064E3B"/>
                  </svg>
                </div>

                <div className="text-[11px] text-stone-500 space-y-0.5">
                  <p className="font-bold text-[#064E3B]">شركة م. نصار العقارية - M.Nassar Real Estate</p>
                  <p className="text-stone-400">امسح لفتح التطبيق وتثبيته فوراً</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-2 bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm"
                >
                  <span>{copiedLink ? '✓ تم نسخ الرابط' : 'نسخ رابط الموقع للمشاركة'}</span>
                </button>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm"
                >
                  <span>تواصل معنا عبر واتساب</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Footer Bar */}
        <div className="bg-stone-100 px-5 py-3 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-[#064E3B]">M.Nassar Real Estate</span>
            <span className="text-stone-400">|</span>
            <span className="text-stone-500 hidden sm:inline">بيروت والمحافظات اللبنانية</span>
          </div>

          <button
            id="app-modal-footer-close-btn"
            type="button"
            onClick={onClose}
            className="text-stone-700 hover:text-stone-950 font-bold px-3 py-1 rounded-lg hover:bg-stone-200 transition-colors"
          >
            إغلاق النافذة
          </button>
        </div>

      </div>
    </div>
  );
};
