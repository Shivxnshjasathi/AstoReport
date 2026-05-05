'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

interface BookMockupProps {
  title: string;
}

export default function BookMockup({ title }: BookMockupProps) {
  return (
    <motion.div 
      initial={{ rotateY: -30, rotateX: 10 }}
      animate={{ rotateY: -15, rotateX: 5 }}
      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      className="relative w-[220px] h-[300px] sm:w-[280px] sm:h-[380px] md:w-[380px] md:h-[520px] group"
    >
      {/* Book Spine */}
      <div className="absolute top-0 left-0 w-6 md:w-8 h-full bg-[#B78E28] rounded-l-md shadow-2xl transform-style-3d -rotate-y-90 origin-right z-20" />
      
      {/* Book Cover */}
      <div className="absolute inset-0 bg-[#1A1A1A] border-2 border-[#B78E28]/40 rounded-r-xl shadow-2xl overflow-hidden flex flex-col p-6 md:p-8 z-10 transform-style-3d">
        <div className="absolute inset-0 bg-gradient-to-br from-[#B78E28]/5 to-transparent pointer-events-none" />
        
        <div className="flex flex-col items-center text-center mt-6 md:mt-12 mb-auto">
          <div className="w-10 h-10 md:w-16 md:h-16 border border-[#B78E28]/30 rounded-full flex items-center justify-center mb-6 md:mb-8">
             <Zap className="w-5 h-5 md:w-8 md:h-8 text-[#B78E28] opacity-50" />
          </div>
          <h2 className="text-lg md:text-3xl font-serif text-[#E5D6C8] uppercase tracking-widest leading-tight mb-4 px-2">
            {title}
          </h2>
          <div className="w-10 h-px bg-[#B78E28]/40 mb-4" />
          <p className="text-[8px] md:text-[10px] text-[#7D756B] uppercase tracking-[0.3em]">Premium Report</p>
        </div>

        <div className="mt-auto text-center">
           <div className="text-[7px] md:text-[8px] text-[#7D756B] uppercase tracking-[0.4em] mb-4 font-bold">ASTROREPORT ✧ 2026</div>
        </div>
      </div>

      {/* Pages Effect */}
      <div className="absolute top-1 right-[-4px] w-[95%] h-[98%] bg-[#E5D6C8]/10 border border-[#E5D6C8]/20 rounded-r-xl z-0" />
      <div className="absolute top-2 right-[-8px] w-[95%] h-[96%] bg-[#E5D6C8]/5 border border-[#E5D6C8]/10 rounded-r-xl -z-10" />
    </motion.div>
  );
}
