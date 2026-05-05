'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const SalesBoosters = dynamic(() => import("./SalesBoosters"), { ssr: false });
const MobileNavBar = dynamic(() => import("../Navigation/MobileNavBar"), { ssr: false });

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SalesBoosters />
      {children}
      <MobileNavBar />
    </>
  );
}
