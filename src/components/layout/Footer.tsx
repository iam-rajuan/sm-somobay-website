'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Heart, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const Footer = () => {
  const { language } = useLanguage();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-14 pb-8 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: About */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-emerald-700 flex flex-col items-center justify-center text-white shrink-0 shadow-sm border border-emerald-600/60">
                <span className="text-[10px] font-bold leading-none">S-M</span>
                <span className="text-[9px] leading-none mt-0.5">🤝</span>
              </div>
              <div>
                <span className="font-bold text-sm text-white block leading-tight">
                  {language === 'bn'
                    ? 'এস, এম ক্ষুদ্র সঞ্চয় ও ঋণদান সমবায় সমিতি লিঃ'
                    : 'S.M. Somobay Somity Ltd.'}
                </span>
                <span className="text-[11px] text-emerald-400 font-medium">
                  {language === 'bn' ? 'সোশ্যাল ম্যানেজমেন্ট' : 'Social Management'}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed">
              {language === 'bn'
                ? 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার কর্তৃক অনুমোদিত সদস্য-ভিত্তিক সমবায় প্রতিষ্ঠান। ক্ষুদ্র সঞ্চয় ও ঋণদান ব্যবস্থাপনায় আধুনিক ১০০% ডিজিটাল পাশ বই ও শতভাগ জবাবদিহিতা।'
                : 'Government approved cooperative financial institution. Empowering members through modern electronic passbooks, micro-savings, and ethical credit management.'}
            </p>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-emerald-400 font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'নিবন্ধন নং: ট-ক ২৮৪০/২১' : 'Reg No: T-K 2840/21'}</span>
            </div>
          </div>

          {/* Col 2: Financial Products */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              {language === 'bn' ? 'আর্থিক স্কিমসমূহ' : 'Financial Schemes'}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-slate-400">
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">
                {language === 'bn' ? '• সাধারণ দৈনিক ও সাপ্তাহিক সঞ্চয়' : '• Daily & Weekly Savings'}
              </li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">
                {language === 'bn' ? '• ডিপিএস পেনশন মেয়াদী সঞ্চয়' : '• Deposit Pension Scheme (DPS)'}
              </li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">
                {language === 'bn' ? '• এফডিআর এককালীন স্থায়ী আমানত' : '• Fixed Deposit Receipt (FDR)'}
              </li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">
                {language === 'bn' ? '• সহজ কিস্তির ক্ষুদ্রঋণ ও বিনিয়োগ' : '• Micro-Credit & SME Loans'}
              </li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">
                {language === 'bn' ? '• সদস্য সমবায় শেয়ার মূলধন' : '• Member Cooperative Share'}
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              {language === 'bn' ? 'সদস্য সেবাসমূহ' : 'Member Services'}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-slate-400">
              <li>
                <Link href="/member" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span>→</span>
                  <span>{language === 'bn' ? 'সঞ্চয় ও ঋণের ডিজিটাল পাশ বই' : 'Digital Passbook Portal'}</span>
                </Link>
              </li>
              <li>
                <a href="#calculator" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span>→</span>
                  <span>{language === 'bn' ? 'ঋণ ও ডিপিএস ক্যালকুলেটর' : 'Financial Calculator'}</span>
                </a>
              </li>
              <li>
                <a href="#branches" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span>→</span>
                  <span>{language === 'bn' ? 'শাখা ও সেবাকেন্দ্র তালিকা' : 'Branch Directory'}</span>
                </a>
              </li>
              <li>
                <a href="#notices" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span>→</span>
                  <span>{language === 'bn' ? 'সমিতির নোটিশ ও সার্কুলার' : 'Official Notices'}</span>
                </a>
              </li>
              <li>
                <a href="http://localhost:3001" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-emerald-400 font-medium">
                  <span>→</span>
                  <span>{language === 'bn' ? 'কর্মকর্তা ও মাঠকর্মী ERP' : 'Staff & Officer ERP'}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              {language === 'bn' ? 'প্রধান কার্যালয় ও যোগাযোগ' : 'Head Office & Contact'}
            </h4>
            <div className="space-y-3 text-xs sm:text-[13px] text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                <span>
                  {language === 'bn'
                    ? 'এলেঙ্গা বাসস্ট্যান্ড সংলগ্ন, কালিহাতী, টাঙ্গাইল, বাংলাদেশ'
                    : 'Elenga Bus Stand, Kalihati, Tangail, Bangladesh'}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-mono">{language === 'bn' ? '০১৭০০-০০০০০০' : '+880 1700-000000'}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-mono">info@smsomobay.org.bd</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>
            © {new Date().getFullYear()}{' '}
            {language === 'bn'
              ? 'এস, এম ক্ষুদ্র সঞ্চয় ও ঋণদান সমবায় সমিতি লিঃ। সর্বস্বত্ব সংরক্ষিত।'
              : 'S.M. Khudra Sanchay O Rindan Samabay Samity Ltd. All rights reserved.'}
          </p>
          <p className="flex items-center gap-1">
            {language === 'bn' ? (
              <>
                বাংলাদেশের সমবায় ব্যাংকিং ব্যবস্থার জন্য ডিজিটাল সেবা{' '}
                <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500" />
              </>
            ) : (
              <>
                Engineered with{' '}
                <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500" /> for Cooperative Banking
              </>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
};
