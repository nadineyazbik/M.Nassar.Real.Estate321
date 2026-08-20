import React from 'react';
import { SOCIAL_LINKS, DISPLAY_PHONE } from '../services/storage';

interface SocialLinksProps {
  variant?: 'minimal' | 'pills' | 'cards' | 'header';
  className?: string;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ variant = 'pills', className = '' }) => {
  if (variant === 'header') {
    return (
      <div className={`flex items-center gap-2 text-xs ${className}`}>
        <a
          href={SOCIAL_LINKS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white hover:opacity-90 transition-all hover:scale-110 shadow-sm"
          title="تابعنا على إنستغرام Instagram"
        >
          <InstagramIcon className="w-3.5 h-3.5" />
        </a>

        <a
          href={SOCIAL_LINKS.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-full bg-[#1877F2] text-white hover:opacity-90 transition-all hover:scale-110 shadow-sm"
          title="تابعنا على فيسبوك Facebook"
        >
          <FacebookIcon className="w-3.5 h-3.5" />
        </a>

        <a
          href={SOCIAL_LINKS.tiktok}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-full bg-black border border-stone-700 text-white hover:opacity-90 transition-all hover:scale-110 shadow-sm"
          title="تابعنا على تيك توك TikTok"
        >
          <TikTokIcon className="w-3.5 h-3.5" />
        </a>
      </div>
    );
  }

  if (variant === 'cards') {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 w-full ${className}`}>
        {/* Instagram Card */}
        <a
          href={SOCIAL_LINKS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden bg-gradient-to-r from-purple-900 via-rose-800 to-amber-700 text-white p-3.5 rounded-xl border border-rose-500/30 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow">
              <InstagramIcon className="w-5 h-5" />
            </div>
            <div className="text-right">
              <h4 className="font-bold text-xs text-white group-hover:text-amber-200 transition-colors">إنستغرام Instagram</h4>
              <p className="text-[10px] text-stone-200">@m_nassar_real_estate</p>
            </div>
          </div>
          <span className="text-[10px] bg-white/20 backdrop-blur-md px-2 py-0.5 rounded font-bold group-hover:bg-white group-hover:text-rose-900 transition-all">متابعة</span>
        </a>

        {/* Facebook Card */}
        <a
          href={SOCIAL_LINKS.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-900 text-white p-3.5 rounded-xl border border-blue-400/30 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#1877F2] flex items-center justify-center text-white shadow">
              <FacebookIcon className="w-5 h-5" />
            </div>
            <div className="text-right">
              <h4 className="font-bold text-xs text-white group-hover:text-blue-200 transition-colors">فيسبوك Facebook</h4>
              <p className="text-[10px] text-stone-200">M.Nassar Real Estate</p>
            </div>
          </div>
          <span className="text-[10px] bg-white/20 backdrop-blur-md px-2 py-0.5 rounded font-bold group-hover:bg-white group-hover:text-blue-950 transition-all">متابعة</span>
        </a>

        {/* TikTok Card */}
        <a
          href={SOCIAL_LINKS.tiktok}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden bg-gradient-to-r from-stone-950 via-stone-900 to-neutral-900 text-white p-3.5 rounded-xl border border-stone-700 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-black border border-stone-700 flex items-center justify-center text-white shadow">
              <TikTokIcon className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="text-right">
              <h4 className="font-bold text-xs text-white group-hover:text-cyan-300 transition-colors">تيك توك TikTok</h4>
              <p className="text-[10px] text-stone-300">@m_nassar_real_estate</p>
            </div>
          </div>
          <span className="text-[10px] bg-white/20 backdrop-blur-md px-2 py-0.5 rounded font-bold group-hover:bg-white group-hover:text-black transition-all">متابعة</span>
        </a>
      </div>
    );
  }

  // Default Pills format
  return (
    <div className={`flex items-center gap-2 flex-wrap ${className}`}>
      <a
        href={SOCIAL_LINKS.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:opacity-90 text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm transition-all hover:scale-105"
      >
        <InstagramIcon className="w-3.5 h-3.5" />
        <span>Instagram</span>
      </a>

      <a
        href={SOCIAL_LINKS.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#1877F2] hover:bg-[#166fe5] text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm transition-all hover:scale-105"
      >
        <FacebookIcon className="w-3.5 h-3.5" />
        <span>Facebook</span>
      </a>

      <a
        href={SOCIAL_LINKS.tiktok}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-black hover:bg-stone-900 border border-stone-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm transition-all hover:scale-105"
      >
        <TikTokIcon className="w-3.5 h-3.5 text-cyan-400" />
        <span>TikTok</span>
      </a>
    </div>
  );
};

// SVG Icons
function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function TikTokIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.34 22a6.34 6.34 0 0 0 6.33-6.32V9.05a8.31 8.31 0 0 0 5-1.64v-3.5a4.84 4.84 0 0 1-1.08.78z" />
    </svg>
  );
}
