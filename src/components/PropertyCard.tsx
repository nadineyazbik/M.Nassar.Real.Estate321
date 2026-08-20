import React, { useState } from 'react';
import { Property } from '../types';
import { StorageService } from '../services/storage';
import { MapPin, Bed, Bath, Maximize, MessageCircle, ChevronRight, ChevronLeft, Sparkles, Heart } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onSelectProperty: (property: Property) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (propertyId: string, e: React.MouseEvent) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelectProperty,
  isFavorite = false,
  onToggleFavorite
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = property.images && property.images.length > 0 
    ? property.images 
    : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'];

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const waLink = StorageService.getWhatsAppLink(property);
  const isArchived = property.status === 'archived' || property.status === 'sold';

  return (
    <div 
      onClick={() => onSelectProperty(property)}
      className="group bg-white rounded-xl overflow-hidden border border-stone-200 hover:border-[#D4AF37] transition-all duration-300 flex flex-col shadow-sm hover:shadow-md hover:-translate-y-1 cursor-pointer relative"
    >
      {/* Property Image Container */}
      <div className="relative h-48 sm:h-52 w-full bg-stone-200 overflow-hidden">
        <img
          src={images[currentImageIndex]}
          alt={property.title}
          className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ${isArchived ? 'grayscale' : ''}`}
        />

        {/* Carousel arrows */}
        {images.length > 1 && (
          <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <button
              type="button"
              onClick={handlePrevImage}
              className="p-1 rounded-full bg-black/60 text-white hover:bg-[#064E3B] transition-colors"
              aria-label="السابق"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleNextImage}
              className="p-1 rounded-full bg-black/60 text-white hover:bg-[#064E3B] transition-colors"
              aria-label="التالي"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-2 inset-x-2 flex items-center justify-between z-10">
          <div className="flex items-center gap-1">
            <span className="bg-[#064E3B] text-white text-[9px] px-2 py-0.5 rounded font-bold shadow-sm">
              {property.regionCategory === 'inside_beirut' ? 'داخل بيروت' : 'خارج بيروت'}
            </span>
            {property.featured && !isArchived && (
              <span className="bg-[#D4AF37] text-white text-[9px] px-2 py-0.5 rounded font-bold shadow-sm flex items-center gap-0.5">
                <Sparkles className="w-2.5 h-2.5" />
                <span>مميز</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {/* Heart / Favorite Button */}
            {onToggleFavorite && (
              <button
                type="button"
                onClick={(e) => onToggleFavorite(property.id, e)}
                className={`p-1.5 rounded-full backdrop-blur-md transition-all shadow ${
                  isFavorite
                    ? 'bg-rose-500 text-white hover:bg-rose-600 scale-110'
                    : 'bg-black/40 text-white hover:bg-black/70 hover:scale-105'
                }`}
                title={isFavorite ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
              >
                <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            )}

            {isArchived ? (
              <span className="bg-stone-900 text-white text-[9px] px-2 py-0.5 rounded font-bold">
                تم البيع - أرشيف
              </span>
            ) : (
              <span className="bg-emerald-700 text-white text-[9px] px-2 py-0.5 rounded font-bold">
                {property.transactionType === 'sale' ? 'للبيع' : 'للإيجار'}
              </span>
            )}
          </div>
        </div>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-2 left-2 z-10">
          <span className="bg-white/95 backdrop-blur-md text-[#064E3B] text-xs font-black px-2.5 py-1 rounded shadow-sm border border-stone-200">
            ${property.price.toLocaleString()}
          </span>
        </div>

        {/* Image Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-2 right-2 flex items-center gap-1 z-10">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentImageIndex ? 'w-4 bg-[#D4AF37]' : 'w-1.5 bg-white/70'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Property Details Body */}
      <div className="p-3.5 flex-1 flex flex-col justify-between text-right space-y-3">
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-stone-900 group-hover:text-[#064E3B] transition-colors line-clamp-1 leading-snug">
            {property.title}
          </h3>

          <p className="text-[11px] text-stone-500 flex items-center gap-1 mt-1 line-clamp-1">
            <MapPin className="w-3 h-3 text-[#D4AF37] shrink-0" />
            <span>{property.location}</span>
          </p>
        </div>

        {/* Specs Bar */}
        <div className="flex items-center justify-between border-t border-stone-100 pt-2 text-[10px] text-stone-600 font-medium">
          <span className="flex items-center gap-1">
            <Bed className="w-3 h-3 text-[#064E3B]" />
            <span>{property.bedrooms > 0 ? `${property.bedrooms} غرف` : '-'}</span>
          </span>
          <span className="flex items-center gap-1">
            <Bath className="w-3 h-3 text-[#064E3B]" />
            <span>{property.bathrooms > 0 ? `${property.bathrooms} حمام` : '-'}</span>
          </span>
          <span className="flex items-center gap-1">
            <Maximize className="w-3 h-3 text-[#064E3B]" />
            <span>{property.areaSqM} م²</span>
          </span>
        </div>

        {/* Action Buttons */}
        <div className="pt-1 flex items-center gap-2">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 bg-[#064E3B] hover:bg-[#04382a] text-white font-bold text-[11px] py-1.5 px-2 rounded flex items-center justify-center gap-1 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>استفسر واتساب</span>
          </a>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectProperty(property);
            }}
            className="bg-stone-100 hover:bg-[#D4AF37] hover:text-white text-stone-700 font-bold text-[11px] py-1.5 px-3 rounded transition-colors"
          >
            التفاصيل
          </button>
        </div>
      </div>
    </div>
  );
};
