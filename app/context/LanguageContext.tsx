'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('astro_lang') as Language;
    if (saved) setLanguageState(saved);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('astro_lang', lang);
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <LanguageContext.Provider value={{ language: 'en', setLanguage }}>{children}</LanguageContext.Provider>;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
