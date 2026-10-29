'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, UserCheck, ShieldCheck, Globe } from 'lucide-react';
import { Button } from '../ui/button';
import { useLanguage } from '@/context/LanguageContext';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-700 flex items-center justify-center text-white shadow-sm font-bold text-base tracking-tight shrink-0">
              {language === 'bn' ? 'এস,এম' : 'SM'}
            </div>
            <div>
              <span className="font-bold text-base sm:text-lg text-slate-900 tracking-tight block leading-tight">
                {language === 'bn'
                  ? 'এস, এম ক্ষুদ্র সঞ্চয় ও ঋণদান সমবায় সমিতি লিঃ'
                  : 'S.M. Khudra Sanchay O Rindan Samabay Samity Ltd.'}
              </span>
              <span className="text-xs text-emerald-700 font-semibold block mt-0.5">
                {language === 'bn'
                  ? 'S.M. Somobay Somity • রেজিঃ ট-ক ২৮৪০/২১'
                  : 'Govt. Reg: T-K 2840/21 • Elenga, Tangail'}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link href="#schemes" className="text-[15px] font-semibold text-slate-600 hover:text-emerald-700 transition">
              {language === 'bn' ? 'স্কিমসমূহ' : 'Schemes'}
            </Link>
            <Link href="#calculator" className="text-[15px] font-semibold text-slate-600 hover:text-emerald-700 transition">
              {language === 'bn' ? 'হিসাব ক্যালকুলেটর' : 'Calculator'}
            </Link>
            <Link href="#branches" className="text-[15px] font-semibold text-slate-600 hover:text-emerald-700 transition">
              {language === 'bn' ? 'শাখা সমবায়' : 'Branches'}
            </Link>
            <Link href="#notices" className="text-[15px] font-semibold text-slate-600 hover:text-emerald-700 transition">
              {language === 'bn' ? 'নোটিশ বোর্ড' : 'Notices'}
            </Link>
          </nav>

          {/* Action Buttons & Language Switcher */}
          <div className="hidden md:flex items-center gap-3.5">
            {/* Segmented Language Toggle Pill */}
            <div className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200">
              <button
                type="button"
                onClick={() => setLanguage('bn')}
                className={`px-3 py-1.5 text-xs sm:text-[13px] font-bold rounded-lg transition cursor-pointer ${
                  language === 'bn'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                বাংলা
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 text-xs sm:text-[13px] font-bold rounded-lg transition cursor-pointer ${
                  language === 'en'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                EN
              </button>
            </div>

            <Link href="/member">
              <Button variant="outline" size="sm" className="gap-2 h-10 px-4 text-xs sm:text-[13px] font-bold rounded-xl">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span>{language === 'bn' ? 'সদস্য পাসবই' : 'Member Portal'}</span>
              </Button>
            </Link>
            <a href="http://localhost:3001" target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="sm" className="gap-2 h-10 px-4 text-xs sm:text-[13px] font-bold rounded-xl">
                <ShieldCheck className="w-4 h-4" />
                <span>{language === 'bn' ? 'কর্মকর্তা ERP' : 'Staff ERP'}</span>
              </Button>
            </a>
          </div>

          {/* Mobile hamburger & mobile lang switch */}
          <div className="flex items-center gap-2 md:hidden">
            <div className="flex items-center rounded-lg bg-slate-100 p-0.5 border border-slate-200">
              <button
                type="button"
                onClick={() => setLanguage('bn')}
                className={`px-2 py-0.5 text-xs font-semibold rounded ${
                  language === 'bn' ? 'bg-white text-emerald-800 shadow-xs font-bold' : 'text-slate-600'
                }`}
              >
                বাং
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 text-xs font-semibold rounded ${
                  language === 'en' ? 'bg-white text-emerald-800 shadow-xs font-bold' : 'text-slate-600'
                }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-3">
          <Link
            href="#schemes"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            {language === 'bn' ? 'স্কিমসমূহ' : 'Financial Schemes'}
          </Link>
          <Link
            href="#calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            {language === 'bn' ? 'মুনাফা ক্যালকুলেটর' : 'Profit Calculator'}
          </Link>
          <Link
            href="#branches"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            {language === 'bn' ? 'শাখা সমবায়' : 'Branch Offices'}
          </Link>
          <Link
            href="#notices"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            {language === 'bn' ? 'নোটিশ বোর্ড' : 'Notice Board'}
          </Link>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <Link href="/member" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full justify-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span>{language === 'bn' ? 'সদস্য ইলেকট্রনিক পাসবই' : 'Member Electronic Passbook'}</span>
              </Button>
            </Link>
            <a href="http://localhost:3001" target="_blank" rel="noopener noreferrer">
              <Button variant="primary" className="w-full justify-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>{language === 'bn' ? 'কর্মকর্তা ERP পোর্টাল' : 'Staff ERP Portal'}</span>
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
