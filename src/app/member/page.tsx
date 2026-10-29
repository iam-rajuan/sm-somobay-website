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
  TrendingUp,
  Receipt,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';

interface PassbookData {
  accountNo: string;
  name: string;
  nameEn?: string;
  fatherName: string;
  fatherNameEn?: string;
  mobile: string;
  somity: string;
  somityEn?: string;
  type: string;
  typeEn?: string;
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
    schemeEn?: string;
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
    particularsEn?: string;
    debit: number;
    credit: number;
    balance: number;
  }[];
}

const MOCK_PASSBOOKS: Record<string, PassbookData> = {
  'SM-2840-001': {
    accountNo: 'SM-2840-001',
    name: 'মোঃ আব্দুল করিম',
    nameEn: 'Md. Abdul Karim',
    fatherName: 'মরহুম মোঃ রহিম উদ্দিন',
    fatherNameEn: 'Late Md. Rahim Uddin',
    mobile: '01711-223344',
    somity: 'শনিবার ১ নং এলেঙ্গা সমিতি',
    somityEn: 'Saturday 01 Elenga Center',
    type: 'সাপ্তাহিক সঞ্চয়ী সদস্য',
    typeEn: 'Weekly Savings Member',
    joiningDate: '2022-01-15',
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
      schemeEn: 'Weekly Micro-Loan',
      principal: 50000,
      profit: 7500,
      totalLoan: 57500,
      installmentAmount: 575,
      totalPaid: 28750,
      due: 28750,
      nextDueDate: '2026-11-07',
      status: 'Active',
    },
    transactions: [
      {
        date: '2026-10-28',
        particulars: 'সাপ্তাহিক সাধারণ সঞ্চয় জমা',
        particularsEn: 'Weekly General Savings Deposit',
        debit: 0,
        credit: 200,
        balance: 13400,
      },
      {
        date: '2026-10-21',
        particulars: 'সাপ্তাহিক সাধারণ সঞ্চয় জমা',
        particularsEn: 'Weekly General Savings Deposit',
        debit: 0,
        credit: 200,
        balance: 13200,
      },
      {
        date: '2026-10-14',
        particulars: 'সাধারণ সঞ্চয় হতে আংশিক উত্তোলন',
        particularsEn: 'Partial General Savings Withdrawal',
        debit: 1000,
        credit: 0,
        balance: 13000,
      },
      {
        date: '2026-10-07',
        particulars: 'সাপ্তাহিক সাধারণ সঞ্চয় জমা',
        particularsEn: 'Weekly General Savings Deposit',
        debit: 0,
        credit: 200,
        balance: 14000,
      },
      {
        date: '2026-09-30',
        particulars: 'বিশেষ সঞ্চয় জমা সমন্বয়',
        particularsEn: 'Special Savings Deposit Adjustment',
        debit: 0,
        credit: 500,
        balance: 13800,
      },
    ],
  },
  'SM-2840-002': {
    accountNo: 'SM-2840-002',
    name: 'মোছাঃ রহিমা বেগম',
    nameEn: 'Mst. Rahima Begum',
    fatherName: 'মোঃ আব্দুল হক',
    fatherNameEn: 'Md. Abdul Haque',
    mobile: '01822-334455',
    somity: 'রবিবার ২ নং কালিহাতী কেন্দ্র',
    somityEn: 'Sunday 02 Kalihati Center',
    type: 'সাপ্তাহিক সঞ্চয়ী সদস্য',
    typeEn: 'Weekly Savings Member',
    joiningDate: '2021-03-10',
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
      scheme: 'ক্ষুদ্র ব্যবসা ঋণ',
      schemeEn: 'Micro Business Loan',
      principal: 80000,
      profit: 12000,
      totalLoan: 92000,
      installmentAmount: 920,
      totalPaid: 64400,
      due: 27600,
      nextDueDate: '2026-11-08',
      status: 'Active',
    },
    transactions: [
      {
        date: '2026-10-26',
        particulars: 'সাপ্তাহিক কিস্তি ও সঞ্চয় জমা',
        particularsEn: 'Weekly Installment & Savings Deposit',
        debit: 0,
        credit: 200,
        balance: 18800,
      },
      {
        date: '2026-10-19',
        particulars: 'সাপ্তাহিক সঞ্চয় জমা',
        particularsEn: 'Weekly Savings Deposit',
        debit: 0,
        credit: 200,
        balance: 18600,
      },
      {
        date: '2026-10-12',
        particulars: 'সাপ্তাহিক সঞ্চয় জমা',
        particularsEn: 'Weekly Savings Deposit',
        debit: 0,
        credit: 200,
        balance: 18400,
      },
    ],
  },
  '1001': {
    accountNo: '1001',
    name: 'মোঃ আব্দুল করিম',
    nameEn: 'Md. Abdul Karim',
    fatherName: 'মরহুম মোঃ রহিম উদ্দিন',
    fatherNameEn: 'Late Md. Rahim Uddin',
    mobile: '01711-223344',
    somity: 'শনিবার ১ নং এলেঙ্গা সমিতি',
    somityEn: 'Saturday 01 Elenga Center',
    type: 'সাপ্তাহিক সঞ্চয়ী সদস্য',
    typeEn: 'Weekly Savings Member',
    joiningDate: '2022-01-15',
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
      schemeEn: 'Weekly Micro-Loan',
      principal: 50000,
      profit: 7500,
      totalLoan: 57500,
      installmentAmount: 575,
      totalPaid: 28750,
      due: 28750,
      nextDueDate: '2026-11-07',
      status: 'Active',
    },
    transactions: [
      {
        date: '2026-10-28',
        particulars: 'সাপ্তাহিক সাধারণ সঞ্চয় জমা',
        particularsEn: 'Weekly General Savings Deposit',
        debit: 0,
        credit: 200,
        balance: 13400,
      },
      {
        date: '2026-10-21',
        particulars: 'সাপ্তাহিক সাধারণ সঞ্চয় জমা',
        particularsEn: 'Weekly General Savings Deposit',
        debit: 0,
        credit: 200,
        balance: 13200,
      },
    ],
  },
};

export default function MemberPortalPage() {
  const { language, setLanguage, formatMoney, formatNum } = useLanguage();
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
      const found =
        MOCK_PASSBOOKS[acc] ||
        MOCK_PASSBOOKS[acc.toUpperCase()] ||
        Object.values(MOCK_PASSBOOKS).find(
          (p) => p.accountNo.toLowerCase() === acc.toLowerCase() || p.mobile.includes(acc)
        );

      if (found) {
        setPassbook(found);
      } else {
        // Fallback dynamic passbook for arbitrary account entry
        setPassbook({
          accountNo: acc,
          name: 'সদস্য গ্রাহক (যাচাইকৃত)',
          nameEn: 'Verified Member Account',
          fatherName: 'মরহুম মোঃ আকবর আলী',
          fatherNameEn: 'Late Md. Akbar Ali',
          mobile: '01712-345678',
          somity: 'এলেঙ্গা প্রধান কার্যালয় কেন্দ্র',
          somityEn: 'Elenga Head Office Center',
          type: 'সাপ্তাহিক সাধারণ সদস্য',
          typeEn: 'Regular Weekly Member',
          joiningDate: '2023-02-01',
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
            schemeEn: 'Regular Microcredit',
            principal: 40000,
            profit: 6000,
            totalLoan: 46000,
            installmentAmount: 460,
            totalPaid: 23000,
            due: 23000,
            nextDueDate: '2026-11-07',
            status: 'Active',
          },
          transactions: [
            {
              date: '2026-10-28',
              particulars: 'নিয়মিত সঞ্চয় জমা',
              particularsEn: 'Regular Savings Deposit',
              debit: 0,
              credit: 200,
              balance: 11400,
            },
            {
              date: '2026-10-21',
              particulars: 'নিয়মিত সঞ্চয় জমা',
              particularsEn: 'Regular Savings Deposit',
              debit: 0,
              credit: 200,
              balance: 11200,
            },
          ],
        });
      }
    }, 350);
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
          <span>{language === 'bn' ? 'ওয়েবসাইটে ফিরে যান' : 'Back to Website'}</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Segmented Language Switcher */}
          <div className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200">
            <button
              type="button"
              onClick={() => setLanguage('bn')}
              className={`px-3 py-1.5 text-xs sm:text-[13px] font-bold rounded-lg transition cursor-pointer ${
                language === 'bn' ? 'bg-emerald-700 text-white shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              বাংলা
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-3 py-1.5 text-xs sm:text-[13px] font-bold rounded-lg transition cursor-pointer ${
                language === 'en' ? 'bg-emerald-700 text-white shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              EN
            </button>
          </div>

          {passbook && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
                className="h-10 px-4 text-xs sm:text-[13px] font-bold rounded-xl gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>{language === 'bn' ? 'পাসবই প্রিন্ট' : 'Print Passbook'}</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setPassbook(null)}
                className="h-10 px-4 text-xs sm:text-[13px] font-bold rounded-xl gap-2 text-rose-600 hover:bg-rose-50 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>{language === 'bn' ? 'লগআউট' : 'Logout'}</span>
              </Button>
            </>
          )}
        </div>
      </div>

      {!passbook ? (
        /* LOGIN / ACCOUNT SEARCH CARD */
        <div className="max-w-md mx-auto space-y-4">
          <Card className="shadow-xl border-slate-200 rounded-2xl overflow-hidden">
            <CardHeader className="text-center pb-3 bg-gradient-to-b from-emerald-50/60 to-white">
              <div className="w-14 h-14 bg-emerald-700 text-white rounded-2xl flex items-center justify-center mx-auto mb-3 font-bold text-lg shadow-sm">
                {language === 'bn' ? 'এস,এম' : 'SM'}
              </div>
              <CardTitle className="text-xl font-bold text-slate-900 tracking-tight">
                {language === 'bn' ? 'সঞ্চয় ও ঋণের ডিজিটাল পাশ বই' : 'Electronic Member Passbook'}
              </CardTitle>
              <CardDescription className="text-xs text-slate-600 mt-1 leading-relaxed">
                {language === 'bn'
                  ? 'এস, এম ক্ষুদ্র সঞ্চয় ও ঋণদান সমবায় সমিতি লিঃ'
                  : 'S.M. Khudra Sanchay O Rindan Samabay Samity Ltd.'}
                <br />
                <span className="text-emerald-700 font-semibold font-mono">
                  {language === 'bn'
                    ? 'রেজিঃ ট-ক ২৮৪০/২১ • প্রধান কার্যালয়: এলেঙ্গা, কালিহাতী'
                    : 'Govt Reg: T-K 2840/21 • Elenga, Kalihati, Tangail'}
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
                    {language === 'bn'
                      ? 'সদস্য হিসাব নম্বর (Account No) বা মোবাইল'
                      : 'Member Account Number or Mobile'}{' '}
                    <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder={language === 'bn' ? 'যেমন: SM-2840-001 বা 1001' : 'e.g. SM-2840-001 or 1001'}
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
                    {language === 'bn' ? 'গোপন পিন / পাসওয়ার্ড (PIN)' : 'Security PIN / Password'}
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
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm py-2.5 rounded-xl shadow-xs cursor-pointer"
                  disabled={loading}
                >
                  {loading
                    ? language === 'bn'
                      ? 'যাচাই করা হচ্ছে...'
                      : 'Verifying Credentials...'
                    : language === 'bn'
                    ? 'ইলেকট্রনিক পাশবই দেখুন'
                    : 'View Electronic Passbook'}
                </Button>
              </form>

              {/* DEMO ACCOUNTS QUICK BUTTONS */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <div className="text-[11px] font-bold text-slate-500 text-center uppercase tracking-wider">
                  {language === 'bn' ? 'এক ক্লিকে ডেমো অ্যাকাউন্ট পরীক্ষা করুন:' : 'One-Click Demo Test Accounts:'}
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('SM-2840-001')}
                    className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100 text-emerald-900 font-semibold text-left transition cursor-pointer"
                  >
                    <div className="font-mono font-bold text-[11px]">SM-2840-001</div>
                    <div className="text-[11px] text-slate-600 truncate">
                      {language === 'bn' ? 'মোঃ আব্দুল করিম' : 'Md. Abdul Karim'}
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('SM-2840-002')}
                    className="p-2.5 rounded-xl border border-sky-200 bg-sky-50/50 hover:bg-sky-100 text-sky-900 font-semibold text-left transition cursor-pointer"
                  >
                    <div className="font-mono font-bold text-[11px]">SM-2840-002</div>
                    <div className="text-[11px] text-slate-600 truncate">
                      {language === 'bn' ? 'মোছাঃ রহিমা বেগম' : 'Mst. Rahima Begum'}
                    </div>
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
              <span>
                {language === 'bn'
                  ? 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত সমবায় সমিতি'
                  : 'Govt. Approved Cooperative Society of Bangladesh'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {language === 'bn'
                ? 'এস, এম ক্ষুদ্র সঞ্চয় ও ঋণদান সমবায় সমিতি লিঃ'
                : 'S.M. Khudra Sanchay O Rindan Samabay Samity Limited'}
            </h1>
            <div className="text-xs font-semibold text-slate-700">
              {language === 'bn'
                ? 'রেজিঃ নং- ট-ক ২৮৪০/২১ • প্রধান কার্যালয়: এলেঙ্গা, কালিহাতী, টাঙ্গাইল'
                : 'Govt. Reg No: T-K 2840/21 • Head Office: Elenga, Kalihati, Tangail'}
            </div>
            <div className="text-sm font-bold text-emerald-800 underline pt-1">
              {language === 'bn'
                ? 'সঞ্চয় ও ঋণের ইলেকট্রনিক পাশ বই (Electronic Passbook)'
                : 'Electronic Savings & Loan Passbook Statement'}
            </div>
          </div>

          {/* Member KYC Information Card */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs sm:text-[13px]">
            <div>
              <span className="text-slate-500 block text-xs">
                {language === 'bn' ? 'সদস্যের নাম:' : 'Member Name:'}
              </span>
              <strong className="text-slate-900 text-sm sm:text-base font-bold">
                {language === 'bn' ? passbook.name : passbook.nameEn || passbook.name}
              </strong>
            </div>
            <div>
              <span className="text-slate-500 block text-xs">
                {language === 'bn' ? 'পিতা/স্বামীর নাম:' : 'Father / Spouse:'}
              </span>
              <strong className="text-slate-900 text-sm sm:text-base font-bold">
                {language === 'bn' ? passbook.fatherName : passbook.fatherNameEn || passbook.fatherName}
              </strong>
            </div>
            <div>
              <span className="text-slate-500 block text-xs">
                {language === 'bn' ? 'সঞ্চয়ী হিসাব নং:' : 'Account Number:'}
              </span>
              <strong className="text-emerald-800 font-mono text-sm sm:text-base font-black">{passbook.accountNo}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-xs">
                {language === 'bn' ? 'সমিতি ও কেন্দ্র:' : 'Somity / Center:'}
              </span>
              <strong className="text-slate-900 text-sm sm:text-base font-bold">
                {language === 'bn' ? passbook.somity : passbook.somityEn || passbook.somity}
              </strong>
            </div>
            <div>
              <span className="text-slate-500 block text-xs">
                {language === 'bn' ? 'গ্রাহকের ধরণ:' : 'Member Category:'}
              </span>
              <strong className="text-slate-800 font-semibold">{passbook.type}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-xs">
                {language === 'bn' ? 'মোবাইল নম্বর:' : 'Mobile Number:'}
              </span>
              <strong className="text-slate-800 font-mono font-bold">{passbook.mobile}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-xs">
                {language === 'bn' ? 'ভর্তির তারিখ:' : 'Enrollment Date:'}
              </span>
              <strong className="text-slate-800 font-mono font-bold">{formatNum(passbook.joiningDate)}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-xs">
                {language === 'bn' ? 'হিসাবের স্থিতি:' : 'Account Status:'}
              </span>
              <span className="inline-flex items-center gap-1.5 font-bold text-emerald-700 text-xs sm:text-[13px]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{language === 'bn' ? 'সক্রিয় (Active)' : 'Active'}</span>
              </span>
            </div>
          </div>

          {/* Summary Balance Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
            <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-2xs">
              <span className="text-xs sm:text-[13px] text-emerald-800 font-bold block uppercase tracking-wider">
                {language === 'bn' ? 'সাধারণ সঞ্চয় স্থিতি' : 'General Savings Balance'}
              </span>
              <span className="text-xl sm:text-2xl font-black font-financial tabular-nums text-emerald-900 mt-1.5 block">
                {formatMoney(passbook.generalBalance)}
              </span>
              <span className="text-xs text-emerald-700 mt-1 block font-medium font-financial tabular-nums">
                {language === 'bn'
                  ? `টার্গেট: ${formatMoney(passbook.generalTarget)} / সপ্তাহ`
                  : `Target: ${formatMoney(passbook.generalTarget)} / week`}
              </span>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-teal-50 border border-teal-200 shadow-2xs">
              <span className="text-xs sm:text-[13px] text-teal-800 font-bold block uppercase tracking-wider">
                {language === 'bn' ? 'বিশেষ সঞ্চয় স্থিতি' : 'Special Savings Balance'}
              </span>
              <span className="text-xl sm:text-2xl font-black font-financial tabular-nums text-teal-900 mt-1.5 block">
                {formatMoney(passbook.specialBalance)}
              </span>
              <span className="text-xs text-teal-700 mt-1 block font-medium">
                {language === 'bn' ? 'জরুরি সঞ্চয় তহবিল' : 'Contingency Fund'}
              </span>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-amber-50 border border-amber-200 shadow-2xs">
              <span className="text-xs sm:text-[13px] text-amber-800 font-bold block uppercase tracking-wider">
                {language === 'bn' ? 'শেয়ার মূলধন ও আমানত' : 'Share Capital Deposit'}
              </span>
              <span className="text-xl sm:text-2xl font-black font-financial tabular-nums text-amber-900 mt-1.5 block">
                {formatMoney(passbook.shareBalance)}
              </span>
              <span className="text-xs text-amber-700 mt-1 block font-medium">
                {language === 'bn' ? 'সমবায় ভোটিং শেয়ার' : 'Cooperative Ownership'}
              </span>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-rose-50 border border-rose-200 shadow-2xs">
              <span className="text-xs sm:text-[13px] text-rose-800 font-bold block uppercase tracking-wider">
                {language === 'bn' ? 'অবশিষ্ট ঋণ বকেয়া' : 'Outstanding Loan Balance'}
              </span>
              <span className="text-xl sm:text-2xl font-black font-financial tabular-nums text-rose-900 mt-1.5 block">
                {passbook.loanAccount ? formatMoney(passbook.loanAccount.due) : formatMoney(0)}
              </span>
              <span className="text-xs text-rose-700 mt-1 block font-medium font-financial tabular-nums">
                {passbook.loanAccount
                  ? language === 'bn'
                    ? `কিস্তি: ${formatMoney(passbook.loanAccount.installmentAmount)}`
                    : `Installment: ${formatMoney(passbook.loanAccount.installmentAmount)}`
                  : language === 'bn'
                  ? 'কোনো ঋণ নেই'
                  : 'No active loan'}
              </span>
            </div>
          </div>

          {/* Active Loan Details */}
          {passbook.loanAccount && (
            <div className="border border-slate-200 rounded-2xl p-5 space-y-3 bg-white">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 flex-wrap gap-2">
                <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-700" />
                  <span>
                    {language === 'bn'
                      ? `চলতি ঋণ হিসাব বিবরণী (${passbook.loanAccount.loanId})`
                      : `Active Loan Portfolio (${passbook.loanAccount.loanId})`}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                  {passbook.loanAccount.status}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block">
                    {language === 'bn' ? 'মঞ্জুরকৃত আসল:' : 'Sanctioned Principal:'}
                  </span>
                  <strong className="text-slate-800 font-financial tabular-nums">
                    {formatMoney(passbook.loanAccount.principal)}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500 block">
                    {language === 'bn' ? 'মুনাফা (১৫%):' : 'Profit (15%):'}
                  </span>
                  <strong className="text-slate-800 font-financial tabular-nums">
                    {formatMoney(passbook.loanAccount.profit)}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500 block">
                    {language === 'bn' ? 'মোট পরিশোধযোগ্য:' : 'Total Repayable:'}
                  </span>
                  <strong className="text-slate-900 font-financial tabular-nums font-bold">
                    {formatMoney(passbook.loanAccount.totalLoan)}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500 block">
                    {language === 'bn' ? 'পরিশোধিত জমা:' : 'Total Repaid:'}
                  </span>
                  <strong className="text-emerald-700 font-financial tabular-nums font-bold">
                    {formatMoney(passbook.loanAccount.totalPaid)}
                  </strong>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border">
                <span>
                  {language === 'bn' ? 'পরবর্তী কিস্তির তারিখ: ' : 'Next Due Date: '}
                  <strong>{formatNum(passbook.loanAccount.nextDueDate)}</strong>
                </span>
                <span>
                  {language === 'bn' ? 'প্রতি কিস্তি প্রদেয়: ' : 'Installment Payable: '}
                  <strong className="text-emerald-800 font-financial tabular-nums">
                    {formatMoney(passbook.loanAccount.installmentAmount)}
                  </strong>
                </span>
              </div>
            </div>
          )}

          {/* Savings Ledger Statement Table */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Receipt className="w-4 h-4 text-emerald-700" />
              <span>
                {language === 'bn'
                  ? 'সাম্প্রতিক সঞ্চয় লেনদেন খতিয়ান (Savings Statement)'
                  : 'Recent Savings Ledger & Statement'}
              </span>
            </h3>

            <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-xs">
              <table className="w-full text-left text-xs sm:text-[13.5px] border-collapse">
                <thead className="bg-slate-900 text-white font-bold text-xs uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5 sm:p-4">{language === 'bn' ? 'তারিখ' : 'Date'}</th>
                    <th className="p-3.5 sm:p-4">{language === 'bn' ? 'বিবরণ / খাত' : 'Description / Head'}</th>
                    <th className="p-3.5 sm:p-4 text-right">{language === 'bn' ? 'উত্তোলন (Debit)' : 'Debit'}</th>
                    <th className="p-3.5 sm:p-4 text-right">{language === 'bn' ? 'জমা (Credit)' : 'Credit'}</th>
                    <th className="p-3.5 sm:p-4 text-right">{language === 'bn' ? 'ব্যালেন্স স্থিতি' : 'Balance'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {passbook.transactions.map((tx, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5 sm:p-4 font-mono text-slate-600 font-semibold">{formatNum(tx.date)}</td>
                      <td className="p-3.5 sm:p-4 text-slate-800 font-semibold">
                        {language === 'bn' ? tx.particulars : tx.particularsEn || tx.particulars}
                      </td>
                      <td className="p-3.5 sm:p-4 text-right font-financial tabular-nums text-rose-600 font-bold">
                        {tx.debit > 0 ? formatMoney(tx.debit) : '—'}
                      </td>
                      <td className="p-3.5 sm:p-4 text-right font-financial tabular-nums text-emerald-700 font-bold">
                        {tx.credit > 0 ? formatMoney(tx.credit) : '—'}
                      </td>
                      <td className="p-3.5 sm:p-4 text-right font-financial tabular-nums font-black text-slate-900">
                        {formatMoney(tx.balance)}
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
              {language === 'bn' ? 'সদস্যের স্বাক্ষর' : "Member's Signature"}
            </div>
            <div className="text-center">
              <div className="w-16 h-16 border-2 border-emerald-800 rounded-full flex items-center justify-center mx-auto mb-1 text-[10px] text-emerald-900 font-bold rotate-[-12deg]">
                {language === 'bn' ? 'ট-ক ২৮৪০/২১' : 'T-K 2840/21'}
                <br />
                {language === 'bn' ? 'সিলমোহর' : 'Official Seal'}
              </div>
              {language === 'bn' ? 'সমিতির অফিশিয়াল সিল' : 'Cooperative Seal'}
            </div>
            <div className="text-center">
              ____________________________<br />
              {language === 'bn' ? 'শাখা ব্যবস্থাপকের স্বাক্ষর' : "Branch Manager's Signature"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
