'use client';

import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';

export default function FloatingCart() {
  const { cart } = useCart();
  const itemCount = cart.length;

  if (itemCount === 0) return null;

  return (
    <div className="fixed bottom-32 md:bottom-8 right-6 z-[100]">
      <Link href="/checkout">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-16 h-16 bg-[#B78E28] text-[#121212] rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(183,142,40,0.4)] cursor-pointer group relative"
        >
          <ShoppingCart className="w-8 h-8 group-hover:rotate-[-10deg] transition-transform" />
          
          {/* Item Count Badge */}
          <AnimatePresence mode="wait">
            <motion.span
              key={itemCount}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -top-1 -right-1 w-6 h-6 bg-[#E5D6C8] text-[#121212] rounded-full border-2 border-[#121212] flex items-center justify-center text-[10px] font-bold shadow-lg"
            >
              {itemCount}
            </motion.span>
          </AnimatePresence>

          {/* Glowing Effect */}
          <span className="absolute inset-0 rounded-full border border-[#B78E28] animate-ping opacity-20" />
        </motion.div>
      </Link>
    </div>
  );
}
