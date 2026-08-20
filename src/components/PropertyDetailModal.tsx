import React, { useState } from 'react';
import { Property, PropertyComment } from '../types';
import { StorageService } from '../services/storage';
import { X, MapPin, Bed, Bath, Maximize, MessageCircle, Check, Send, User, Sparkles, Heart, Bot, Calculator } from 'lucide-react';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  comments: PropertyComment[];
  onAddComment: (comment: Omit<PropertyComment, 'id' | 'createdAt' | 'status'>) => void;
  onOpenAiValuation?: (property: Property) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (propertyId: string, e: React.MouseEvent) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  comments,
  onAddComment,
  onOpenAiValuation,
  isFavorite = false,
  onToggleFavorite
}) => {
  if (!property) return null;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isCommentSubmitted, setIsCommentSubmitted] = useState(false);

  const images = property.images && property.images.length > 0 
    ? property.images 
    : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'];

  const waLink = StorageService.getWhatsAppLink(property);

  const propertyComments = comments.filter(
    c => c.propertyId === property.id && c.status === 'approved'
  );

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !commentText.trim()) return;

    onAddComment({
      propertyId: property.id,
      propertyTitle: property.title,
      userName: userName.trim(),
      userPhone: userPhone.trim(),
      content: commentText.trim()
    });

    setUserName('');
    setUserPhone('');
    setCommentText('');
    setIsCommentSubmitted(true);
    setTimeout(() => setIsCommentSubmitted(false), 5000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto dir-rtl">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-right my-8 animate-fadeIn">
        
        {/* Header Close & Favorite Actions */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
          {onToggleFavorite && (
            <button
              onClick={(e) => onToggleFavorite(property.id, e)}
              className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-lg ${
                isFavorite
                  ? 'bg-rose-500 text-white hover:bg-rose-600 scale-105'
                  : 'bg-black/60 text-white hover:bg-black/80'
              }`}
              title={isFavorite ? 'إزالة من المفضلة' : 'حفظ في المفضلة'}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          )}

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-black/60 text-white hover:bg-rose-600 transition-all shadow-lg"
            aria-label="إغلاق النافذة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Image Gallery */}
        <div className="bg-slate-950 relative">
          <div className="h-72 sm:h-96 w-full relative overflow-hidden">
            <img
              src={images[selectedImageIndex]}
              alt={property.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40" />

            {/* Price Overlay */}
            <div className="absolute bottom-4 right-4 bg-[#064E3B]/95 border border-[#D4AF37]/50 text-[#D4AF37] px-5 py-2 rounded-2xl shadow-xl backdrop-blur-md">
              <span className="text-xs text-emerald-200 font-bold block">السعر المطلوب</span>
              <span className="text-2xl sm:text-3xl font-black">
                ${property.price.toLocaleString()}
              </span>
            </div>

            {/* Badges */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="bg-[#064E3B] text-[#D4AF37] text-xs font-bold px-3 py-1.5 rounded-xl border border-[#D4AF37]/30">
                {property.regionCategory === 'inside_beirut' ? 'داخل بيروت' : 'خارج بيروت'}
              </span>
              <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow">
                {property.transactionType === 'sale' ? 'للبيع' : 'للإيجار'}
              </span>
            </div>
          </div>

          {/* Gallery Thumbnails Carousel */}
          {images.length > 1 && (
            <div className="p-3 bg-slate-900 flex items-center gap-2 overflow-x-auto border-t border-slate-800">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 h-14 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                    idx === selectedImageIndex ? 'border-[#D4AF37] scale-105 opacity-100' : 'border-slate-700 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Modal Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Title and Location */}
          <div className="space-y-2 border-b border-slate-100 pb-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
              {property.title}
            </h2>

            <div className="flex items-center gap-2 text-slate-600 text-sm font-semibold">
              <MapPin className="w-4 h-4 text-[#064E3B] flex-shrink-0" />
              <span>{property.location}</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500 text-xs">رمز العقار: {property.id}</span>
            </div>
          </div>

          {/* Specs Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#064E3B] text-white p-4 rounded-2xl text-center border border-[#D4AF37]/30 shadow-md">
            <div>
              <span className="text-xs text-emerald-200/80 block mb-1">عدد غرف النوم</span>
              <div className="flex items-center justify-center gap-1.5 font-black text-[#D4AF37] text-base">
                <Bed className="w-4 h-4" />
                <span>{property.bedrooms > 0 ? `${property.bedrooms} نوم` : '-'}</span>
              </div>
            </div>

            <div>
              <span className="text-xs text-emerald-200/80 block mb-1">عدد الحمامات</span>
              <div className="flex items-center justify-center gap-1.5 font-black text-[#D4AF37] text-base">
                <Bath className="w-4 h-4" />
                <span>{property.bathrooms > 0 ? property.bathrooms : '-'}</span>
              </div>
            </div>

            <div>
              <span className="text-xs text-emerald-200/80 block mb-1">المساحة الإجمالية</span>
              <div className="flex items-center justify-center gap-1.5 font-black text-[#D4AF37] text-base">
                <Maximize className="w-4 h-4" />
                <span>{property.areaSqM} م²</span>
              </div>
            </div>

            <div>
              <span className="text-xs text-emerald-200/80 block mb-1">حالة العقار</span>
              <div className="font-black text-emerald-300 text-base">
                {property.status === 'active' ? 'نشط ومتاح' : 'تم البيع / مؤرشف'}
              </div>
            </div>
          </div>

          {/* AI Valuation Banner Callout */}
          {onOpenAiValuation && (
            <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 p-4 rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-3 border border-[#D4AF37] shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37] text-[#064E3B] flex items-center justify-center shrink-0 font-bold">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#D4AF37] flex items-center gap-1.5">
                    <span>تحليل وتثمين هذا العقار بالذكاء الاصطناعي</span>
                    <Sparkles className="w-3 h-3 text-amber-300" />
                  </h4>
                  <p className="text-[11px] text-stone-300 mt-0.5">
                    احصل فوراً على تقرير الذكاء الاصطناعي حول عدالة السعر، العائد الاستثماري المتوقع، والنصيحة العقارية.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenAiValuation(property);
                }}
                className="bg-[#D4AF37] hover:bg-amber-400 text-[#064E3B] font-bold text-xs px-4 py-2 rounded-xl transition-all shadow shrink-0 flex items-center gap-1.5"
              >
                <Calculator className="w-4 h-4" />
                <span>إجراء التثمين الآن</span>
              </button>
            </div>
          )}

          {/* Direct WhatsApp Call to Action */}
          <div className="bg-gradient-to-r from-[#064E3B] via-emerald-800 to-[#064E3B] p-5 rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#D4AF37]/30 shadow-lg">
            <div>
              <h4 className="font-black text-base text-[#D4AF37] flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                <span>مهتم بهذا العقار؟ استفسر مباشرة من م. نصار العقارية</span>
              </h4>
              <p className="text-xs text-emerald-100/90 mt-1">
                تواصل معنا فوراً عبر واتساب لتحديد موعد للمعاينة أو الحصول على سندات الملكية والتفاصيل.
              </p>
            </div>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#D4AF37] hover:bg-amber-400 text-[#064E3B] font-black px-6 py-3 rounded-xl transition-all shadow-lg flex items-center gap-2 flex-shrink-0"
            >
              <MessageCircle className="w-5 h-5" />
              <span>محادثة واتساب فورية</span>
            </a>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#064E3B]" />
              <span>تفاصيل العقار</span>
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              {property.description}
            </p>
          </div>

          {/* Features Checklist */}
          {property.features && property.features.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-black text-slate-900">مميزات ومواصفات الإكسسوارات</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {property.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-emerald-50/60 p-3 rounded-xl border border-emerald-100 text-emerald-900 text-xs font-bold">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Comments & Inquiry Section */}
          <div className="pt-6 border-t border-slate-200 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-[#064E3B]" />
                <span>الأسئلة والتعليقات ({propertyComments.length})</span>
              </h3>
              <span className="text-xs text-slate-500">
                يمكنك كتابة استفسارك وستقوم الإدارة بالرد عليك
              </span>
            </div>

            {/* Approved Comments List */}
            {propertyComments.length > 0 ? (
              <div className="space-y-3">
                {propertyComments.map((c) => (
                  <div key={c.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-right space-y-1">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-bold text-emerald-900 flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-emerald-700" />
                        {c.userName}
                      </span>
                      <span>{c.createdAt}</span>
                    </div>
                    <p className="text-slate-800 text-xs sm:text-sm font-medium pt-1">
                      {c.content}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                لا توجد تعليقات سابقة على هذا العقار حتى الآن. كن أول من يسأل!
              </p>
            )}

            {/* Add Comment Form */}
            <form onSubmit={handleCommentSubmit} className="bg-emerald-950/5 p-5 rounded-2xl border border-emerald-800/20 space-y-3">
              <h4 className="font-bold text-sm text-slate-900">أضف استفسارك حول هذا العقار</h4>

              {isCommentSubmitted && (
                <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>تم إرسال استفسارك بنجاح! سيتم مراجعته وإظهاره فور اعتماد الإدارة.</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">الاسم الكامل *</label>
                  <input
                    type="text"
                    required
                    placeholder="أدخل اسمك"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full bg-white text-slate-900 text-xs rounded-xl p-2.5 border border-slate-300 focus:border-emerald-700 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">رقم الهاتف / واتساب (اختياري)</label>
                  <input
                    type="text"
                    placeholder="+961..."
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="w-full bg-white text-slate-900 text-xs rounded-xl p-2.5 border border-slate-300 focus:border-emerald-700 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">الاستفسار أو السؤال *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="اكتب سؤالك هنا (مثلاً: هل العقار مزود بمولد كهرباء؟ ما هي حالة السند؟)"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full bg-white text-slate-900 text-xs rounded-xl p-2.5 border border-slate-300 focus:border-emerald-700 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-[#064E3B] hover:bg-[#04382a] text-white font-bold text-xs py-2.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow"
              >
                <Send className="w-4 h-4 rotate-180" />
                <span>إرسال التعليق</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
