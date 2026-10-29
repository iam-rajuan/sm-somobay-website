'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  PiggyBank,
  TrendingUp,
  ReceiptText,
  Building2,
  Users,
  BadgePercent,
  CheckCircle2,
  ArrowRight,
  Calculator,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  FileText,
  Calendar,
  Lock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  // Calculator state
  const [calcTab, setCalcTab] = useState<'loan' | 'dps'>('loan');
  const [loanPrincipal, setLoanPrincipal] = useState<number>(50000);
  const [loanTenureWeeks, setLoanTenureWeeks] = useState<number>(46);
  const [loanRatePct, setLoanRatePct] = useState<number>(15);

  const [dpsMonthly, setDpsMonthly] = useState<number>(1000);
  const [dpsYears, setDpsYears] = useState<number>(5);

  // Loan Amortization Math
  const totalLoanProfit = Math.round((loanPrincipal * loanRatePct) / 100);
  const totalLoanRepayable = loanPrincipal + totalLoanProfit;
  const perInstallmentLoan = Math.round(totalLoanRepayable / loanTenureWeeks);

  // DPS Maturity Math
  const totalDpsDeposit = dpsMonthly * 12 * dpsYears;
  const dpsProfit = Math.round(totalDpsDeposit * 0.085 * (dpsYears / 2));
  const totalDpsMaturity = totalDpsDeposit + dpsProfit;

  return (
    <div className="space-y-24 pb-20">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-slate-50 pt-16 sm:pt-20 pb-20 sm:pb-28 border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold tracking-wide shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত • রেজিঃ ট-ক ২৮৪০/২১</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              এস, এম ক্ষুদ্র সঞ্চয় ও ঋণদান <br className="hidden sm:inline" />
              <span className="text-emerald-700 bg-gradient-to-r from-emerald-700 to-teal-800 bg-clip-text text-transparent">
                সমবায় সমিতি লিঃ
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
              প্রধান কার্যালয়: <strong>এলেঙ্গা, কালিহাতী, টাঙ্গাইল</strong>। সদস্যদের আর্থিক স্বাবলম্বিতা, ১০০% ডিজিটাল সঞ্চয় ও ঋণের পাশ বই এবং স্বচ্ছ ব্যাংকিং ব্যবস্থাপনায় অঙ্গীকারাবদ্ধ।
            </p>

            <div className="flex flex-wrap justify-center items-center gap-3.5 pt-3">
              <Link href="/member">
                <Button size="lg" className="gap-2 text-sm sm:text-base px-7 py-3 rounded-xl shadow-md shadow-emerald-700/20 font-bold bg-emerald-700 hover:bg-emerald-800 text-white">
                  <ReceiptText className="w-5 h-5" />
                  সদস্য ডিজিটাল পাসবই লগইন
                </Button>
              </Link>

              <a href="http://localhost:3001" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="gap-2 text-sm sm:text-base px-7 py-3 rounded-xl border-slate-300 font-bold text-slate-800 hover:bg-slate-100">
                  কর্মকর্তা ERP পোর্টাল
                  <ArrowRight className="w-4 h-4 text-emerald-600" />
                </Button>
              </a>
            </div>
          </div>

          {/* 4 Quick Microfinance Metrics */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {[
              { label: 'মোট সক্রিয় সদস্য', value: '১২,৪৫০+ জন', icon: Users, color: 'text-emerald-700', bg: 'bg-emerald-100/70' },
              { label: 'সঞ্চিত আমানত তহবিল', value: '৳৮.৫+ কোটি', icon: PiggyBank, color: 'text-teal-700', bg: 'bg-teal-100/70' },
              { label: 'বিতরণকৃত ক্ষুদ্রঋণ', value: '৳১২.২+ কোটি', icon: TrendingUp, color: 'text-sky-700', bg: 'bg-sky-100/70' },
              { label: 'পরিচালিত শাখা অফিস', value: '৪ টি শাখা', icon: Building2, color: 'text-indigo-700', bg: 'bg-indigo-100/70' },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-card hover:shadow-elevated transition-all flex items-center gap-4"
                >
                  <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono tracking-tight">{stat.value}</div>
                    <div className="text-xs text-slate-500 font-semibold mt-0.5">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Core Financial Schemes */}
      <section id="schemes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <Badge variant="success" className="mb-1 font-bold">আমানত ও বিনিয়োগ স্কিম</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            সমবায় সমিতির মূল আর্থিক সেবাসমূহ
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            স্থানীয় ক্ষুদ্র ব্যবসায়ী, কৃষক ও পেশাজীবীদের আর্থ-সামাজিক উন্নয়নে প্রণীত সুদমুক্ত ও সহনশীল সমবায় সঞ্চয় প্রকল্প।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Scheme 1 */}
          <Card className="hover:shadow-elevated transition-all duration-200 border-slate-200">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                <PiggyBank className="w-6 h-6" />
              </div>
              <CardTitle className="text-lg">সাধারণ দৈনিক ও সাপ্তাহিক সঞ্চয়</CardTitle>
              <CardDescription className="text-xs">General Daily & Weekly Savings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs sm:text-sm text-slate-600">
              <p className="leading-relaxed">
                প্রতিদিন বা প্রতি সপ্তাহে ক্ষুদ্র সঞ্চয় জমা করার নির্ভরযোগ্য সুযোগ। মাঠ কর্মকর্তার মাধ্যমে রিসিট ও সরাসরি এসএমএস নিশ্চিতকরণ।
              </p>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>দৈনিক ২০ টাকা হতে যেকোন পরিমাণ সঞ্চয়</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>জরুরী প্রয়োজনে তাৎক্ষণিক উত্তোলন সুবিধা</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>বাৎসরিক লাভ/মুনাফা বণ্টন সুবিধা</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Scheme 2 */}
          <Card className="hover:shadow-elevated transition-all duration-200 border-emerald-400/80 shadow-md relative">
            <div className="absolute top-4 right-4">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                জনপ্রিয় স্কিম
              </span>
            </div>
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center mb-3 shadow-md">
                <BadgePercent className="w-6 h-6" />
              </div>
              <CardTitle className="text-lg">ডিপিএস মেয়াদী আমানত (DPS)</CardTitle>
              <CardDescription className="text-xs">Deposit Pension Scheme (১ হতে ১০ বছর)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs sm:text-sm text-slate-600">
              <p className="leading-relaxed">
                মাসিক ৫০০ টাকা হতে ৫,০০০ টাকা কিস্তিতে ১ থেকে ১০ বছর মেয়াদে নিশ্চিত অধিক মুনাফাসহ এককালীন তহবিল গঠন।
              </p>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>১২, ২৪, ৩৬, ৬০ বা ১২০ মাসের কিস্তি মেয়াদ</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>মেয়াদান্তে আকর্ষণীয় চক্রবৃদ্ধি মুনাফা</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>ডিপিএস আমানতের বিপরীতে ৮০% ঋণ গ্রহণের সুযোগ</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Scheme 3 */}
          <Card className="hover:shadow-elevated transition-all duration-200 border-slate-200">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center mb-3">
                <TrendingUp className="w-6 h-6" />
              </div>
              <CardTitle className="text-lg">সহজ শর্তে ক্ষুদ্রঋণ ও বিনিয়োগ</CardTitle>
              <CardDescription className="text-xs">Micro-credit & SME Business Loans</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs sm:text-sm text-slate-600">
              <p className="leading-relaxed">
                দোকানদার, কুটির শিল্প, কৃষি ও ক্ষুদ্র উদ্যোক্তাদের ব্যবসায়িক মূলধন বৃদ্ধিতে সহজ ও স্বচ্ছ কিস্তির ঋণ সহায়তা।
              </p>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>দৈনিক, সাপ্তাহিক বা মাসিক কিস্তিতে পরিশোধের সুযোগ</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>আসল ও মুনাফার আনুপাতিক বিভাজন স্বচ্ছতা</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>সময়মত পরিশোধে রিবেট/মওকুফ বোনাস সুবিধা</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 3. Live Interactive Financial Calculator */}
      <section id="calculator" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-elevated p-6 sm:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider">
                <Calculator className="w-4 h-4" />
                <span>সরাসরি হিসাব ক্যালকুলেটর</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                ঋণ ও ডিপিএস মুনাফা পরিমাপক (Live Calculator)
              </h3>
            </div>

            {/* Toggle Calculator Tab */}
            <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200 shrink-0">
              <button
                type="button"
                onClick={() => setCalcTab('loan')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                  calcTab === 'loan' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ঋণ কিস্তি হিসাব
              </button>
              <button
                type="button"
                onClick={() => setCalcTab('dps')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                  calcTab === 'dps' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ডিপিএস মুনাফা হিসাব
              </button>
            </div>
          </div>

          {calcTab === 'loan' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1.5">
                    <span>আসল ঋণের পরিমাণ (Principal)</span>
                    <span className="font-mono font-bold text-emerald-700 text-sm">৳ {loanPrincipal.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="300000"
                    step="5000"
                    value={loanPrincipal}
                    onChange={(e) => setLoanPrincipal(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                    <span>৳১০,০০০</span>
                    <span>৳৩,০০,০০০</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">মোট কিস্তি সংখ্যা (সাপ্তাহিক)</label>
                    <select
                      value={loanTenureWeeks}
                      onChange={(e) => setLoanTenureWeeks(Number(e.target.value))}
                      className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-mono font-bold"
                    >
                      <option value={24}>২৪ সপ্তাহ (৬ মাস)</option>
                      <option value={46}>৪৬ সপ্তাহ (নিয়মিত ১ বছর)</option>
                      <option value={52}>৫২ সপ্তাহ (পূর্ণ ১ বছর)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">লাভের হার শতকরা (Profit %)</label>
                    <input
                      type="number"
                      value={loanRatePct}
                      onChange={(e) => setLoanRatePct(Number(e.target.value))}
                      className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-mono font-bold text-amber-700"
                      min="5"
                      max="25"
                      step="0.5"
                    />
                  </div>
                </div>
              </div>

              {/* Loan Result Box */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-6 space-y-4 shadow-elevated border border-slate-800">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide block">
                  ঋণ পরিশোধ বিবরণী ফলাফল
                </span>

                <div className="space-y-2 border-b border-slate-800 pb-3 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>আসল ঋণ (P):</span>
                    <span className="font-mono font-bold text-white">৳ {loanPrincipal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>মোট মুনাফা ({loanRatePct}%):</span>
                    <span className="font-mono font-bold text-amber-400">৳ {totalLoanProfit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>সর্বমোট পরিশোধযোগ্য (P+I):</span>
                    <span className="font-mono font-extrabold text-emerald-400 text-sm">৳ {totalLoanRepayable.toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-emerald-950/80 rounded-xl p-3.5 border border-emerald-500/40 text-center">
                  <span className="text-[11px] text-emerald-200 block font-medium">প্রতি কিস্তির পরিমাণ ({loanTenureWeeks} টি)</span>
                  <span className="text-2xl font-black text-white font-mono mt-0.5 block">
                    ৳ {perInstallmentLoan.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1.5">
                    <span>মাসিক কিস্তি জমার পরিমাণ</span>
                    <span className="font-mono font-bold text-emerald-700 text-sm">৳ {dpsMonthly.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="10000"
                    step="500"
                    value={dpsMonthly}
                    onChange={(e) => setDpsMonthly(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                    <span>৳৫০০</span>
                    <span>৳১০,০০০</span>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">ডিপিএস মেয়াদ (বছর)</label>
                  <select
                    value={dpsYears}
                    onChange={(e) => setDpsYears(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-mono font-bold"
                  >
                    <option value={1}>১ বছর (১২ মাস)</option>
                    <option value={2}>২ বছর (২৪ মাস)</option>
                    <option value={3}>৩ বছর (৩৬ মাস)</option>
                    <option value={5}>৫ বছর (৬০ মাস)</option>
                    <option value={10}>১০ বছর (১২০ মাস)</option>
                  </select>
                </div>
              </div>

              {/* DPS Result Box */}
              <div className="bg-gradient-to-br from-emerald-950 to-teal-950 text-white rounded-2xl p-6 space-y-4 shadow-elevated border border-emerald-800/80">
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wide block">
                  ডিপিএস মেয়াদপূর্তি বিবরণী
                </span>

                <div className="space-y-2 border-b border-emerald-800/80 pb-3 text-xs">
                  <div className="flex justify-between text-slate-200">
                    <span>মোট জমাকৃত টাকা:</span>
                    <span className="font-mono font-bold text-white">৳ {totalDpsDeposit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-200">
                    <span>আনুমানিক অর্জিত মুনাফা:</span>
                    <span className="font-mono font-bold text-amber-300">৳ {dpsProfit.toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-emerald-900/90 rounded-xl p-3.5 border border-emerald-400/40 text-center">
                  <span className="text-[11px] text-emerald-200 block font-medium">মেয়াদপূর্তিতে সর্বমোট প্রাপ্য (Maturity Amount)</span>
                  <span className="text-2xl font-black text-white font-mono mt-0.5 block">
                    ৳ {totalDpsMaturity.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. Branch Network & Offices */}
      <section id="branches" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <Badge variant="info">শাখা নেটওয়ার্ক</Badge>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            আমাদের সেবাকেন্দ্র ও শাখাসমূহ
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            কালিহাতী ও টাঙ্গাইলের প্রত্যন্ত অঞ্চলে অবস্থিত আমাদের অনুমোদিত সেবাকেন্দ্র হতে সরাসরি সেবা নিন।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-xs">
          {[
            {
              name: 'এলেঙ্গা প্রধান কার্যালয় (Main Branch)',
              code: 'MB-01',
              location: 'এলেঙ্গা বাসস্ট্যান্ড সংলগ্ন, কালিহাতী, টাঙ্গাইল',
              phone: '০১৭১১-০০০০০০',
              time: 'সকাল ৯:০০ - বিকাল ৫:০০ (শনিবার-বৃহস্পতিবার)',
            },
            {
              name: 'কালিহাতী বাজার শাখা',
              code: 'KB-02',
              location: 'কালিহাতী পৌর সুপার মার্কেট, ২য় তলা',
              phone: '০১৭২২-০০০০০০',
              time: 'সকাল ৯:০০ - বিকাল ৫:০০ (শনিবার-বৃহস্পতিবার)',
            },
            {
              name: 'ঘাটাইল উপজেলা শাখা',
              code: 'GB-03',
              location: 'ঘাটাইল কলেজ রোড, কলেজ মোড়',
              phone: '০১৭৩৩-০০০০০০',
              time: 'সকাল ৯:০০ - বিকাল ৫:০০ (শনিবার-বৃহস্পতিবার)',
            },
            {
              name: 'টাঙ্গাইল সদর শাখা',
              code: 'TS-04',
              location: 'ভিক্টোরিয়া রোড, টাঙ্গাইল সদর',
              phone: '০১৭৪৪-০০০০০০',
              time: 'সকাল ৯:০০ - বিকাল ৫:০০ (শনিবার-বৃহস্পতিবার)',
            },
          ].map((br, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-card hover:shadow-elevated transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs">
                  {br.code}
                </span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                  সক্রিয় শাখা
                </span>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm">{br.name}</h4>
                <p className="text-slate-500 text-[11px] mt-1 flex items-start gap-1.5 leading-relaxed">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span>{br.location}</span>
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600 space-y-1">
                <div className="flex items-center gap-1.5 font-mono">
                  <Phone className="w-3 h-3 text-slate-400" />
                  <span>{br.phone}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-[10px]">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{br.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Notice Board Bulletin */}
      <section id="notices" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">জরুরী বিজ্ঞপ্তি</span>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">সমিতি অফিশিয়াল নোটিশ বোর্ড</h3>
            </div>
            <span className="text-xs text-slate-400 font-medium">সর্বশেষ হালনাগাদ: অক্টোবর ২০২৬</span>
          </div>

          <div className="space-y-3 text-xs">
            {[
              {
                title: 'বার্ষিক সাধারণ সভা (AGM ২০২৬) সংক্রান্ত জরুরি বিজ্ঞপ্তি',
                date: '২৮ অক্টোবর, ২০২৬',
                badge: 'সাধারণ সভা',
                desc: 'সকল সম্মানিত সাধারণ ও বিশেষ সঞ্চয়ী সদস্যগণকে অবহিত করা যাইতেছে যে, আগামী ১৫ই নভেম্বর ২০২৬ সমিতির বার্ষিক সাধারণ সভা প্রধান কার্যালয়ে অনুষ্ঠিত হইবে।',
              },
              {
                title: 'চলতি অর্থ-বছরের সঞ্চয় ও ডিপিএস মুনাফা প্রদান কার্যক্রম',
                date: '২৫ অক্টোবর, ২০২৬',
                badge: 'মুনাফা বণ্টন',
                desc: 'সমিতির বার্ষিক হিসাব নিরীক্ষা সম্পন্ন সাপেক্ষে সকল সঞ্চয়ী হিসাবের অর্জিত বার্ষিক মুনাফা সদস্যগণের হিসাবে ক্রেডিট সম্পন্ন হইয়াছে।',
              },
              {
                title: 'ডিজিটাল পাসবই সেবা গ্রহণ সংক্রান্ত নির্দেশনা',
                date: '২০ অক্টোবর, ২০২৬',
                badge: 'সেবা আপডেট',
                desc: 'সম্মানিত সদস্যগণ এখন হইতে ঘরে বসিয়া অনলাইনে তাহাদের সঞ্চয় ও ঋণের ডিজিটাল পাসবই স্টেটমেন্ট অবলোকন করিতে পারিবেন।',
              },
            ].map((n, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5 hover:bg-emerald-50/40 transition">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>{n.title}</span>
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      {n.badge}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{n.date}</span>
                  </div>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed pl-6">{n.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Member Portal Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-elevated flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden border border-emerald-800">
          <div className="space-y-3 max-w-xl relative z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
              সদস্য সেলফ সার্ভিস পোর্টাল
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
              আপনার সঞ্চয় ও ঋণের ডিজিটাল পাশ বই ঘরে বসেই দেখুন
            </h3>
            <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
              আপনার সদস্য হিসাব নম্বর দিয়ে তাৎক্ষণিক সাধারণ সঞ্চয় স্থিতি, ডিপিএস জমা ও ঋণ কিস্তির বিবরণী যেকোনো সময় যাচাই করুন।
            </p>
          </div>

          <div className="shrink-0 relative z-10">
            <Link href="/member">
              <Button size="lg" className="bg-white text-emerald-950 hover:bg-emerald-50 font-black px-8 py-3.5 rounded-xl shadow-lg text-sm sm:text-base cursor-pointer">
                ডিজিটাল পাশ বই খুলুন
                <ArrowRight className="w-4 h-4 text-emerald-800 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
