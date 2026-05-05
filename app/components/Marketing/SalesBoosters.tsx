'use client';

import React from 'react';
import SaleBanner from './SaleBanner';
import WhatsAppWidget from './WhatsAppWidget';
import LiveOrderPulse from './LiveOrderPulse';

export default function SalesBoosters() {
  return (
    <>
      <SaleBanner />
      <WhatsAppWidget />
      <LiveOrderPulse />
    </>
  );
}
