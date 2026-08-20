import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibilityAndProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      if (totalHeight > 0) {
        setScrollProgress((currentScroll / totalHeight) * 100);
      }

      if (currentScroll > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibilityAndProgress);
    return () => window.removeEventListener('scroll', toggleVisibilityAndProgress);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 left-6 z-40 bg-[#064E3B] hover:bg-[#04382a] text-white p-3 rounded-full shadow-xl border border-[#D4AF37] transition-all hover:scale-110 flex items-center justify-center group"
      aria-label="العودة لأعلى الصفحة"
      title="العودة لأعلى الصفحة"
    >
      <div className="relative flex items-center justify-center">
        <ChevronUp className="w-5 h-5 text-[#D4AF37] group-hover:-translate-y-0.5 transition-transform" />
      </div>
      
      {/* Scroll Progress Ring Accent */}
      <span 
        className="absolute inset-0 rounded-full border-2 border-[#D4AF37]/40 pointer-events-none" 
        style={{
          clipPath: `inset(${100 - scrollProgress}% 0 0 0)`
        }}
      />
    </button>
  );
};
