'use client';

import React from 'react';
import { Phone, Mail, MapPin, Heart } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const Footer = () => {
  const { language } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: About */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-emerald-700 flex items-center justify-center text-white font-bold text-xs shrink-0">
                {language === 'bn' ? 'এস,এম' : 'SM'}
              </div>
              <span className="font-semibold text-sm text-white leading-tight">
                {language === 'bn'
                  ? 'এস, এম ক্ষুদ্র সঞ্চয় ও ঋণদান সমবায় সমিতি লিঃ'
                  : 'S.M. Somobay Somity Ltd.'}
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {language === 'bn'
                ? 'সদস্য-ভিত্তিক ক্ষুদ্র সঞ্চয় ও ঋণ কার্যক্রম। সদস্যের আর্থিক সচ্ছলতা ও সার্বিক উন্নয়নের লক্ষ্যে বিশ্বস্ত সমবায় প্রতিষ্ঠান।'
                : 'Member-centric micro-savings and credit services. Dedicated to the financial stability and economic empowerment of cooperative members.'}
            </p>
            <div className="text-xs text-emerald-400 font-medium">
              {language === 'bn'
                ? 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত • রেজিঃ ট-ক ২৮৪০/২১'
                : 'Approved by Govt. of Bangladesh • Reg: T-K 2840/21'}
            </div>
          </div>

          {/* Col 2: Financial Products */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
              {language === 'bn' ? 'আর্থিক স্কিমসমূহ' : 'Financial Schemes'}
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                {language === 'bn'
                  ? 'সাধারণ সঞ্চয় হিসাব'
                  : 'General Savings Account'}
              </li>
              <li>
                {language === 'bn'
                  ? 'ডিপিএস মেয়াদী আমানত'
                  : 'Deposit Pension Scheme (DPS)'}
              </li>
              <li>
                {language === 'bn'
                  ? 'এফডিআর স্থায়ী আমানত'
                  : 'Fixed Deposit Receipt (FDR)'}
              </li>
              <li>
                {language === 'bn'
                  ? 'ক্ষুদ্র ব্যবসা ও কৃষি ঋণ'
                  : 'Micro-Credit & SME Loans'}
              </li>
              <li>
                {language === 'bn'
                  ? 'সদস্য শেয়ার মূলধন'
                  : 'Member Share Capital'}
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
              {language === 'bn' ? 'সদস্য সেবাসমূহ' : 'Member Services'}
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="/member" className="hover:text-emerald-400 transition">
                  {language === 'bn' ? 'ইলেকট্রনিক পাশ বই পোর্টাল' : 'Electronic Passbook Portal'}
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-emerald-400 transition">
                  {language === 'bn' ? 'ঋণ ও ডিপিএস মুনাফা ক্যালকুলেটর' : 'Amortization & Profit Calculator'}
                </a>
              </li>
              <li>
                <a href="#notices" className="hover:text-emerald-400 transition">
                  {language === 'bn' ? 'বার্ষিক সাধারণ সভা (AGM) নোটিশ' : 'Annual General Meeting (AGM) Notice'}
                </a>
              </li>
              <li>
                <a href="http://localhost:3001" className="hover:text-emerald-400 transition">
                  {language === 'bn' ? 'মাঠকর্মী ও কর্মকর্তা ERP লগইন' : 'Field Collector & Staff Login'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
              {language === 'bn' ? 'যোগাযোগ' : 'Contact'}
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                <span>
                  {language === 'bn'
                    ? 'এলেঙ্গা বাসস্ট্যান্ড সংলগ্ন, কালিহাতী, টাঙ্গাইল'
                    : 'Elenga Bus Stand, Kalihati, Tangail, Bangladesh'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="font-mono text-sm">
                  {language === 'bn' ? '০১৭০০-০০০০০০' : '+880 1700-000000'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="font-mono text-sm">info@smsomobay.org.bd</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>
            © {new Date().getFullYear()}{' '}
            {language === 'bn'
              ? 'এস, এম ক্ষুদ্র সঞ্চয় ও ঋণদান সমবায় সমিতি লিঃ। সর্বস্বত্ব সংরক্ষিত।'
              : 'S.M. Khudra Sanchay O Rindan Samabay Samity Ltd. All rights reserved.'}
          </p>
          <p className="flex items-center gap-1">
            {language === 'bn' ? (
              <>
                বাংলাদেশের সমবায় ব্যাংকিং ব্যবস্থার জন্য প্রস্তুতকৃত{' '}
                <Heart className="w-3 h-3 text-rose-500 inline fill-rose-500" />
              </>
            ) : (
              <>
                Engineered with{' '}
                <Heart className="w-3 h-3 text-rose-500 inline fill-rose-500" /> for Bangladeshi Cooperatives
              </>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
};
