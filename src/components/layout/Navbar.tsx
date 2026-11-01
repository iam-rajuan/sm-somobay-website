'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, UserCheck, ShieldCheck, Sun, Moon, Phone } from 'lucide-react';
import { Button } from '../ui/button';
import { useLanguage } from '@/context/LanguageContext';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, theme, toggleTheme } = useLanguage();

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-[#0b1324] border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Top info bar */}
      <div className="bg-slate-900 text-white text-xs py-1.5 border-b border-slate-800 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              {language === 'bn'
                ? 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত • রেজিঃ ট-ক ২৮৪০/২১ • এলেঙ্গা, কালিহাতী'
                : 'Approved by Govt. of Bangladesh • Reg: T-K 2840/21 • Elenga, Kalihati'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1.5 text-xs text-slate-400">
              <Phone className="w-3 h-3 text-emerald-400" />
              <span className="font-mono">{language === 'bn' ? '০১৭০০-০০০০০০' : '01700-000000'}</span>
            </span>

            {/* Dark / Light Mode Switch */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-slate-300" />
              )}
            </button>

            {/* Language Switcher */}
            <div className="flex items-center border border-slate-700 rounded overflow-hidden">
              <button
                type="button"
                onClick={() => setLanguage('bn')}
                className={`px-2 py-0.5 text-[11px] font-medium transition cursor-pointer ${
                  language === 'bn'
                    ? 'bg-emerald-700 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                বাংলা
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 text-[11px] font-medium transition cursor-pointer ${
                  language === 'en'
                    ? 'bg-emerald-700 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with S-M Handshake emblem */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-md bg-emerald-700 flex flex-col items-center justify-center text-white shrink-0 shadow-sm border border-emerald-600/60">
              <span className="text-[10px] font-bold tracking-wider leading-none">S-M</span>
              <span className="text-[9px] font-medium leading-none opacity-90 mt-0.5">🤝</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm sm:text-[15px] text-slate-900 dark:text-white block leading-tight">
                  {language === 'bn'
                    ? 'এস, এম ক্ষুদ্র সঞ্চয় ও ঋণদান সমবায় সমিতি লিঃ'
                    : 'S.M. Khudra Sanchay O Rindan Samabay Samity Ltd.'}
                </span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">
                {language === 'bn'
                  ? 'সোশ্যাল ম্যানেজমেন্ট • প্রধান কার্যালয়: এলেঙ্গা, কালিহাতী'
                  : 'Social Management • Head Office: Elenga, Kalihati'}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 text-slate-600 dark:text-slate-300">
            <Link href="#schemes" className="px-3 py-2 text-xs sm:text-sm font-medium hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-md transition">
              {language === 'bn' ? 'স্কিমসমূহ' : 'Schemes'}
            </Link>
            <Link href="#calculator" className="px-3 py-2 text-xs sm:text-sm font-medium hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-md transition">
              {language === 'bn' ? 'ক্যালকুলেটর' : 'Calculator'}
            </Link>
            <Link href="#branches" className="px-3 py-2 text-xs sm:text-sm font-medium hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-md transition">
              {language === 'bn' ? 'শাখাসমূহ' : 'Branches'}
            </Link>
            <Link href="#notices" className="px-3 py-2 text-xs sm:text-sm font-medium hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-md transition">
              {language === 'bn' ? 'নোটিশ বোর্ড' : 'Notices'}
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/member">
              <Button variant="outline" size="sm" className="gap-1.5 font-medium">
                <UserCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{language === 'bn' ? 'ডিজিটাল পাশ বই' : 'Digital Passbook'}</span>
              </Button>
            </Link>

            <a href="http://localhost:3001" target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="sm" className="gap-1.5 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'কর্মকর্তা ERP' : 'Staff ERP'}</span>
              </Button>
            </a>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Language Switch */}
            <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded overflow-hidden">
              <button
                type="button"
                onClick={() => setLanguage('bn')}
                className={`px-2 py-1 text-xs font-medium transition cursor-pointer ${
                  language === 'bn' ? 'bg-emerald-700 text-white' : 'text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900'
                }`}
              >
                বাং
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 text-xs font-medium transition cursor-pointer ${
                  language === 'en' ? 'bg-emerald-700 text-white' : 'text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900'
                }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1324] px-4 pt-3 pb-5 space-y-2">
          <Link
            href="#schemes"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80"
          >
            {language === 'bn' ? 'স্কিমসমূহ' : 'Financial Schemes'}
          </Link>
          <Link
            href="#calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80"
          >
            {language === 'bn' ? 'ক্যালকুলেটর' : 'Calculator'}
          </Link>
          <Link
            href="#branches"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80"
          >
            {language === 'bn' ? 'শাখাসমূহ' : 'Branches'}
          </Link>
          <Link
            href="#notices"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80"
          >
            {language === 'bn' ? 'নোটিশ বোর্ড' : 'Notice Board'}
          </Link>
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <Link href="/member" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full justify-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{language === 'bn' ? 'সদস্য ডিজিটাল পাশ বই' : 'Member Digital Passbook'}</span>
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
