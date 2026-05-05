'use client';

import React from 'react';
import SaleBanner from './SaleBanner';
import FloatingCart from './FloatingCart';
import LiveOrderPulse from './LiveOrderPulse';

export default function SalesBoosters() {
  return (
    <>
      <SaleBanner />
      <FloatingCart />
      <LiveOrderPulse />
    </>
  );
}
