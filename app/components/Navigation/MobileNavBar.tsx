'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Sparkles, BookOpen, MessageCircle, Gem } from 'lucide-react';

export default function MobileNavBar() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 w-full bg-[#121212]/95 backdrop-blur-xl border-t border-[#7D756B]/30 z-[100] pb-safe">
      <div className="flex items-center justify-around py-3 px-1">
        
        <Link href="/" className={`flex flex-col items-center gap-1 w-14 ${pathname === '/' ? 'text-[#B78E28]' : 'text-[#7D756B] hover:text-[#E5D6C8]'} transition-colors`}>
          <Home className="w-5 h-5" strokeWidth={pathname === '/' ? 2 : 1.5} />
          <span className="text-[8px] uppercase tracking-widest font-semibold">Home</span>
        </Link>
        
        <Link href="/astrology" className={`flex flex-col items-center gap-1 w-14 ${pathname === '/astrology' ? 'text-[#B78E28]' : 'text-[#7D756B] hover:text-[#E5D6C8]'} transition-colors`}>
          <Sparkles className="w-5 h-5" strokeWidth={pathname === '/astrology' ? 2 : 1.5} />
          <span className="text-[8px] uppercase tracking-widest font-semibold">Stars</span>
        </Link>
        
        <Link href="/store" className={`flex flex-col items-center gap-1 w-14 ${pathname === '/store' ? 'text-[#B78E28]' : 'text-[#7D756B] hover:text-[#E5D6C8]'} transition-colors`}>
          <BookOpen className="w-5 h-5" strokeWidth={pathname === '/store' ? 2 : 1.5} />
          <span className="text-[8px] uppercase tracking-widest font-semibold">Reports</span>
        </Link>

        <Link href="/gemstones" className={`flex flex-col items-center gap-1 w-14 ${pathname === '/gemstones' ? 'text-[#B78E28]' : 'text-[#7D756B] hover:text-[#E5D6C8]'} transition-colors`}>
          <Gem className="w-5 h-5" strokeWidth={pathname === '/gemstones' ? 2 : 1.5} />
          <span className="text-[8px] uppercase tracking-widest font-semibold">Gems</span>
        </Link>
        
        <Link href="/contact" className={`flex flex-col items-center gap-1 w-14 ${pathname === '/contact' ? 'text-[#B78E28]' : 'text-[#7D756B] hover:text-[#E5D6C8]'} transition-colors`}>
          <MessageCircle className="w-5 h-5" strokeWidth={pathname === '/contact' ? 2 : 1.5} />
          <span className="text-[8px] uppercase tracking-widest font-semibold">Contact</span>
        </Link>

      </div>
    </div>
  );
}
