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
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/LanguageContext';

export default function HomePage() {
  const { language, formatMoney, formatNum } = useLanguage();

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
              <span>
                {language === 'bn'
                  ? 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত • রেজিঃ ট-ক ২৮৪০/২১'
                  : 'Approved by Govt. of Bangladesh • Reg: T-K 2840/21'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              {language === 'bn' ? (
                <>
                  এস, এম ক্ষুদ্র সঞ্চয় ও ঋণদান <br className="hidden sm:inline" />
                  <span className="text-emerald-700 bg-gradient-to-r from-emerald-700 to-teal-800 bg-clip-text text-transparent">
                    সমবায় সমিতি লিঃ
                  </span>
                </>
              ) : (
                <>
                  S.M. Khudra Sanchay O Rindan <br className="hidden sm:inline" />
                  <span className="text-emerald-700 bg-gradient-to-r from-emerald-700 to-teal-800 bg-clip-text text-transparent">
                    Samabay Samity Limited
                  </span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
              {language === 'bn' ? (
                <>
                  প্রধান কার্যালয়: <strong>এলেঙ্গা, কালিহাতী, টাঙ্গাইল</strong>। সদস্যদের আর্থিক স্বাবলম্বিতা, ১০০% ডিজিটাল সঞ্চয় ও ঋণের পাশ বই এবং স্বচ্ছ ব্যাংকিং ব্যবস্থাপনায় অঙ্গীকারাবদ্ধ।
                </>
              ) : (
                <>
                  Head Office: <strong>Elenga, Kalihati, Tangail</strong>. Empowering cooperative members through digital passbooks, ethical micro-savings, transparent loans, and accountable financial governance.
                </>
              )}
            </p>

            <div className="flex flex-wrap justify-center items-center gap-3.5 pt-3">
              <Link href="/member">
                <Button size="lg" className="gap-2 text-sm sm:text-base px-7 py-3 rounded-xl shadow-md shadow-emerald-700/20 font-bold bg-emerald-700 hover:bg-emerald-800 text-white cursor-pointer">
                  <ReceiptText className="w-5 h-5" />
                  <span>{language === 'bn' ? 'সদস্য ডিজিটাল পাসবই লগইন' : 'Member Digital Passbook'}</span>
                </Button>
              </Link>

              <a href="http://localhost:3001" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="gap-2 text-sm sm:text-base px-7 py-3 rounded-xl border-slate-300 font-bold text-slate-800 hover:bg-slate-100 cursor-pointer">
                  <span>{language === 'bn' ? 'কর্মকর্তা ERP পোর্টাল' : 'Staff ERP Portal'}</span>
                  <ArrowRight className="w-4 h-4 text-emerald-600" />
                </Button>
              </a>
            </div>
          </div>

          {/* 4 Quick Microfinance Metrics */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {[
              {
                label: language === 'bn' ? 'মোট সক্রিয় সদস্য' : 'Active Members',
                value: language === 'bn' ? '১২,৪৫০+ জন' : '12,450+ Members',
                icon: Users,
                color: 'text-emerald-700',
                bg: 'bg-emerald-100/70',
              },
              {
                label: language === 'bn' ? 'সঞ্চিত আমানত তহবিল' : 'Total Savings Fund',
                value: language === 'bn' ? '৳ ৮.৫+ কোটি' : '৳ 8.5+ Crore',
                icon: PiggyBank,
                color: 'text-teal-700',
                bg: 'bg-teal-100/70',
              },
              {
                label: language === 'bn' ? 'বিতরণকৃত ক্ষুদ্রঋণ' : 'Loans Disbursed',
                value: language === 'bn' ? '৳ ১২.২+ কোটি' : '৳ 12.2+ Crore',
                icon: TrendingUp,
                color: 'text-sky-700',
                bg: 'bg-sky-100/70',
              },
              {
                label: language === 'bn' ? 'পরিচালিত শাখা অফিস' : 'Branch Offices',
                value: language === 'bn' ? '৪ টি শাখা' : '4 Branches',
                icon: Building2,
                color: 'text-indigo-700',
                bg: 'bg-indigo-100/70',
              },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-card hover:shadow-elevated transition-all flex items-center gap-4.5"
                >
                  <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-slate-900 font-financial tabular-nums tracking-tight">{stat.value}</div>
                    <div className="text-xs sm:text-[13px] text-slate-500 font-bold mt-1">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Core Financial Schemes */}
      <section id="schemes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2.5">
          <Badge variant="success" className="mb-1 font-bold text-xs px-3 py-1">
            {language === 'bn' ? 'আমানত ও বিনিয়োগ স্কিম' : 'Deposit & Investment Schemes'}
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            {language === 'bn' ? 'সমবায় সমিতির মূল আর্থিক সেবাসমূহ' : 'Core Financial Products & Services'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {language === 'bn'
              ? 'স্থানীয় ক্ষুদ্র ব্যবসায়ী, কৃষক ও পেশাজীবীদের আর্থ-সামাজিক উন্নয়নে প্রণীত সুদমুক্ত ও সহনশীল সমবায় সঞ্চয় প্রকল্প।'
              : 'Designed for small business owners, farmers, and self-employed professionals to build wealth and access transparent credit.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Scheme 1 */}
          <Card className="hover:shadow-elevated transition-all duration-200 border-slate-200 p-6 sm:p-7 rounded-2xl">
            <CardHeader>
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3.5 shadow-2xs">
                <PiggyBank className="w-7 h-7" />
              </div>
              <CardTitle className="text-xl font-bold">
                {language === 'bn' ? 'সাধারণ দৈনিক ও সাপ্তাহিক সঞ্চয়' : 'Daily & Weekly General Savings'}
              </CardTitle>
              <CardDescription className="text-xs sm:text-[13px]">
                {language === 'bn' ? 'সহজ সঞ্চয় আমানত ও মুনাফা' : 'Flexible Micro-Deposits with Annual Dividend'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <p>
                {language === 'bn'
                  ? 'প্রতিদিন বা প্রতি সপ্তাহে ক্ষুদ্র সঞ্চয় জমা করার নির্ভরযোগ্য সুযোগ। মাঠ কর্মকর্তার মাধ্যমে রিসিট ও সরাসরি এসএমএস নিশ্চিতকরণ।'
                  : 'Reliable doorstep savings collection with printed receipts and real-time SMS alerts after each field deposit.'}
              </p>
              <ul className="space-y-2.5 text-xs sm:text-[13px] text-slate-600 pt-1">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                  <span>
                    {language === 'bn' ? 'দৈনিক ২০ টাকা হতে যেকোন পরিমাণ সঞ্চয়' : 'Flexible deposits starting from ৳ 20 daily'}
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                  <span>
                    {language === 'bn' ? 'জরুরী প্রয়োজনে তাৎক্ষণিক উত্তোলন সুবিধা' : 'Instant on-demand withdrawals in emergencies'}
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                  <span>
                    {language === 'bn' ? 'বাৎসরিক লাভ/মুনাফা বণ্টন সুবিধা' : 'Competitive annual profit sharing & dividends'}
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Scheme 2 */}
          <Card className="hover:shadow-elevated transition-all duration-200 border-emerald-400/80 shadow-md relative">
            <div className="absolute top-4 right-4">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                {language === 'bn' ? 'জনপ্রিয় স্কিম' : 'Most Popular'}
              </span>
            </div>
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center mb-3 shadow-md">
                <BadgePercent className="w-6 h-6" />
              </div>
              <CardTitle className="text-lg">
                {language === 'bn' ? 'ডিপিএস মেয়াদী আমানত (DPS)' : 'Deposit Pension Scheme (DPS)'}
              </CardTitle>
              <CardDescription className="text-xs">
                {language === 'bn' ? '১ হতে ১০ বছর মেয়াদী সঞ্চয় স্কিম' : 'Fixed Monthly Savings (1 to 10 Years)'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs sm:text-sm text-slate-600">
              <p className="leading-relaxed">
                {language === 'bn'
                  ? 'মাসিক ৫০০ টাকা হতে ৫,০০০ টাকা কিস্তিতে ১ থেকে ১০ বছর মেয়াদে নিশ্চিত অধিক মুনাফাসহ এককালীন তহবিল গঠন।'
                  : 'Disciplined monthly installment plans from ৳ 500 to ৳ 5,000 for guaranteed compound maturity returns.'}
              </p>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    {language === 'bn' ? '১২, ২৪, ৩৬, ৬০ বা ১২০ মাসের কিস্তি মেয়াদ' : 'Tenure choices: 12, 24, 36, 60 or 120 months'}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    {language === 'bn' ? 'মেয়াদান্তে আকর্ষণীয় চক্রবৃদ্ধি মুনাফা' : 'High maturity yield with guaranteed dividends'}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    {language === 'bn' ? 'ডিপিএস আমানতের বিপরীতে ৮০% ঋণ সুবিধা' : 'Up to 80% loan entitlement against accumulated balance'}
                  </span>
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
              <CardTitle className="text-lg">
                {language === 'bn' ? 'সহজ শর্তে ক্ষুদ্রঋণ ও বিনিয়োগ' : 'Micro-Credit & Business Loans'}
              </CardTitle>
              <CardDescription className="text-xs">
                {language === 'bn' ? 'ব্যবসা ও কর্মসংস্থান বিনিয়োগ' : 'SME & Agricultural Working Capital'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs sm:text-sm text-slate-600">
              <p className="leading-relaxed">
                {language === 'bn'
                  ? 'দোকানদার, কুটির শিল্প, কৃষি ও ক্ষুদ্র উদ্যোক্তাদের ব্যবসায়িক মূলধন বৃদ্ধিতে সহজ ও স্বচ্ছ কিস্তির ঋণ সহায়তা।'
                  : 'Fast loan disbursement for merchants, farmers, and craftsmen with transparent repayment schedules.'}
              </p>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    {language === 'bn' ? 'দৈনিক, সাপ্তাহিক বা মাসিক কিস্তিতে পরিশোধ' : 'Flexible daily, weekly, or monthly installments'}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    {language === 'bn' ? 'আসল ও মুনাফার আনুপাতিক বিভাজন স্বচ্ছতা' : 'Transparent principal and profit amortization split'}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    {language === 'bn' ? 'সময়মত পরিশোধে রিবেট/মওকুফ বোনাস সুবিধা' : 'Early repayment rebates and interest discounts'}
                  </span>
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
                <span>{language === 'bn' ? 'সরাসরি হিসাব পরিমাপক' : 'Interactive Financial Simulator'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                {language === 'bn'
                  ? 'ঋণ ও ডিপিএস মুনাফা ক্যালকুলেটর'
                  : 'Loan Amortization & DPS Return Calculator'}
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
                {language === 'bn' ? 'ঋণ কিস্তি হিসাব' : 'Loan Calculator'}
              </button>
              <button
                type="button"
                onClick={() => setCalcTab('dps')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                  calcTab === 'dps' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {language === 'bn' ? 'ডিপিএস মুনাফা হিসাব' : 'DPS Calculator'}
              </button>
            </div>
          </div>

          {calcTab === 'loan' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1.5">
                    <span>{language === 'bn' ? 'আসল ঋণের পরিমাণ (Principal)' : 'Loan Principal Amount'}</span>
                    <span className="font-financial tabular-nums font-bold text-emerald-700 text-sm">{formatMoney(loanPrincipal)}</span>
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
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-financial tabular-nums">
                    <span>{formatMoney(10000)}</span>
                    <span>{formatMoney(300000)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      {language === 'bn' ? 'মোট কিস্তি সংখ্যা (সাপ্তাহিক)' : 'Tenure (Weeks)'}
                    </label>
                    <select
                      value={loanTenureWeeks}
                      onChange={(e) => setLoanTenureWeeks(Number(e.target.value))}
                      className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-mono font-bold"
                    >
                      <option value={24}>
                        {language === 'bn' ? '২৪ সপ্তাহ (৬ মাস)' : '24 Weeks (6 Months)'}
                      </option>
                      <option value={46}>
                        {language === 'bn' ? '৪৬ সপ্তাহ (নিয়মিত ১ বছর)' : '46 Weeks (Standard 1 Year)'}
                      </option>
                      <option value={52}>
                        {language === 'bn' ? '৫২ সপ্তাহ (পূর্ণ ১ বছর)' : '52 Weeks (Full 1 Year)'}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      {language === 'bn' ? 'মুনাফার হার % (Profit %)' : 'Annual Profit Rate (%)'}
                    </label>
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
                  {language === 'bn' ? 'ঋণ পরিশোধ বিবরণী ফলাফল' : 'Repayment Projection Summary'}
                </span>

                <div className="space-y-2 border-b border-slate-800 pb-3 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>{language === 'bn' ? 'আসল ঋণ (P):' : 'Principal (P):'}</span>
                    <span className="font-financial tabular-nums font-bold text-white">{formatMoney(loanPrincipal)}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>
                      {language === 'bn'
                        ? `মোট মুনাফা (${formatNum(loanRatePct)}%):`
                        : `Total Profit (${formatNum(loanRatePct)}%):`}
                    </span>
                    <span className="font-financial tabular-nums font-bold text-amber-400">{formatMoney(totalLoanProfit)}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>{language === 'bn' ? 'সর্বমোট পরিশোধযোগ্য (P+I):' : 'Total Repayable (P+I):'}</span>
                    <span className="font-financial tabular-nums font-extrabold text-emerald-400 text-sm">
                      {formatMoney(totalLoanRepayable)}
                    </span>
                  </div>
                </div>

                <div className="bg-emerald-950/80 rounded-xl p-3.5 border border-emerald-500/40 text-center">
                  <span className="text-[11px] text-emerald-200 block font-medium">
                    {language === 'bn'
                      ? `প্রতি কিস্তির পরিমাণ (${formatNum(loanTenureWeeks)} টি কিস্তি)`
                      : `Installment Amount (${formatNum(loanTenureWeeks)} installments)`}
                  </span>
                  <span className="text-2xl font-black text-white font-financial tabular-nums mt-0.5 block">
                    {formatMoney(perInstallmentLoan)}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1.5">
                    <span>{language === 'bn' ? 'মাসিক কিস্তি জমার পরিমাণ' : 'Monthly Deposit Amount'}</span>
                    <span className="font-financial tabular-nums font-bold text-emerald-700 text-sm">{formatMoney(dpsMonthly)}</span>
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
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-financial tabular-nums">
                    <span>{formatMoney(500)}</span>
                    <span>{formatMoney(10000)}</span>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {language === 'bn' ? 'ডিপিএস মেয়াদ (বছর)' : 'DPS Tenure (Years)'}
                  </label>
                  <select
                    value={dpsYears}
                    onChange={(e) => setDpsYears(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-mono font-bold"
                  >
                    <option value={1}>
                      {language === 'bn' ? '১ বছর (১২ মাস)' : '1 Year (12 Months)'}
                    </option>
                    <option value={2}>
                      {language === 'bn' ? '২ বছর (২৪ মাস)' : '2 Years (24 Months)'}
                    </option>
                    <option value={3}>
                      {language === 'bn' ? '৩ বছর (৩৬ মাস)' : '3 Years (36 Months)'}
                    </option>
                    <option value={5}>
                      {language === 'bn' ? '৫ বছর (৬০ মাস)' : '5 Years (60 Months)'}
                    </option>
                    <option value={10}>
                      {language === 'bn' ? '১০ বছর (১২০ মাস)' : '10 Years (120 Months)'}
                    </option>
                  </select>
                </div>
              </div>

              {/* DPS Result Box */}
              <div className="bg-gradient-to-br from-emerald-950 to-teal-950 text-white rounded-2xl p-6 space-y-4 shadow-elevated border border-emerald-800/80">
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wide block">
                  {language === 'bn' ? 'ডিপিএস মেয়াদপূর্তি বিবরণী' : 'DPS Maturity Projection'}
                </span>

                <div className="space-y-2 border-b border-emerald-800/80 pb-3 text-xs">
                  <div className="flex justify-between text-slate-200">
                    <span>{language === 'bn' ? 'মোট জমাকৃত টাকা:' : 'Total Principal Deposited:'}</span>
                    <span className="font-financial tabular-nums font-bold text-white">{formatMoney(totalDpsDeposit)}</span>
                  </div>
                  <div className="flex justify-between text-slate-200">
                    <span>{language === 'bn' ? 'আনুমানিক অর্জিত মুনাফা:' : 'Estimated Compound Profit:'}</span>
                    <span className="font-financial tabular-nums font-bold text-amber-300">{formatMoney(dpsProfit)}</span>
                  </div>
                </div>

                <div className="bg-emerald-900/90 rounded-xl p-3.5 border border-emerald-400/40 text-center">
                  <span className="text-[11px] text-emerald-200 block font-medium">
                    {language === 'bn' ? 'মেয়াদপূর্তিতে সর্বমোট প্রাপ্য' : 'Estimated Maturity Payable'}
                  </span>
                  <span className="text-2xl font-black text-white font-financial tabular-nums mt-0.5 block">
                    {formatMoney(totalDpsMaturity)}
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
          <Badge variant="info">
            {language === 'bn' ? 'শাখা নেটওয়ার্ক' : 'Branch Network'}
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {language === 'bn' ? 'আমাদের সেবাকেন্দ্র ও শাখাসমূহ' : 'Our Branches & Service Centers'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {language === 'bn'
              ? 'কালিহাতী ও টাঙ্গাইলের প্রত্যন্ত অঞ্চলে অবস্থিত আমাদের অনুমোদিত সেবাকেন্দ্র হতে সরাসরি সেবা নিন।'
              : 'Visit our branch offices and service centers across Kalihati and Tangail districts.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-xs">
          {[
            {
              name: language === 'bn' ? 'এলেঙ্গা প্রধান কার্যালয়' : 'Elenga Head Office',
              code: 'MB-01',
              location:
                language === 'bn'
                  ? 'এলেঙ্গা বাসস্ট্যান্ড সংলগ্ন, কালিহাতী, টাঙ্গাইল'
                  : 'Elenga Bus Stand, Kalihati, Tangail',
              phone: language === 'bn' ? '০১৭১১-০০০০০০' : '01711-000000',
              time:
                language === 'bn'
                  ? 'সকাল ৯:০০ - বিকাল ৫:০০ (শনি-বৃহস্পতি)'
                  : '9:00 AM - 5:00 PM (Sat - Thu)',
            },
            {
              name: language === 'bn' ? 'কালিহাতী বাজার শাখা' : 'Kalihati Bazar Branch',
              code: 'KB-02',
              location:
                language === 'bn'
                  ? 'কালিহাতী পৌর সুপার মার্কেট, ২য় তলা'
                  : 'Kalihati Super Market, 2nd Floor',
              phone: language === 'bn' ? '০১৭২২-০০০০০০' : '01722-000000',
              time:
                language === 'bn'
                  ? 'সকাল ৯:০০ - বিকাল ৫:০০ (শনি-বৃহস্পতি)'
                  : '9:00 AM - 5:00 PM (Sat - Thu)',
            },
            {
              name: language === 'bn' ? 'ঘাটাইল উপজেলা শাখা' : 'Ghatail Upazila Branch',
              code: 'GB-03',
              location:
                language === 'bn'
                  ? 'ঘাটাইল কলেজ রোড, কলেজ মোড়'
                  : 'Ghatail College Road, College Mor',
              phone: language === 'bn' ? '০১৭৩৩-০০০০০০' : '01733-000000',
              time:
                language === 'bn'
                  ? 'সকাল ৯:০০ - বিকাল ৫:০০ (শনি-বৃহস্পতি)'
                  : '9:00 AM - 5:00 PM (Sat - Thu)',
            },
            {
              name: language === 'bn' ? 'টাঙ্গাইল সদর শাখা' : 'Tangail Sadar Branch',
              code: 'TS-04',
              location:
                language === 'bn'
                  ? 'ভিক্টোরিয়া রোড, টাঙ্গাইল সদর'
                  : 'Victoria Road, Tangail Sadar',
              phone: language === 'bn' ? '০১৭৪৪-০০০০০০' : '01744-000000',
              time:
                language === 'bn'
                  ? 'সকাল ৯:০০ - বিকাল ৫:০০ (শনি-বৃহস্পতি)'
                  : '9:00 AM - 5:00 PM (Sat - Thu)',
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
                  {language === 'bn' ? 'সক্রিয় শাখা' : 'Active Branch'}
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
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                {language === 'bn' ? 'জরুরী বিজ্ঞপ্তি' : 'Official Notices'}
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                {language === 'bn' ? 'সমিতি নোটিশ ও বুলেটিন বোর্ড' : 'Somity Notice & Circular Bulletin'}
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              {language === 'bn' ? 'সর্বশেষ হালনাগাদ: অক্টোবর ২০২৬' : 'Last Updated: October 2026'}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {[
              {
                title:
                  language === 'bn'
                    ? 'বার্ষিক সাধারণ সভা (AGM ২০২৬) সংক্রান্ত জরুরি বিজ্ঞপ্তি'
                    : 'Notice of Annual General Meeting (AGM 2026)',
                date: language === 'bn' ? '২৮ অক্টোবর, ২০২৬' : '28 October, 2026',
                badge: language === 'bn' ? 'সাধারণ সভা' : 'AGM Circular',
                desc:
                  language === 'bn'
                    ? 'সকল সম্মানিত সাধারণ ও বিশেষ সঞ্চয়ী সদস্যগণকে অবহিত করা যাইতেছে যে, আগামী ১৫ই নভেম্বর ২০২৬ সমিতির বার্ষিক সাধারণ সভা প্রধান কার্যালয়ে অনুষ্ঠিত হইবে।'
                    : 'All valued members are hereby notified that the Annual General Meeting (AGM) will convene at our Elenga Head Office on 15 November 2026.',
              },
              {
                title:
                  language === 'bn'
                    ? 'চলতি অর্থ-বছরের সঞ্চয় ও ডিপিএস মুনাফা প্রদান কার্যক্রম'
                    : 'Annual Dividend & DPS Profit Distribution Completion',
                date: language === 'bn' ? '২৫ অক্টোবর, ২০২৬' : '25 October, 2026',
                badge: language === 'bn' ? 'মুনাফা বণ্টন' : 'Dividend',
                desc:
                  language === 'bn'
                    ? 'সমিতির বার্ষিক হিসাব নিরীক্ষা সম্পন্ন সাপেক্ষে সকল সঞ্চয়ী হিসাবের অর্জিত বার্ষিক মুনাফা সদস্যগণের হিসাবে ক্রেডিট সম্পন্ন হইয়াছে।'
                    : 'Following annual auditing, calculated dividends and interest earnings have been credited to all active general and DPS savings accounts.',
              },
              {
                title:
                  language === 'bn'
                    ? 'ডিজিটাল পাশবই সেবা গ্রহণ সংক্রান্ত নির্দেশনা'
                    : 'Guidelines for Digital Passbook Portal Access',
                date: language === 'bn' ? '২০ অক্টোবর, ২০২৬' : '20 October, 2026',
                badge: language === 'bn' ? 'সেবা আপডেট' : 'E-Services',
                desc:
                  language === 'bn'
                    ? 'সম্মানিত সদস্যগণ এখন হইতে ঘরে বসিয়া অনলাইনে তাহাদের সঞ্চয় ও ঋণের ডিজিটাল পাসবই স্টেটমেন্ট অবলোকন করিতে পারিবেন।'
                    : 'Members can now conveniently inspect, download, and verify real-time electronic passbook statements online with their account credentials.',
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
              {language === 'bn' ? 'সদস্য সেলফ সার্ভিস পোর্টাল' : 'Member Self-Service Portal'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
              {language === 'bn'
                ? 'আপনার সঞ্চয় ও ঋণের ডিজিটাল পাশ বই ঘরে বসেই দেখুন'
                : 'Access Your Complete Savings & Loan Passbook Online'}
            </h3>
            <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
              {language === 'bn'
                ? 'আপনার সদস্য হিসাব নম্বর দিয়ে তাৎক্ষণিক সাধারণ সঞ্চয় স্থিতি, ডিপিএস জমা ও ঋণ কিস্তির বিবরণী যেকোনো সময় যাচাই করুন।'
                : 'Enter your member account number to inspect live balances, deposit ledger entries, DPS maturity progress, and loan schedules 24/7.'}
            </p>
          </div>

          <div className="shrink-0 relative z-10">
            <Link href="/member">
              <Button size="lg" className="bg-white text-emerald-950 hover:bg-emerald-50 font-black px-8 py-3.5 rounded-xl shadow-lg text-sm sm:text-base cursor-pointer">
                <span>{language === 'bn' ? 'ডিজিটাল পাশ বই খুলুন' : 'Open Digital Passbook'}</span>
                <ArrowRight className="w-4 h-4 text-emerald-800 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
