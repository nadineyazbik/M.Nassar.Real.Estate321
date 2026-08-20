import React from 'react';
import { LOGO_BASE64 } from '../assets/logoBase64';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, className = '' }) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28'
  };

  return (
    <div className={`flex items-center gap-3 dir-rtl ${className}`}>
      {/* Exact Official Logo Image */}
      <div className={`relative flex-shrink-0 ${sizeClasses[size]} rounded-full bg-black p-0.5 shadow-md border-2 border-[#D4AF37] group hover:scale-105 transition-transform overflow-hidden`}>
        <img 
          src={LOGO_BASE64} 
          alt="M.Nassar Real Estate Logo" 
          className="w-full h-full object-cover bg-black rounded-full"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/logo.jpg';
          }}
        />
      </div>

      {showText && (
        <div className="flex flex-col text-right leading-tight">
          <div className="flex items-center gap-1.5">
            <span className="text-[#064E3B] text-xl md:text-2xl font-black tracking-tight font-['Tajawal']">
              M.NASSAR
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <span className="text-[#D4AF37] text-[10px] tracking-[0.2em] font-bold uppercase">
            REAL ESTATE - م. نصار العقارية
          </span>
        </div>
      )}
    </div>
  );
};
