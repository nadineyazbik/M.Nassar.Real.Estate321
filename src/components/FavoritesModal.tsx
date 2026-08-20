import React from 'react';
import { Heart, X, Trash2, MessageCircle, Bed, Bath, Maximize, MapPin, ArrowLeft } from 'lucide-react';
import { Property } from '../types';
import { StorageService } from '../services/storage';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Property[];
  onSelectProperty: (property: Property) => void;
  onRemoveFavorite: (propertyId: string) => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  favorites,
  onSelectProperty,
  onRemoveFavorite
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/80 backdrop-blur-sm dir-rtl animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="bg-[#064E3B] text-white p-4 sm:p-5 flex items-center justify-between border-b border-[#D4AF37]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-md font-bold">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="text-base font-bold flex items-center gap-2">
                <span>عقاراتي المفضلة</span>
                <span className="bg-[#D4AF37] text-white text-[10px] px-2 py-0.5 rounded font-bold">
                  {favorites.length} عقار
                </span>
              </h3>
              <p className="text-xs text-stone-200 mt-0.5">
                قائمة العقارات التي قمت بحفظها للرجوع إليها لاحقاً
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

        {/* Body */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3">
          {favorites.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto border border-rose-200">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-stone-800">لا توجد عقارات في المفضلة حالياً</h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                يمكنك الضغط على أيقونة القلب على صورة أي عقار لحفظه في هذه القائمة بسهولة.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {favorites.map((property) => (
                <div
                  key={property.id}
                  className="bg-stone-50 hover:bg-stone-100/80 border border-stone-200 rounded-xl p-3 flex flex-col sm:flex-row items-center gap-3 transition-colors"
                >
                  {/* Thumbnail */}
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full sm:w-28 h-20 object-cover rounded-lg shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 text-right space-y-1 w-full">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-bold text-xs sm:text-sm text-stone-900 line-clamp-1">
                        {property.title}
                      </h4>
                      <span className="text-xs font-black text-[#064E3B] shrink-0">
                        ${property.price.toLocaleString()}
                      </span>
                    </div>

                    <p className="text-[11px] text-stone-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#D4AF37]" />
                      <span>{property.location}</span>
                    </p>

                    <div className="flex items-center gap-3 text-[10px] text-stone-600 font-medium pt-1">
                      <span className="flex items-center gap-1">
                        <Bed className="w-3 h-3 text-[#064E3B]" />
                        <span>{property.bedrooms} نوم</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Bath className="w-3 h-3 text-[#064E3B]" />
                        <span>{property.bathrooms} حمام</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Maximize className="w-3 h-3 text-[#064E3B]" />
                        <span>{property.areaSqM} م²</span>
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-200">
                    <a
                      href={StorageService.getWhatsAppLink(property)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#064E3B] hover:bg-[#04382a] text-white text-[10px] font-bold px-2.5 py-1.5 rounded flex items-center gap-1 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>استفسر</span>
                    </a>

                    <button
                      onClick={() => {
                        onClose();
                        onSelectProperty(property);
                      }}
                      className="bg-stone-200 hover:bg-[#D4AF37] hover:text-white text-stone-800 text-[10px] font-bold px-2.5 py-1.5 rounded transition-colors flex items-center gap-1"
                    >
                      <span>التفاصيل</span>
                      <ArrowLeft className="w-3 h-3" />
                    </button>

                    <button
                      onClick={() => onRemoveFavorite(property.id)}
                      className="p-1.5 rounded bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                      title="إزالة من المفضلة"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
