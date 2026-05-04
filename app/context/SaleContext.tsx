'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface SaleContextType {
  isSaleActive: boolean;
  timeLeft: number | null;
}

const SaleContext = createContext<SaleContextType>({
  isSaleActive: true,
  timeLeft: null,
});

export const SaleProvider = ({ children }: { children: React.ReactNode }) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isSaleActive, setIsSaleActive] = useState(true);

  useEffect(() => {
    const savedEnd = localStorage.getItem('astro_sale_end');
    const now = Date.now();
    let end = 0;

    if (savedEnd) {
      end = parseInt(savedEnd, 10);
    } else {
      // Random duration between 45 mins to 2.5 hours
      const duration = Math.floor(Math.random() * (150 * 60 * 1000 - 45 * 60 * 1000)) + 45 * 60 * 1000;
      end = now + duration;
      localStorage.setItem('astro_sale_end', end.toString());
    }

    const updateTimer = () => {
      const currentNow = Date.now();
      if (currentNow >= end) {
        setTimeLeft(0);
        setIsSaleActive(false);
      } else {
        setTimeLeft(Math.floor((end - currentNow) / 1000));
        setIsSaleActive(true);
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <SaleContext.Provider value={{ isSaleActive, timeLeft }}>
      {children}
    </SaleContext.Provider>
  );
};

export const useSale = () => useContext(SaleContext);
