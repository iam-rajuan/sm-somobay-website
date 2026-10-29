'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  UserCheck,
  KeyRound,
  ShieldAlert,
  ShieldCheck,
  ArrowLeft,
  Search,
  Printer,
  CheckCircle2,
  Lock,
  Wallet,
  PiggyBank,
  TrendingUp,
  Receipt,
  Building,
  Calendar,
  LogOut,
  BadgePercent,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PassbookData {
  accountNo: string;
  name: string;
  fatherName: string;
  mobile: string;
  somity: string;
  type: string;
  joiningDate: string;
  generalTarget: number;
  generalDeposit: number;
  generalWithdraw: number;
  generalBalance: number;
  specialBalance: number;
  shareBalance: number;
  dpsScheme?: string;
  dpsBalance?: number;
  loanAccount?: {
    loanId: string;
    scheme: string;
    principal: number;
    profit: number;
    totalLoan: number;
    installmentAmount: number;
    totalPaid: number;
    due: number;
    nextDueDate: string;
    status: 'Active' | 'Paid';
  };
  transactions: {
    date: string;
    particulars: string;
    debit: number;
    credit: number;
    balance: number;
  }[];
}

const MOCK_PASSBOOKS: Record<string, PassbookData> = {
  'SM-2840-001': {
    accountNo: 'SM-2840-001',
    name: 'মোঃ আব্দুল করিম',
    fatherName: 'মরহুম মোঃ রহিম উদ্দিন',
    mobile: '01711-223344',
    somity: 'শনিবার ১ নং এলেঙ্গা সমিতি',
    type: 'Weekly (সাপ্তাহিক)',
    joiningDate: '২০২২-০১-১৫',
    generalTarget: 200,
    generalDeposit: 15400,
    generalWithdraw: 2000,
    generalBalance: 13400,
    specialBalance: 3500,
    shareBalance: 5000,
    dpsScheme: 'Progoti 5 Years DPS',
    dpsBalance: 12000,
    loanAccount: {
      loanId: 'LN-2026-089',
      scheme: 'সাপ্তাহিক ক্ষুদ্রঋণ (Weekly Micro-Loan)',
      principal: 50000,
      profit: 7500,
      totalLoan: 57500,
      installmentAmount: 575,
      totalPaid: 28750,
      due: 28750,
      nextDueDate: '২০২৬-১১-০৭',
      status: 'Active',
    },
    transactions: [
      { date: '২০২৬-১০-২৮', particulars: 'সাপ্তাহিক সাধারণ সঞ্চয় জমা', debit: 0, credit: 200, balance: 13400 },
      { date: '২০২৬-১০-২১', particulars: 'সাপ্তাহিক সাধারণ সঞ্চয় জমা', debit: 0, credit: 200, balance: 13200 },
      { date: '২০২৬-১০-১৪', particulars: 'সাধারণ সঞ্চয় হতে আংশিক উত্তোলন', debit: 1000, credit: 0, balance: 13000 },
      { date: '২০২৬-১০-০৭', particulars: 'সাপ্তাহিক সাধারণ সঞ্চয় জমা', debit: 0, credit: 200, balance: 14000 },
      { date: '২০২৬-০৯-৩০', particulars: 'বিশেষ সঞ্চয় জমা সমন্বয়', debit: 0, credit: 500, balance: 13800 },
    ],
  },
  'SM-2840-002': {
    accountNo: 'SM-2840-002',
    name: 'মোছাঃ রহিমা বেগম',
    fatherName: 'মোঃ আব্দুল হক',
    mobile: '01822-334455',
    somity: 'রবিবার ২ নং কালিহাতী কেন্দ্র',
    type: 'Weekly (সাপ্তাহিক)',
    joiningDate: '২০২১-০৩-১০',
    generalTarget: 200,
    generalDeposit: 22800,
    generalWithdraw: 4000,
    generalBalance: 18800,
    specialBalance: 5200,
    shareBalance: 7000,
    dpsScheme: 'Shanchita 3 Years DPS',
    dpsBalance: 18000,
    loanAccount: {
      loanId: 'LN-2026-042',
      scheme: 'ক্ষুদ্র ব্যবসা ঋণ (Business Loan)',
      principal: 80000,
      profit: 12000,
      totalLoan: 92000,
      installmentAmount: 920,
      totalPaid: 64400,
      due: 27600,
      nextDueDate: '২০২৬-১১-০৮',
      status: 'Active',
    },
    transactions: [
      { date: '২০২৬-১০-২৬', particulars: 'সাপ্তাহিক কিস্তি ও সঞ্চয় জমা', debit: 0, credit: 200, balance: 18800 },
      { date: '২০২৬-১০-১৯', particulars: 'সাপ্তাহিক সঞ্চয় জমা', debit: 0, credit: 200, balance: 18600 },
      { date: '২০২৬-১০-১২', particulars: 'সাপ্তাহিক সঞ্চয় জমা', debit: 0, credit: 200, balance: 18400 },
    ],
  },
  '1001': {
    accountNo: '1001',
    name: 'মোঃ আব্দুল করিম',
    fatherName: 'মরহুম মোঃ রহিম উদ্দিন',
    mobile: '01711-223344',
    somity: 'শনিবার ১ নং এলেঙ্গা সমিতি',
    type: 'Weekly (সাপ্তাহিক)',
    joiningDate: '২০২২-০১-১৫',
    generalTarget: 200,
    generalDeposit: 15400,
    generalWithdraw: 2000,
    generalBalance: 13400,
    specialBalance: 3500,
    shareBalance: 5000,
    dpsScheme: 'Progoti 5 Years DPS',
    dpsBalance: 12000,
    loanAccount: {
      loanId: 'LN-2026-089',
      scheme: 'সাপ্তাহিক ক্ষুদ্রঋণ',
      principal: 50000,
      profit: 7500,
      totalLoan: 57500,
      installmentAmount: 575,
      totalPaid: 28750,
      due: 28750,
      nextDueDate: '২০২৬-১১-০৭',
      status: 'Active',
    },
    transactions: [
      { date: '২০২৬-১০-২৮', particulars: 'সাপ্তাহিক সাধারণ সঞ্চয় জমা', debit: 0, credit: 200, balance: 13400 },
      { date: '২০২৬-১০-২১', particulars: 'সাপ্তাহিক সাধারণ সঞ্চয় জমা', debit: 0, credit: 200, balance: 13200 },
    ],
  },
};

export default function MemberPortalPage() {
  const [accountNo, setAccountNo] = useState('');
  const [pin, setPin] = useState('123456');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [passbook, setPassbook] = useState<PassbookData | null>(null);

  const handleSearchPassbook = (targetAcc?: string) => {
    const acc = (targetAcc || accountNo).trim();
    if (!acc) return;

    setLoading(true);
    setErrorMessage(null);

    setTimeout(() => {
      setLoading(false);
      // Case-insensitive lookup
      const found =
        MOCK_PASSBOOKS[acc] ||
        MOCK_PASSBOOKS[acc.toUpperCase()] ||
        Object.values(MOCK_PASSBOOKS).find(
          (p) => p.accountNo.toLowerCase() === acc.toLowerCase() || p.mobile.includes(acc)
        );

      if (found) {
        setPassbook(found);
      } else {
        // Fallback dynamic passbook for any valid account number entered
        setPassbook({
          accountNo: acc,
          name: 'সদস্য গ্রাহক (Verified Member)',
          fatherName: 'মরহুম মোঃ আকবর আলী',
          mobile: '01712-345678',
          somity: 'এলেঙ্গা প্রধান কার্যালয় কেন্দ্র',
          type: 'Weekly (সাপ্তাহিক)',
          joiningDate: '২০২৩-০২-০১',
          generalTarget: 200,
          generalDeposit: 12400,
          generalWithdraw: 1000,
          generalBalance: 11400,
          specialBalance: 2000,
          shareBalance: 4000,
          dpsScheme: 'ডিপিএস ৫ বছর মেয়াদী',
          dpsBalance: 8500,
          loanAccount: {
            loanId: `LN-${acc}`,
            scheme: 'নিয়মিত ক্ষুদ্রঋণ',
            principal: 40000,
            profit: 6000,
            totalLoan: 46000,
            installmentAmount: 460,
            totalPaid: 23000,
            due: 23000,
            nextDueDate: '২০২৬-১১-০৭',
            status: 'Active',
          },
          transactions: [
            { date: '২০২৬-১০-২৮', particulars: 'নিয়মিত সঞ্চয় জমা', debit: 0, credit: 200, balance: 11400 },
            { date: '২০২৬-১০-২১', particulars: 'নিয়মিত সঞ্চয় জমা', debit: 0, credit: 200, balance: 11200 },
          ],
        });
      }
    }, 400);
  };

  const handleQuickDemo = (acc: string) => {
    setAccountNo(acc);
    handleSearchPassbook(acc);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 font-sans">
      <div className="flex items-center justify-between mb-6 no-print">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>ওয়েবসাইটে ফিরে যান (Back to Website)</span>
        </Link>

        {passbook && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.print()}
              className="gap-1.5 text-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>পাসবই প্রিন্ট (Print Passbook)</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setPassbook(null)}
              className="gap-1.5 text-xs text-rose-600 hover:bg-rose-50"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>লগআউট</span>
            </Button>
          </div>
        )}
      </div>

      {!passbook ? (
        /* LOGIN / ACCOUNT SEARCH CARD */
        <div className="max-w-md mx-auto space-y-4">
          <Card className="shadow-xl border-slate-200 rounded-2xl overflow-hidden">
            <CardHeader className="text-center pb-3 bg-gradient-to-b from-emerald-50/60 to-white">
              <div className="w-14 h-14 bg-emerald-700 text-white rounded-2xl flex items-center justify-center mx-auto mb-3 font-bold text-lg shadow-sm">
                এস,এম
              </div>
              <CardTitle className="text-xl font-bold text-slate-900 tracking-tight">
                সঞ্চয় ও ঋণের পাশ বই
              </CardTitle>
              <CardDescription className="text-xs text-slate-600 mt-1 leading-relaxed">
                এস, এম ক্ষুদ্র সঞ্চয় ও ঋণদান সমবায় সমিতি লিঃ<br />
                <span className="text-emerald-700 font-semibold font-mono">
                  রেজিঃ ট-ক ২৮৪০/২১ • প্রধান কার্যালয়: এলেঙ্গা, কালিহাতী, টাঙ্গাইল
                </span>
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-4 space-y-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearchPassbook();
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    সদস্য হিসাব নম্বর (Account No) বা মোবাইল <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="যেমন: SM-2840-001 বা 1001"
                      value={accountNo}
                      onChange={(e) => setAccountNo(e.target.value)}
                      required
                      className="font-mono text-sm pl-9"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    গোপন পিন / পাসওয়ার্ড (PIN)
                  </label>
                  <div className="relative">
                    <Input
                      type="password"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      required
                      className="font-mono text-sm pl-9"
                    />
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-rose-50 text-rose-800 text-xs rounded-xl border border-rose-200 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm py-2.5 rounded-xl shadow-xs"
                  disabled={loading}
                >
                  {loading ? 'যাচাই করা হচ্ছে...' : 'ইলেকট্রনিক পাশবই দেখুন (View Passbook)'}
                </Button>
              </form>

              {/* DEMO ACCOUNTS QUICK BUTTONS */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <div className="text-[11px] font-bold text-slate-500 text-center uppercase tracking-wider">
                  এক ক্লিকে ডেমো অ্যাকাউন্ট পরীক্ষা করুন:
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('SM-2840-001')}
                    className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100 text-emerald-900 font-semibold text-left transition"
                  >
                    <div className="font-mono font-bold text-[11px]">SM-2840-001</div>
                    <div className="text-[11px] text-slate-600 truncate">মোঃ আব্দুল করিম</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('SM-2840-002')}
                    className="p-2.5 rounded-xl border border-sky-200 bg-sky-50/50 hover:bg-sky-100 text-sky-900 font-semibold text-left transition"
                  >
                    <div className="font-mono font-bold text-[11px]">SM-2840-002</div>
                    <div className="text-[11px] text-slate-600 truncate">মোছাঃ রহিমা বেগম</div>
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* PASSBOOK STATEMENT VIEW */
        <div className="space-y-6 bg-white rounded-2xl border border-slate-200/90 shadow-card p-6 sm:p-8">
          {/* Official Passbook Title Banner */}
          <div className="text-center border-b pb-5 space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত সমবায় সমিতি</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              এস, এম ক্ষুদ্র সঞ্চয় ও ঋণদান সমবায় সমিতি লিঃ
            </h1>
            <div className="text-xs font-semibold text-slate-700">
              S.M. Khudra Sanchay O Rindan Samabay Samity Limited
            </div>
            <div className="text-xs text-slate-500 font-mono">
              সরকারী রেজিঃ নং- ট-ক ২৮৪০/২১ • প্রধান কার্যালয়: এলেঙ্গা, কালিহাতী, টাঙ্গাইল, বাংলাদেশ
            </div>
            <div className="text-sm font-bold text-emerald-800 underline pt-1">
              সঞ্চয় ও ঋণের ইলেকট্রনিক পাশ বই (Electronic Passbook)
            </div>
          </div>

          {/* Member KYC Information Card */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-slate-500 block">সদস্যের নাম:</span>
              <strong className="text-slate-900 text-sm">{passbook.name}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">পিতা/স্বামীর নাম:</span>
              <strong className="text-slate-900">{passbook.fatherName}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">সঞ্চয়ী হিসাব নং:</span>
              <strong className="text-emerald-800 font-mono text-sm">{passbook.accountNo}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">সমিতি ও কেন্দ্র:</span>
              <strong className="text-slate-900">{passbook.somity}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">গ্রাহকের ধরণ:</span>
              <strong className="text-slate-800">{passbook.type}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">মোবাইল নম্বর:</span>
              <strong className="text-slate-800 font-mono">{passbook.mobile}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">ভর্তির তারিখ:</span>
              <strong className="text-slate-800 font-mono">{passbook.joiningDate}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">হিসাবের স্থিতি:</span>
              <span className="inline-flex items-center gap-1 font-bold text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>সক্রিয় (Active)</span>
              </span>
            </div>
          </div>

          {/* Summary Balance Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
              <span className="text-xs text-emerald-800 font-semibold block">সাধারণ সঞ্চয় স্থিতি</span>
              <span className="text-lg sm:text-xl font-black font-mono text-emerald-900 mt-1 block">
                ৳ {passbook.generalBalance.toLocaleString()}
              </span>
              <span className="text-[10px] text-emerald-700 mt-0.5 block">
                টার্গেট: ৳ {passbook.generalTarget} / সপ্তাহ
              </span>
            </div>

            <div className="p-4 rounded-xl bg-teal-50 border border-teal-200">
              <span className="text-xs text-teal-800 font-semibold block">বিশেষ সঞ্চয় স্থিতি</span>
              <span className="text-lg sm:text-xl font-black font-mono text-teal-900 mt-1 block">
                ৳ {passbook.specialBalance.toLocaleString()}
              </span>
              <span className="text-[10px] text-teal-700 mt-0.5 block">জরুরি তহবিল</span>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
              <span className="text-xs text-amber-800 font-semibold block">শেয়ার মূলধন ও আমানত</span>
              <span className="text-lg sm:text-xl font-black font-mono text-amber-900 mt-1 block">
                ৳ {passbook.shareBalance.toLocaleString()}
              </span>
              <span className="text-[10px] text-amber-700 mt-0.5 block">সমবায় মালিকানা শেয়ার</span>
            </div>

            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200">
              <span className="text-xs text-rose-800 font-semibold block">অবশিষ্ট ঋণ বকেয়া</span>
              <span className="text-lg sm:text-xl font-black font-mono text-rose-900 mt-1 block">
                {passbook.loanAccount ? `৳ ${passbook.loanAccount.due.toLocaleString()}` : '৳ 0'}
              </span>
              <span className="text-[10px] text-rose-700 mt-0.5 block">
                {passbook.loanAccount ? `কিস্তি: ৳ ${passbook.loanAccount.installmentAmount}` : 'কোনো ঋণ বকেয়া নেই'}
              </span>
            </div>
          </div>

          {/* Active Loan Details */}
          {passbook.loanAccount && (
            <div className="border border-slate-200 rounded-2xl p-5 space-y-3 bg-white">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 flex-wrap gap-2">
                <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-700" />
                  <span>চলতি ঋণ হিসাব বিবরণী ({passbook.loanAccount.loanId})</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                  {passbook.loanAccount.status}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block">মঞ্জুরকৃত আসল:</span>
                  <strong className="text-slate-800 font-mono">৳ {passbook.loanAccount.principal.toLocaleString()}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">মুনাফা (১৫%):</span>
                  <strong className="text-slate-800 font-mono">৳ {passbook.loanAccount.profit.toLocaleString()}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">মোট পরিশোধযোগ্য:</span>
                  <strong className="text-slate-900 font-mono font-bold">৳ {passbook.loanAccount.totalLoan.toLocaleString()}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">পরিশোধিত জমা:</span>
                  <strong className="text-emerald-700 font-mono font-bold">৳ {passbook.loanAccount.totalPaid.toLocaleString()}</strong>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border">
                <span>পরবর্তী কিস্তির তারিখ: <strong>{passbook.loanAccount.nextDueDate}</strong></span>
                <span>প্রতি কিস্তি প্রদেয়: <strong className="text-emerald-800 font-mono">৳ {passbook.loanAccount.installmentAmount}</strong></span>
              </div>
            </div>
          )}

          {/* Savings Ledger Statement Table */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Receipt className="w-4 h-4 text-emerald-700" />
              <span>সাম্প্রতিক সঞ্চয় লেনদেন খতিয়ান (Savings Statement)</span>
            </h3>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-900 text-white font-bold">
                  <tr>
                    <th className="p-3">তারিখ</th>
                    <th className="p-3">বিবরণ / খাত</th>
                    <th className="p-3 text-right">উত্তোলন (Debit)</th>
                    <th className="p-3 text-right">জমা (Credit)</th>
                    <th className="p-3 text-right">ব্যালেন্স স্থিতি</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {passbook.transactions.map((tx, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-3 font-mono text-slate-600">{tx.date}</td>
                      <td className="p-3 text-slate-800 font-medium">{tx.particulars}</td>
                      <td className="p-3 text-right font-mono text-rose-600">
                        {tx.debit > 0 ? `৳ ${tx.debit.toLocaleString()}` : '—'}
                      </td>
                      <td className="p-3 text-right font-mono text-emerald-700 font-bold">
                        {tx.credit > 0 ? `৳ ${tx.credit.toLocaleString()}` : '—'}
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-slate-900">
                        ৳ {tx.balance.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Passbook Official Footer & Seals */}
          <div className="pt-8 border-t flex justify-between items-end text-xs text-slate-500">
            <div className="text-center">
              ____________________________<br />
              সদস্যের স্বাক্ষর
            </div>
            <div className="text-center">
              <div className="w-16 h-16 border-2 border-emerald-800 rounded-full flex items-center justify-center mx-auto mb-1 text-[10px] text-emerald-900 font-bold rotate-[-12deg]">
                ট-ক ২৮৪০/২১<br />সিলমোহর
              </div>
              সমিতির অফিশিয়াল সিল
            </div>
            <div className="text-center">
              ____________________________<br />
              শাখা ব্যবস্থাপকের স্বাক্ষর
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
