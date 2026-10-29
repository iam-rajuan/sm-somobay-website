'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'bn' | 'en';

export const toBengaliDigits = (input: string | number): string => {
  if (input === null || input === undefined) return '';
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(input).replace(/[0-9]/g, (digit) => bengaliDigits[parseInt(digit, 10)]);
};

export const toEnglishDigits = (input: string | number): string => {
  if (input === null || input === undefined) return '';
  const bengaliToEnglish: Record<string, string> = {
    '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
    '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9',
  };
  return String(input).replace(/[০-৯]/g, (char) => bengaliToEnglish[char] || char);
};

export const formatCurrency = (val: number, lang: Language = 'bn'): string => {
  if (isNaN(val)) return lang === 'bn' ? '৳ 0.00' : '৳ 0.00';
  const formatted = Math.abs(val).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const prefix = val < 0 ? '-' : '';
  if (lang === 'bn') {
    return `${prefix}৳ ${toBengaliDigits(formatted)}`;
  }
  return `${prefix}৳ ${formatted}`;
};

export const formatNumber = (val: number, lang: Language = 'bn'): string => {
  if (isNaN(val)) return lang === 'bn' ? '০' : '0';
  const str = val.toLocaleString('en-IN');
  return lang === 'bn' ? toBengaliDigits(str) : str;
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  formatMoney: (val: number) => string;
  formatNum: (val: number | string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'bn',
  setLanguage: () => {},
  toggleLanguage: () => {},
  formatMoney: (v) => `৳ ${v}`,
  formatNum: (v) => String(v),
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('bn');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('sm_somity_lang') as Language;
      if (saved === 'bn' || saved === 'en') {
        setLanguageState(saved);
        if (typeof document !== 'undefined') {
          document.documentElement.lang = saved;
          document.documentElement.setAttribute('data-lang', saved);
        }
      } else {
        localStorage.setItem('sm_somity_lang', 'bn');
        if (typeof document !== 'undefined') {
          document.documentElement.lang = 'bn';
          document.documentElement.setAttribute('data-lang', 'bn');
        }
      }
    } catch {
      // safe in non-browser env
    }
  }, []);

  // Dynamic Browser Tab Title and Language HTML attribute sync
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.setAttribute('data-lang', language);
      document.title =
        language === 'en'
          ? 'S.M. Khudra Sanchay O Rindan Samabay Samity Limited'
          : 'এস, এম ক্ষুদ্র সঞ্চয় ও ঋণদান সমবায় সমিতি লিঃ — S.M. Somobay Somity';
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('sm_somity_lang', lang);
      if (typeof document !== 'undefined') {
        document.documentElement.lang = lang;
        document.documentElement.setAttribute('data-lang', lang);
      }
    } catch {}
  };

  const toggleLanguage = () => {
    setLanguage(language === 'bn' ? 'en' : 'bn');
  };

  const formatMoney = (val: number) => formatCurrency(val, language);
  const formatNum = (val: number | string) => {
    const num = typeof val === 'number' ? val : parseFloat(val);
    if (!isNaN(num)) return formatNumber(num, language);
    return language === 'bn' ? toBengaliDigits(val) : String(val);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        formatMoney,
        formatNum,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

