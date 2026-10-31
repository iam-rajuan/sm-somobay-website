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
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      {/* Top info bar */}
      <div className="bg-slate-800 text-white text-xs py-1.5 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <span className="text-slate-300">
            {language === 'bn'
              ? 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত • রেজিঃ ট-ক ২৮৪০/২১'
              : 'Approved by Govt. of Bangladesh • Reg: T-K 2840/21'}
          </span>
          <div className="flex items-center gap-4 text-slate-300">
            <span>{language === 'bn' ? 'হেল্পলাইন: ০১৭০০-০০০০০০' : 'Helpline: 01700-000000'}</span>
            <div className="flex items-center border border-slate-600 rounded overflow-hidden">
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
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded bg-emerald-700 flex items-center justify-center text-white font-bold text-sm tracking-tight shrink-0">
              {language === 'bn' ? 'এস,এম' : 'SM'}
            </div>
            <div>
              <span className="font-semibold text-sm sm:text-[15px] text-slate-900 block leading-tight">
                {language === 'bn'
                  ? 'এস, এম ক্ষুদ্র সঞ্চয় ও ঋণদান সমবায় সমিতি লিঃ'
                  : 'S.M. Khudra Sanchay O Rindan Samabay Samity Ltd.'}
              </span>
              <span className="text-[11px] text-slate-500 font-medium block">
                {language === 'bn'
                  ? 'প্রধান কার্যালয়: এলেঙ্গা, কালিহাতী, টাঙ্গাইল'
                  : 'Head Office: Elenga, Kalihati, Tangail'}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link href="#schemes" className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-emerald-700 hover:bg-slate-50 rounded transition">
              {language === 'bn' ? 'স্কিমসমূহ' : 'Schemes'}
            </Link>
            <Link href="#calculator" className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-emerald-700 hover:bg-slate-50 rounded transition">
              {language === 'bn' ? 'ক্যালকুলেটর' : 'Calculator'}
            </Link>
            <Link href="#branches" className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-emerald-700 hover:bg-slate-50 rounded transition">
              {language === 'bn' ? 'শাখাসমূহ' : 'Branches'}
            </Link>
            <Link href="#notices" className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-emerald-700 hover:bg-slate-50 rounded transition">
              {language === 'bn' ? 'নোটিশ বোর্ড' : 'Notices'}
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/member">
              <Button variant="outline" size="sm" className="gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{language === 'bn' ? 'সদস্য পাসবই' : 'Member Portal'}</span>
              </Button>
            </Link>
            <a href="http://localhost:3001" target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="sm" className="gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'কর্মকর্তা ERP' : 'Staff ERP'}</span>
              </Button>
            </a>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 md:hidden">
            <div className="flex items-center border border-slate-200 rounded overflow-hidden">
              <button
                type="button"
                onClick={() => setLanguage('bn')}
                className={`px-2 py-1 text-xs font-medium transition cursor-pointer ${
                  language === 'bn' ? 'bg-emerald-700 text-white' : 'text-slate-600 bg-white'
                }`}
              >
                বাং
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 text-xs font-medium transition cursor-pointer ${
                  language === 'en' ? 'bg-emerald-700 text-white' : 'text-slate-600 bg-white'
                }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1">
          <Link
            href="#schemes"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            {language === 'bn' ? 'স্কিমসমূহ' : 'Financial Schemes'}
          </Link>
          <Link
            href="#calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            {language === 'bn' ? 'ক্যালকুলেটর' : 'Calculator'}
          </Link>
          <Link
            href="#branches"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            {language === 'bn' ? 'শাখাসমূহ' : 'Branches'}
          </Link>
          <Link
            href="#notices"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded text-sm font-medium text-slate-700 hover:bg-slate-50"
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
