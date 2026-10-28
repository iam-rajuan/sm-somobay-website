import React from 'react';
import { Landmark, Phone, Mail, MapPin, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">
                এস,এম
              </div>
              <span className="font-bold text-base text-white">এস, এম ক্ষুদ্র সঞ্চয় ও ঋণদান সমবায় সমিতি লিঃ</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              সদস্য-ভিত্তিক ক্ষুদ্র সঞ্চয় ও ঋণ কার্যক্রম। সদস্যের আর্থিক সচ্ছলতা ও সার্বিক উন্নয়নের লক্ষ্যে বিশ্বস্ত সমবায় প্রতিষ্ঠান।
            </p>
            <div className="text-xs text-emerald-400 font-medium">
              গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত • রেজিঃ ট-ক ২৮৪০/২১
            </div>
          </div>

          {/* Col 2: Financial Products */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Financial Schemes
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>General Savings Account (সাধারণ সঞ্চয়)</li>
              <li>Deposit Pension Scheme (DPS - ডিপিএস)</li>
              <li>Fixed Deposit Receipt (FDR - এফডিআর)</li>
              <li>Microcredit Small Business Loan (ক্ষুদ্র ঋণ)</li>
              <li>Member Share Capital (শেয়ার মূলধন)</li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Member Services
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="/member" className="hover:text-emerald-400 transition">
                  Electronic Passbook
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-emerald-400 transition">
                  Amortization & Profit Calculator
                </a>
              </li>
              <li>
                <a href="#notices" className="hover:text-emerald-400 transition">
                  Annual General Meeting (AGM) Notice
                </a>
              </li>
              <li>
                <a href="http://localhost:3001" className="hover:text-emerald-400 transition">
                  Field Collector & Staff Login
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Head Office Contact
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>প্রধান কার্যালয়: এলেঙ্গা, কালিহাতী, টাঙ্গাইল, বাংলাদেশ (Elenga, Kalihati, Tangail)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+880 1700-000000</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>info@smsomobay.org.bd</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} এস, এম ক্ষুদ্র সঞ্চয় ও ঋণদান সমবায় সমিতি লিঃ (S.M. Somobay Somity). All rights reserved.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500" /> for Bangladeshi Cooperatives
          </p>
        </div>
      </div>
    </footer>
  );
};

