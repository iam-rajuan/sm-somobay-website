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
  BookOpen,
  Calendar,
  FileSpreadsheet,
  BadgeCheck,
  Sun,
  Moon,
  Plus,
  Edit3,
  Save,
  X,
  CreditCard,
  UserPlus,
  Check,
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
  address: string;
  addressEn?: string;
  centerNo: string;
  centerNoEn?: string;
  mobile: string;
  officerSignature: string;
  joiningDate: string;
  // Loan terms (8 parameters from book top section)
  loanTerms: {
    loanAmount: number;
    disburseDate: string;
    installmentCount: number;
    formNo: string;
    perInstallment: number;
    dailyInstallment: number;
    weeklyInstallment: number;
    monthlyInstallment: number;
    outstandingDue: number;
  };
  // 3-Part Ledger Rows matching physical passbook
  ledgerRows: {
    date: string;
    // Part A: Savings
    savingsDeposit: number;
    savingsWithdraw: number;
    savingsProfit: number;
    savingsClosingBalance: number;
    // Part B: Loan
    loanInstallmentNo: number;
    loanCollected: number;
    loanRemainingBalance: number;
    // Part C: Verification
    officerSignature: string;
  }[];
}

const MOCK_PASSBOOKS: Record<string, PassbookData> = {
  'SM-2840-001': {
    accountNo: 'SM-2840-001',
    name: 'মোঃ আব্দুল করিম',
    nameEn: 'Md. Abdul Karim',
    fatherName: 'মরহুম মোঃ রহিম উদ্দিন',
    fatherNameEn: 'Late Md. Rahim Uddin',
    address: 'গ্রাম: এলেঙ্গা উত্তরপাড়া, ডাকঘর: এলেঙ্গা, উপজেলা: কালিহাতী, জেলা: টাঙ্গাইল',
    addressEn: 'Village: Elenga Uttarpara, Post: Elenga, Upazila: Kalihati, Dist: Tangail',
    centerNo: 'কেন্দ্র নং- ০১ (এলেঙ্গা বাজার সমিতি)',
    centerNoEn: 'Center No- 01 (Elenga Bazar Center)',
    mobile: '01711-223344',
    officerSignature: 'স্বাক্ষরিত (মাঠ কর্মকর্তা)',
    joiningDate: '2022-01-15',
    loanTerms: {
      loanAmount: 50000,
      disburseDate: '2026-05-10',
      installmentCount: 46,
      formNo: 'SM-LN-089',
      perInstallment: 1250,
      dailyInstallment: 0,
      weeklyInstallment: 1250,
      monthlyInstallment: 0,
      outstandingDue: 28750,
    },
    ledgerRows: [
      {
        date: '2026-10-28',
        savingsDeposit: 200,
        savingsWithdraw: 0,
        savingsProfit: 0,
        savingsClosingBalance: 13400,
        loanInstallmentNo: 23,
        loanCollected: 1250,
        loanRemainingBalance: 28750,
        officerSignature: 'করিম (সিল)',
      },
      {
        date: '2026-10-21',
        savingsDeposit: 200,
        savingsWithdraw: 0,
        savingsProfit: 0,
        savingsClosingBalance: 13200,
        loanInstallmentNo: 22,
        loanCollected: 1250,
        loanRemainingBalance: 30000,
        officerSignature: 'করিম (সিল)',
      },
      {
        date: '2026-10-14',
        savingsDeposit: 0,
        savingsWithdraw: 1000,
        savingsProfit: 0,
        savingsClosingBalance: 13000,
        loanInstallmentNo: 21,
        loanCollected: 1250,
        loanRemainingBalance: 31250,
        officerSignature: 'করিম (সিল)',
      },
      {
        date: '2026-10-07',
        savingsDeposit: 200,
        savingsWithdraw: 0,
        savingsProfit: 0,
        savingsClosingBalance: 14000,
        loanInstallmentNo: 20,
        loanCollected: 1250,
        loanRemainingBalance: 32500,
        officerSignature: 'করিম (সিল)',
      },
      {
        date: '2026-09-30',
        savingsDeposit: 500,
        savingsWithdraw: 0,
        savingsProfit: 150,
        savingsClosingBalance: 13800,
        loanInstallmentNo: 19,
        loanCollected: 1250,
        loanRemainingBalance: 33750,
        officerSignature: 'করিম (সিল)',
      },
    ],
  },
  'SM-2840-002': {
    accountNo: 'SM-2840-002',
    name: 'মোছাঃ রহিমা বেগম',
    nameEn: 'Mst. Rahima Begum',
    fatherName: 'মোঃ আব্দুল হক (স্বামী)',
    fatherNameEn: 'Md. Abdul Haque (Spouse)',
    address: 'গ্রাম: সিলিমপুর, ডাকঘর: কালিহাতী, উপজেলা: কালিহাতী, টাঙ্গাইল',
    addressEn: 'Silimpur, Kalihati, Tangail',
    centerNo: 'কেন্দ্র নং- ০২ (রবিবার কালিহাতী কেন্দ্র)',
    centerNoEn: 'Center No- 02 (Sunday Kalihati Center)',
    mobile: '01822-334455',
    officerSignature: 'স্বাক্ষরিত (মাঠ কর্মকর্তা)',
    joiningDate: '2021-03-10',
    loanTerms: {
      loanAmount: 80000,
      disburseDate: '2026-03-15',
      installmentCount: 50,
      formNo: 'SM-LN-042',
      perInstallment: 1840,
      dailyInstallment: 0,
      weeklyInstallment: 1840,
      monthlyInstallment: 0,
      outstandingDue: 27600,
    },
    ledgerRows: [
      {
        date: '2026-10-26',
        savingsDeposit: 200,
        savingsWithdraw: 0,
        savingsProfit: 0,
        savingsClosingBalance: 18800,
        loanInstallmentNo: 35,
        loanCollected: 1840,
        loanRemainingBalance: 27600,
        officerSignature: 'রহমান (সিল)',
      },
      {
        date: '2026-10-19',
        savingsDeposit: 200,
        savingsWithdraw: 0,
        savingsProfit: 0,
        savingsClosingBalance: 18600,
        loanInstallmentNo: 34,
        loanCollected: 1840,
        loanRemainingBalance: 29440,
        officerSignature: 'রহমান (সিল)',
      },
      {
        date: '2026-10-12',
        savingsDeposit: 200,
        savingsWithdraw: 0,
        savingsProfit: 0,
        savingsClosingBalance: 18400,
        loanInstallmentNo: 33,
        loanCollected: 1840,
        loanRemainingBalance: 31280,
        officerSignature: 'রহমান (সিল)',
      },
    ],
  },
  '1001': {
    accountNo: '1001',
    name: 'মোঃ আব্দুল করিম',
    nameEn: 'Md. Abdul Karim',
    fatherName: 'মরহুম মোঃ রহিম উদ্দিন',
    fatherNameEn: 'Late Md. Rahim Uddin',
    address: 'এলেঙ্গা উত্তরপাড়া, এলেঙ্গা, কালিহাতী, টাঙ্গাইল',
    addressEn: 'Elenga Uttarpara, Kalihati, Tangail',
    centerNo: 'কেন্দ্র নং- ০১',
    centerNoEn: 'Center No- 01',
    mobile: '01711-223344',
    officerSignature: 'স্বাক্ষরিত',
    joiningDate: '2022-01-15',
    loanTerms: {
      loanAmount: 50000,
      disburseDate: '2026-05-10',
      installmentCount: 46,
      formNo: 'SM-LN-089',
      perInstallment: 1250,
      dailyInstallment: 0,
      weeklyInstallment: 1250,
      monthlyInstallment: 0,
      outstandingDue: 28750,
    },
    ledgerRows: [
      {
        date: '2026-10-28',
        savingsDeposit: 200,
        savingsWithdraw: 0,
        savingsProfit: 0,
        savingsClosingBalance: 13400,
        loanInstallmentNo: 23,
        loanCollected: 1250,
        loanRemainingBalance: 28750,
        officerSignature: 'করিম (সিল)',
      },
      {
        date: '2026-10-21',
        savingsDeposit: 200,
        savingsWithdraw: 0,
        savingsProfit: 0,
        savingsClosingBalance: 13200,
        loanInstallmentNo: 22,
        loanCollected: 1250,
        loanRemainingBalance: 30000,
        officerSignature: 'করিম (সিল)',
      },
    ],
  },
};

export default function MemberPortalPage() {
  const { language, setLanguage, theme, toggleTheme, formatMoney, formatNum } = useLanguage();
  const [accountNo, setAccountNo] = useState('');
  const [pin, setPin] = useState('123456');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [passbook, setPassbook] = useState<PassbookData | null>(null);

  // View Mode: 'ledger' | 'cover' | 'print'
  const [passbookTab, setPassbookTab] = useState<'ledger' | 'cover'>('ledger');

  // Input states: 1. Add Entry to Ledger Table
  const [showAddEntryModal, setShowAddEntryModal] = useState(false);
  const [entryDate, setEntryDate] = useState('2026-10-31');
  const [entryDeposit, setEntryDeposit] = useState('200');
  const [entryWithdraw, setEntryWithdraw] = useState('0');
  const [entryProfit, setEntryProfit] = useState('0');
  const [entryLoanPaid, setEntryLoanPaid] = useState('1250');
  const [entrySignature, setEntrySignature] = useState('মাঠ কর্মকর্তা (সিল)');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Input states: 2. Edit Passbook Cover Page
  const [showEditCoverModal, setShowEditCoverModal] = useState(false);
  const [coverName, setCoverName] = useState('');
  const [coverNameEn, setCoverNameEn] = useState('');
  const [coverFather, setCoverFather] = useState('');
  const [coverAddress, setCoverAddress] = useState('');
  const [coverCenter, setCoverCenter] = useState('');
  const [coverAccountNo, setCoverAccountNo] = useState('');
  const [coverSignature, setCoverSignature] = useState('');

  // Input states: 3. Edit Loan Terms (Upper Section)
  const [showEditLoanModal, setShowEditLoanModal] = useState(false);
  const [loanAmountInput, setLoanAmountInput] = useState('50000');
  const [disburseDateInput, setDisburseDateInput] = useState('2026-05-10');
  const [installmentCountInput, setInstallmentCountInput] = useState('46');
  const [formNoInput, setFormNoInput] = useState('SM-LN-089');
  const [perInstallmentInput, setPerInstallmentInput] = useState('1250');
  const [weeklyInstallmentInput, setWeeklyInstallmentInput] = useState('1250');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const openAddEntryModal = () => {
    setEntryDate(new Date().toISOString().split('T')[0]);
    setEntryDeposit('200');
    setEntryWithdraw('0');
    setEntryProfit('0');
    setEntryLoanPaid(passbook?.loanTerms.perInstallment ? String(passbook.loanTerms.perInstallment) : '1250');
    setEntrySignature('মাঠ কর্মকর্তা (সিল)');
    setShowAddEntryModal(true);
  };

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passbook) return;

    const dep = parseFloat(entryDeposit) || 0;
    const withdr = parseFloat(entryWithdraw) || 0;
    const prof = parseFloat(entryProfit) || 0;
    const loanP = parseFloat(entryLoanPaid) || 0;

    const latestRow = passbook.ledgerRows[0];
    const prevSavings = latestRow ? latestRow.savingsClosingBalance : 0;
    const newSavingsBal = prevSavings + dep - withdr + prof;

    const prevLoanBal = latestRow ? latestRow.loanRemainingBalance : passbook.loanTerms.outstandingDue;
    const newLoanBal = Math.max(0, prevLoanBal - loanP);

    const nextInstNo = (latestRow ? latestRow.loanInstallmentNo : 0) + 1;

    const newRow = {
      date: entryDate,
      savingsDeposit: dep,
      savingsWithdraw: withdr,
      savingsProfit: prof,
      savingsClosingBalance: newSavingsBal,
      loanInstallmentNo: nextInstNo,
      loanCollected: loanP,
      loanRemainingBalance: newLoanBal,
      officerSignature: entrySignature,
    };

    setPassbook({
      ...passbook,
      loanTerms: {
        ...passbook.loanTerms,
        outstandingDue: newLoanBal,
      },
      ledgerRows: [newRow, ...passbook.ledgerRows],
    });

    setShowAddEntryModal(false);
    triggerToast(
      language === 'bn'
        ? `সফল! পাশ বইয়ে কিস্তি নং ${formatNum(nextInstNo)} এবং সঞ্চয় জমা ৳${formatNum(dep)} রেকর্ড সম্পন্ন হয়েছে।`
        : `Success! Installment #${nextInstNo} and deposit ৳${dep} recorded directly in passbook.`
    );
  };

  const openEditCoverModal = () => {
    if (!passbook) return;
    setCoverName(passbook.name);
    setCoverNameEn(passbook.nameEn || '');
    setCoverFather(passbook.fatherName);
    setCoverAddress(passbook.address);
    setCoverCenter(passbook.centerNo);
    setCoverAccountNo(passbook.accountNo);
    setCoverSignature(passbook.officerSignature);
    setShowEditCoverModal(true);
  };

  const handleSaveCover = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passbook) return;

    setPassbook({
      ...passbook,
      name: coverName,
      nameEn: coverNameEn,
      fatherName: coverFather,
      address: coverAddress,
      centerNo: coverCenter,
      accountNo: coverAccountNo,
      officerSignature: coverSignature,
    });

    setShowEditCoverModal(false);
    triggerToast(
      language === 'bn'
        ? 'বইয়ের কভার পেজের তথ্য সফলভাবে হালনাগাদ করা হয়েছে।'
        : 'Passbook cover information successfully updated.'
    );
  };

  const openEditLoanModal = () => {
    if (!passbook) return;
    setLoanAmountInput(String(passbook.loanTerms.loanAmount));
    setDisburseDateInput(passbook.loanTerms.disburseDate);
    setInstallmentCountInput(String(passbook.loanTerms.installmentCount));
    setFormNoInput(passbook.loanTerms.formNo);
    setPerInstallmentInput(String(passbook.loanTerms.perInstallment));
    setWeeklyInstallmentInput(String(passbook.loanTerms.weeklyInstallment));
    setShowEditLoanModal(true);
  };

  const handleSaveLoanTerms = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passbook) return;

    const amt = parseFloat(loanAmountInput) || passbook.loanTerms.loanAmount;
    const perInst = parseFloat(perInstallmentInput) || passbook.loanTerms.perInstallment;
    const weeklyInst = parseFloat(weeklyInstallmentInput) || perInst;

    setPassbook({
      ...passbook,
      loanTerms: {
        ...passbook.loanTerms,
        loanAmount: amt,
        disburseDate: disburseDateInput,
        installmentCount: parseInt(installmentCountInput, 10) || passbook.loanTerms.installmentCount,
        formNo: formNoInput,
        perInstallment: perInst,
        weeklyInstallment: weeklyInst,
      },
    });

    setShowEditLoanModal(false);
    triggerToast(
      language === 'bn'
        ? 'ভেতরের পৃষ্ঠার ঋণের শর্তাদি সফলভাবে হালনাগাদ করা হয়েছে।'
        : 'Loan parameters updated successfully.'
    );
  };

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
        // Fallback demo passbook
        setPassbook({
          accountNo: acc,
          name: 'সদস্য গ্রাহক (যাচাইকৃত)',
          nameEn: 'Verified Member Account',
          fatherName: 'মরহুম মোঃ আকবর আলী',
          fatherNameEn: 'Late Md. Akbar Ali',
          address: 'এলেঙ্গা পৌরসভা, কালিহাতী, টাঙ্গাইল',
          addressEn: 'Elenga Municipality, Kalihati, Tangail',
          centerNo: 'কেন্দ্র নং- ০৪ (এলেঙ্গা)',
          centerNoEn: 'Center No- 04 (Elenga)',
          mobile: '01712-345678',
          officerSignature: 'স্বাক্ষরিত (মাঠ কর্মকর্তা)',
          joiningDate: '2023-02-01',
          loanTerms: {
            loanAmount: 40000,
            disburseDate: '2026-06-01',
            installmentCount: 46,
            formNo: 'SM-LN-102',
            perInstallment: 1000,
            dailyInstallment: 0,
            weeklyInstallment: 1000,
            monthlyInstallment: 0,
            outstandingDue: 23000,
          },
          ledgerRows: [
            {
              date: '2026-10-28',
              savingsDeposit: 200,
              savingsWithdraw: 0,
              savingsProfit: 0,
              savingsClosingBalance: 11400,
              loanInstallmentNo: 17,
              loanCollected: 1000,
              loanRemainingBalance: 23000,
              officerSignature: 'রফিক (সিল)',
            },
            {
              date: '2026-10-21',
              savingsDeposit: 200,
              savingsWithdraw: 0,
              savingsProfit: 0,
              savingsClosingBalance: 11200,
              loanInstallmentNo: 16,
              loanCollected: 1000,
              loanRemainingBalance: 24000,
              officerSignature: 'রফিক (সিল)',
            },
          ],
        });
      }
    }, 300);
  };

  const handleQuickDemo = (acc: string) => {
    setAccountNo(acc);
    handleSearchPassbook(acc);
  };

  // Calculate totals for ledger table
  const totalSavingsDeposit = passbook?.ledgerRows.reduce((acc, r) => acc + r.savingsDeposit, 0) || 0;
  const totalSavingsWithdraw = passbook?.ledgerRows.reduce((acc, r) => acc + r.savingsWithdraw, 0) || 0;
  const totalSavingsProfit = passbook?.ledgerRows.reduce((acc, r) => acc + r.savingsProfit, 0) || 0;
  const totalLoanCollected = passbook?.ledgerRows.reduce((acc, r) => acc + r.loanCollected, 0) || 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 font-sans">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6 no-print flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{language === 'bn' ? 'ওয়েবসাইটে ফিরে যান' : 'Back to Website'}</span>
        </Link>

        <div className="flex items-center gap-2.5">
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-1.5 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>

          {/* Language Switcher */}
          <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden">
            <button
              type="button"
              onClick={() => setLanguage('bn')}
              className={`px-2.5 py-1 text-xs font-medium transition cursor-pointer ${
                language === 'bn'
                  ? 'bg-emerald-700 text-white'
                  : 'text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              বাংলা
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 text-xs font-medium transition cursor-pointer ${
                language === 'en'
                  ? 'bg-emerald-700 text-white'
                  : 'text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'
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
                className="gap-1.5 cursor-pointer font-medium"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'প্রিন্ট পাশ বই' : 'Print Passbook'}</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setPassbook(null)}
                className="gap-1.5 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 cursor-pointer font-medium"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'লগআউট' : 'Logout'}</span>
              </Button>
            </>
          )}
        </div>
      </div>

      {!passbook ? (
        /* LOGIN / ACCOUNT SEARCH */
        <div className="max-w-md mx-auto">
          <Card className="shadow-sm">
            <CardHeader className="text-center pb-2">
              <div className="w-14 h-14 bg-emerald-700 rounded-lg flex flex-col items-center justify-center text-white mx-auto mb-3 shadow-sm border border-emerald-600">
                <span className="text-xs font-bold leading-none">S-M</span>
                <span className="text-xs leading-none mt-1">🤝</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 mb-1 mx-auto">
                <ShieldCheck className="w-3 h-3" />
                <span>{language === 'bn' ? 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত' : 'Approved by Govt. of Bangladesh'}</span>
              </div>
              <CardTitle className="text-lg text-slate-900 dark:text-white">
                {language === 'bn' ? 'সঞ্চয় ও ঋণের পাশ বই' : 'Savings & Loan Digital Passbook'}
              </CardTitle>
              <CardDescription className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {language === 'bn'
                  ? 'এস, এম ক্ষুদ্র সঞ্চয় ও ঋণদান সমবায় সমিতি লিঃ'
                  : 'S.M. Khudra Sanchay O Rindan Samabay Samity Ltd.'}
                <br />
                <span className="text-emerald-700 dark:text-emerald-400 font-medium font-mono">
                  {language === 'bn'
                    ? 'সোশ্যাল ম্যানেজমেন্ট • রেজিঃ ট-ক ২৮৪০/২১ • এলেঙ্গা, কালিহাতী'
                    : 'Social Management • Reg: T-K 2840/21 • Elenga, Kalihati'}
                </span>
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-4 space-y-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearchPassbook();
                }}
                className="space-y-3.5"
              >
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'bn' ? 'সদস্য সঞ্চয়ী হিসাব নং বা মোবাইল' : 'Savings A/C No or Mobile'}{' '}
                    <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder={language === 'bn' ? 'যেমন: SM-2840-001 বা 1001' : 'e.g. SM-2840-001 or 1001'}
                      value={accountNo}
                      onChange={(e) => setAccountNo(e.target.value)}
                      required
                      className="font-mono text-sm pl-8.5"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-3 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'bn' ? 'গোপন পিন / পাসওয়ার্ড' : 'Security PIN / Password'}
                  </label>
                  <div className="relative">
                    <Input
                      type="password"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      required
                      className="font-mono text-sm pl-8.5"
                    />
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-2.5 top-3 pointer-events-none" />
                  </div>
                </div>

                {errorMessage && (
                  <div className="p-2.5 bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 text-xs rounded border border-rose-200 dark:border-rose-900/60 flex items-center gap-2">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full font-medium text-sm cursor-pointer shadow-sm"
                  disabled={loading}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  <span>
                    {loading
                      ? language === 'bn'
                        ? 'যাচাই করা হচ্ছে...'
                        : 'Verifying...'
                      : language === 'bn'
                      ? 'ডিজিটাল পাশ বই খুলুন'
                      : 'Open Digital Passbook'}
                  </span>
                </Button>
              </form>

              {/* Demo accounts */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 text-center uppercase tracking-wider">
                  {language === 'bn' ? 'ডেমো টেস্ট পাসবই হিসাব:' : 'Demo Passbook Accounts:'}
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('SM-2840-001')}
                    className="p-2.5 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition cursor-pointer"
                  >
                    <div className="font-mono font-semibold text-[11px] text-emerald-700 dark:text-emerald-400">SM-2840-001</div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-300 truncate font-medium">
                      {language === 'bn' ? 'মোঃ আব্দুল করিম' : 'Md. Abdul Karim'}
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('SM-2840-002')}
                    className="p-2.5 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition cursor-pointer"
                  >
                    <div className="font-mono font-semibold text-[11px] text-emerald-700 dark:text-emerald-400">SM-2840-002</div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-300 truncate font-medium">
                      {language === 'bn' ? 'মোছাঃ রহিমা বেগম' : 'Mst. Rahima Begum'}
                    </div>
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* PASSBOOK DIGITAL TWIN VIEW */
        <div className="space-y-6">
          {/* Toast Notification */}
          {toastMessage && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs rounded-lg flex items-center justify-between shadow-xs transition-all">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="font-medium">{toastMessage}</span>
              </div>
              <button
                type="button"
                onClick={() => setToastMessage(null)}
                className="text-emerald-600 hover:text-emerald-900 dark:hover:text-emerald-300 p-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Action & View Controls Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-50 dark:bg-slate-900/80 p-3 rounded-lg border border-slate-200 dark:border-slate-800 no-print">
            {/* Tab selector: Passbook Ledger Spread vs Passbook Cover */}
            <div className="flex border border-slate-200 dark:border-slate-700 rounded-md p-0.5 bg-slate-200 dark:bg-slate-800">
              <button
                type="button"
                onClick={() => setPassbookTab('ledger')}
                className={`py-1.5 px-3 text-xs font-semibold rounded transition cursor-pointer flex items-center gap-1.5 ${
                  passbookTab === 'ledger'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{language === 'bn' ? 'হিসাবের খতিয়ান (লেজার)' : 'Ledger Spread'}</span>
              </button>
              <button
                type="button"
                onClick={() => setPassbookTab('cover')}
                className={`py-1.5 px-3 text-xs font-semibold rounded transition cursor-pointer flex items-center gap-1.5 ${
                  passbookTab === 'cover'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{language === 'bn' ? 'বইয়ের কভার পেজ' : 'Passbook Cover'}</span>
              </button>
            </div>

            {/* Direct Input Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              {passbookTab === 'ledger' ? (
                <>
                  <Button
                    size="sm"
                    onClick={openAddEntryModal}
                    className="gap-1.5 text-xs font-semibold shadow-xs bg-emerald-700 hover:bg-emerald-800 text-white cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{language === 'bn' ? '+ বইয়ে নতুন এন্ট্রি লিখুন' : '+ Add Record Entry'}</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={openEditLoanModal}
                    className="gap-1.5 text-xs font-medium cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{language === 'bn' ? 'ঋণের শর্তাদি সম্পাদনা' : 'Edit Loan Terms'}</span>
                  </Button>
                </>
              ) : (
                <Button
                  size="sm"
                  onClick={openEditCoverModal}
                  className="gap-1.5 text-xs font-semibold shadow-xs bg-emerald-700 hover:bg-emerald-800 text-white cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'কভার পেজের তথ্য পূরণ / সম্পাদনা' : 'Fill / Edit Cover Info'}</span>
                </Button>
              )}
            </div>
          </div>

          {passbookTab === 'cover' ? (
            /* ========================================================
               1. PASSBOOK COVER PAGE (Exact Replica of Physical Book)
               ======================================================== */
            <div className="max-w-2xl mx-auto bg-emerald-900 dark:bg-emerald-950 text-white rounded-xl border-4 border-emerald-700/60 p-6 sm:p-10 shadow-lg space-y-6">
              {/* Header Box */}
              <div className="text-center space-y-2 border-b border-emerald-700/60 pb-6">
                <div className="text-xs uppercase font-medium text-emerald-200 tracking-wider">
                  {language === 'bn' ? 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার কর্তৃক অনুমোদিত' : 'Approved by Govt. of Bangladesh'}
                </div>
                <div className="text-xs text-emerald-300 font-semibold uppercase tracking-widest">
                  {language === 'bn' ? 'সোশ্যাল ম্যানেজমেন্ট' : 'Social Management'}
                </div>

                {/* Logo: S-M with Handshake */}
                <div className="w-16 h-16 bg-white rounded-full flex flex-col items-center justify-center mx-auto my-3 text-emerald-900 shadow-md border-2 border-emerald-400">
                  <span className="text-xs font-black tracking-tight leading-none">S-M</span>
                  <span className="text-sm leading-none mt-1">🤝</span>
                </div>

                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {language === 'bn'
                    ? 'এস, এম ক্ষুদ্র সঞ্চয় ও ঋণদান সমবায় সমিতি লিঃ'
                    : 'S.M. Khudra Sanchay O Rindan Samabay Samity Limited'}
                </h1>
                <div className="text-xs sm:text-[13px] text-emerald-200">
                  {language === 'bn' ? 'প্রধান কার্যালয়: এলেঙ্গা, কালিহাতী, টাঙ্গাইল।' : 'Head Office: Elenga, Kalihati, Tangail.'}
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-emerald-800 text-emerald-100 text-xs font-mono font-medium border border-emerald-600 mt-1">
                  {language === 'bn' ? 'নিবন্ধন নম্বর: ট-ক ২৮৪০/২১' : 'Registration No: T-K 2840/21'}
                </div>

                <div className="pt-2">
                  <span className="text-base sm:text-lg font-bold text-amber-300 tracking-wide underline decoration-amber-400/60 underline-offset-4">
                    {language === 'bn' ? 'সঞ্চয় ও ঋণের পাশ বই' : 'Savings & Loan Passbook'}
                  </span>
                </div>
              </div>

              {/* 6 Cover Fields from Physical Passbook */}
              <div className="bg-emerald-950/70 border border-emerald-700/60 rounded-lg p-5 sm:p-6 space-y-3.5 text-xs sm:text-sm">
                <div className="border-b border-emerald-800/80 pb-2">
                  <span className="text-emerald-300 text-xs uppercase font-semibold block mb-0.5">
                    {language === 'bn' ? '১. সদস্য / সদস্যার নাম:' : '1. Member Name:'}
                  </span>
                  <span className="text-base font-bold text-white">
                    {language === 'bn' ? passbook.name : passbook.nameEn || passbook.name}
                  </span>
                </div>

                <div className="border-b border-emerald-800/80 pb-2">
                  <span className="text-emerald-300 text-xs uppercase font-semibold block mb-0.5">
                    {language === 'bn' ? '২. পিতা / স্বামীর নাম:' : '2. Father / Husband Name:'}
                  </span>
                  <span className="text-sm sm:text-base font-medium text-emerald-100">
                    {language === 'bn' ? passbook.fatherName : passbook.fatherNameEn || passbook.fatherName}
                  </span>
                </div>

                <div className="border-b border-emerald-800/80 pb-2">
                  <span className="text-emerald-300 text-xs uppercase font-semibold block mb-0.5">
                    {language === 'bn' ? '৩. ঠিকানা:' : '3. Address:'}
                  </span>
                  <span className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                    {language === 'bn' ? passbook.address : passbook.addressEn || passbook.address}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 border-b border-emerald-800/80 pb-2">
                  <div>
                    <span className="text-emerald-300 text-xs uppercase font-semibold block mb-0.5">
                      {language === 'bn' ? '৪. কেন্দ্র নং:' : '4. Center No:'}
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {language === 'bn' ? passbook.centerNo : passbook.centerNoEn || passbook.centerNo}
                    </span>
                  </div>
                  <div>
                    <span className="text-emerald-300 text-xs uppercase font-semibold block mb-0.5">
                      {language === 'bn' ? '৫. সঞ্চয়ী হিসাব নং:' : '5. Savings A/C No:'}
                    </span>
                    <span className="text-base font-mono font-bold text-amber-300">
                      {passbook.accountNo}
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <span className="text-emerald-300 text-xs uppercase font-semibold block mb-0.5">
                      {language === 'bn' ? '৬. কর্মকর্তার স্বাক্ষর:' : '6. Officer Signature:'}
                    </span>
                    <span className="text-xs text-emerald-200 font-mono italic">
                      {passbook.officerSignature}
                    </span>
                  </div>
                  <div className="text-right font-mono text-[11px] text-emerald-300">
                    {language === 'bn' ? 'ভর্তির তারিখ: ' : 'Join Date: '}
                    {formatNum(passbook.joiningDate)}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ========================================================
               2. INSIDE SPREAD (Ledger & 8 Upper Loan Parameters)
               ======================================================== */
            <div className="space-y-5 bg-white dark:bg-[#0b1324] rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-6 transition-colors">
              {/* Institution Header Strip */}
              <div className="text-center border-b border-slate-200 dark:border-slate-800 pb-4 space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 text-[11px] font-semibold border border-emerald-200 dark:border-emerald-800">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত' : 'Approved by Govt. of Bangladesh'}</span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {language === 'bn' ? 'এস, এম ক্ষুদ্র সঞ্চয় ও ঋণদান সমবায় সমিতি লিঃ' : 'S.M. Khudra Sanchay O Rindan Samabay Samity Ltd.'}
                </h2>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  {language === 'bn'
                    ? 'সোশ্যাল ম্যানেজমেন্ট • রেজিঃ ট-ক ২৮৪০/২১ • প্রধান কার্যালয়: এলেঙ্গা, কালিহাতী, টাঙ্গাইল'
                    : 'Social Management • Reg: T-K 2840/21 • Head Office: Elenga, Kalihati, Tangail'}
                </div>
                <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider pt-1">
                  {language === 'bn' ? 'সঞ্চয় ও ঋণের পাশ বই • ভেতরের পৃষ্ঠার হিসাব' : 'Savings & Loan Passbook • Inner Spread Ledger'}
                </div>
              </div>

              {/* Upper Section: 8 Loan Parameters from Physical Book */}
              <div className="bg-slate-50 dark:bg-slate-900/60 rounded-lg border border-slate-200 dark:border-slate-800 p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2 flex-wrap gap-2">
                  <div className="text-xs uppercase font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                    <span>{language === 'bn' ? 'ভেতরের পৃষ্ঠার ঋণের তথ্য (Loan Terms)' : 'Upper Section: Loan Information'}</span>
                  </div>
                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {language === 'bn' ? 'হিসাব নং: ' : 'A/C: '}
                    <strong className="text-emerald-700 dark:text-emerald-400 font-bold">{passbook.accountNo}</strong> • {passbook.name}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  {/* 1. Loan Amount */}
                  <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium mb-0.5">
                      {language === 'bn' ? '১. ঋণের পরিমাণ:' : '1. Loan Amount:'}
                    </span>
                    <span className="font-financial tabular-nums font-bold text-slate-900 dark:text-white text-sm">
                      {formatMoney(passbook.loanTerms.loanAmount)}
                    </span>
                  </div>

                  {/* 2. Disburse Date */}
                  <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium mb-0.5">
                      {language === 'bn' ? '২. বিতরণের তারিখ:' : '2. Disburse Date:'}
                    </span>
                    <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                      {formatNum(passbook.loanTerms.disburseDate)}
                    </span>
                  </div>

                  {/* 3. Installments Count */}
                  <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium mb-0.5">
                      {language === 'bn' ? '৩. কিস্তির সংখ্যা:' : '3. Total Installments:'}
                    </span>
                    <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                      {formatNum(passbook.loanTerms.installmentCount)} {language === 'bn' ? 'টি' : 'Inst.'}
                    </span>
                  </div>

                  {/* 4. Loan Form No */}
                  <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium mb-0.5">
                      {language === 'bn' ? '৪. ঋণের ফরম নং:' : '4. Loan Form No:'}
                    </span>
                    <span className="font-mono font-semibold text-emerald-700 dark:text-emerald-400">
                      {passbook.loanTerms.formNo}
                    </span>
                  </div>

                  {/* 5. Per Installment */}
                  <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium mb-0.5">
                      {language === 'bn' ? '৫. প্রতি কিস্তি:' : '5. Per Installment:'}
                    </span>
                    <span className="font-financial tabular-nums font-bold text-emerald-800 dark:text-emerald-300">
                      {formatMoney(passbook.loanTerms.perInstallment)}
                    </span>
                  </div>

                  {/* 6. Daily */}
                  <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium mb-0.5">
                      {language === 'bn' ? '৬. দৈনিক কিস্তি:' : '6. Daily Installment:'}
                    </span>
                    <span className="font-financial tabular-nums text-slate-700 dark:text-slate-300">
                      {passbook.loanTerms.dailyInstallment > 0 ? formatMoney(passbook.loanTerms.dailyInstallment) : '—'}
                    </span>
                  </div>

                  {/* 7. Weekly */}
                  <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium mb-0.5">
                      {language === 'bn' ? '৭. সাপ্তাহিক কিস্তি:' : '7. Weekly Installment:'}
                    </span>
                    <span className="font-financial tabular-nums font-semibold text-emerald-700 dark:text-emerald-400">
                      {formatMoney(passbook.loanTerms.weeklyInstallment)}
                    </span>
                  </div>

                  {/* 8. Monthly */}
                  <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium mb-0.5">
                      {language === 'bn' ? '৮. মাসিক কিস্তি:' : '8. Monthly Installment:'}
                    </span>
                    <span className="font-financial tabular-nums text-slate-700 dark:text-slate-300">
                      {passbook.loanTerms.monthlyInstallment > 0 ? formatMoney(passbook.loanTerms.monthlyInstallment) : '—'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Lower Section: 3-Part Physical Ledger Table */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                    <span>{language === 'bn' ? 'হিসাবের টেবিল (সঞ্চয়, ঋণ ও যাচাই খতিয়ান)' : 'Passbook Ledger Table'}</span>
                  </h3>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    {language === 'bn' ? 'মোট লেনদেন: ' : 'Total Entries: '}
                    {formatNum(passbook.ledgerRows.length)}
                  </span>
                </div>

                <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs">
                  <table className="w-full text-xs text-left">
                    {/* Multi-tiered headers representing Part A, Part B, Part C */}
                    <thead>
                      <tr className="bg-slate-800 text-white border-b border-slate-700 text-center font-bold text-[11px] uppercase tracking-wider">
                        <th className="p-2.5 border-r border-slate-700 w-24">তারিখ</th>
                        <th colSpan={4} className="p-2.5 border-r border-slate-700 bg-emerald-900/90 text-emerald-100">
                          {language === 'bn' ? 'ক. সঞ্চয় হিসাব (Savings)' : 'Part A: Savings Account'}
                        </th>
                        <th colSpan={3} className="p-2.5 border-r border-slate-700 bg-rose-900/80 text-rose-100">
                          {language === 'bn' ? 'খ. ঋণের হিসাব (Loan)' : 'Part B: Loan Account'}
                        </th>
                        <th className="p-2.5 bg-slate-900 text-slate-200">
                          {language === 'bn' ? 'গ. যাচাই' : 'Part C: Verify'}
                        </th>
                      </tr>
                      <tr className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800 text-[11px]">
                        <th className="p-2.5 border-r border-slate-200 dark:border-slate-800">{language === 'bn' ? 'তারিখ' : 'Date'}</th>
                        {/* Part A */}
                        <th className="p-2.5 text-right border-r border-slate-200 dark:border-slate-800">{language === 'bn' ? 'জমা' : 'Deposit'}</th>
                        <th className="p-2.5 text-right border-r border-slate-200 dark:border-slate-800">{language === 'bn' ? 'উত্তোলন' : 'Withdraw'}</th>
                        <th className="p-2.5 text-right border-r border-slate-200 dark:border-slate-800">{language === 'bn' ? 'সুদ' : 'Profit'}</th>
                        <th className="p-2.5 text-right border-r border-slate-200 dark:border-slate-800 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 font-bold">
                          {language === 'bn' ? 'সমাপনী স্থিতি' : 'Closing Bal'}
                        </th>
                        {/* Part B */}
                        <th className="p-2.5 text-center border-r border-slate-200 dark:border-slate-800">{language === 'bn' ? 'কিস্তি নং' : 'Inst No'}</th>
                        <th className="p-2.5 text-right border-r border-slate-200 dark:border-slate-800 text-emerald-700 dark:text-emerald-400">{language === 'bn' ? 'আদায়' : 'Paid'}</th>
                        <th className="p-2.5 text-right border-r border-slate-200 dark:border-slate-800 bg-rose-50/50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 font-bold">
                          {language === 'bn' ? 'অবশিষ্ট স্থিতি' : 'Due Balance'}
                        </th>
                        {/* Part C */}
                        <th className="p-2.5 text-center">{language === 'bn' ? 'স্বাক্ষর' : 'Signature'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                      {passbook.ledgerRows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                          {/* Date */}
                          <td className="p-2.5 border-r border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                            {formatNum(row.date)}
                          </td>
                          {/* Part A: Savings */}
                          <td className="p-2.5 text-right border-r border-slate-200 dark:border-slate-800 text-emerald-700 dark:text-emerald-400 font-semibold font-financial tabular-nums">
                            {row.savingsDeposit > 0 ? formatMoney(row.savingsDeposit) : '—'}
                          </td>
                          <td className="p-2.5 text-right border-r border-slate-200 dark:border-slate-800 text-rose-600 dark:text-rose-400 font-financial tabular-nums">
                            {row.savingsWithdraw > 0 ? formatMoney(row.savingsWithdraw) : '—'}
                          </td>
                          <td className="p-2.5 text-right border-r border-slate-200 dark:border-slate-800 text-amber-600 dark:text-amber-400 font-financial tabular-nums">
                            {row.savingsProfit > 0 ? formatMoney(row.savingsProfit) : '—'}
                          </td>
                          <td className="p-2.5 text-right border-r border-slate-200 dark:border-slate-800 font-bold font-financial tabular-nums bg-emerald-50/30 dark:bg-emerald-950/20 text-slate-900 dark:text-slate-100">
                            {formatMoney(row.savingsClosingBalance)}
                          </td>
                          {/* Part B: Loan */}
                          <td className="p-2.5 text-center border-r border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                            {formatNum(row.loanInstallmentNo)}
                          </td>
                          <td className="p-2.5 text-right border-r border-slate-200 dark:border-slate-800 text-emerald-700 dark:text-emerald-400 font-semibold font-financial tabular-nums">
                            {formatMoney(row.loanCollected)}
                          </td>
                          <td className="p-2.5 text-right border-r border-slate-200 dark:border-slate-800 font-bold font-financial tabular-nums bg-rose-50/30 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400">
                            {formatMoney(row.loanRemainingBalance)}
                          </td>
                          {/* Part C: Verification */}
                          <td className="p-2.5 text-center text-slate-600 dark:text-slate-400 text-[10px] font-sans">
                            {row.officerSignature}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    {/* Bottom Total Row matching physical book */}
                    <tfoot>
                      <tr className="bg-slate-100 dark:bg-slate-900 font-bold text-xs border-t-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white">
                        <td className="p-2.5 border-r border-slate-200 dark:border-slate-800 uppercase text-center font-sans">
                          {language === 'bn' ? 'পৃষ্ঠার মোট' : 'Page Total'}
                        </td>
                        <td className="p-2.5 text-right border-r border-slate-200 dark:border-slate-800 text-emerald-700 dark:text-emerald-400 font-financial tabular-nums">
                          {formatMoney(totalSavingsDeposit)}
                        </td>
                        <td className="p-2.5 text-right border-r border-slate-200 dark:border-slate-800 text-rose-600 dark:text-rose-400 font-financial tabular-nums">
                          {formatMoney(totalSavingsWithdraw)}
                        </td>
                        <td className="p-2.5 text-right border-r border-slate-200 dark:border-slate-800 text-amber-600 dark:text-amber-400 font-financial tabular-nums">
                          {formatMoney(totalSavingsProfit)}
                        </td>
                        <td className="p-2.5 text-right border-r border-slate-200 dark:border-slate-800 font-financial tabular-nums font-bold">
                          —
                        </td>
                        <td className="p-2.5 text-center border-r border-slate-200 dark:border-slate-800 font-sans">
                          —
                        </td>
                        <td className="p-2.5 text-right border-r border-slate-200 dark:border-slate-800 text-emerald-700 dark:text-emerald-400 font-financial tabular-nums">
                          {formatMoney(totalLoanCollected)}
                        </td>
                        <td className="p-2.5 text-right border-r border-slate-200 dark:border-slate-800 font-financial tabular-nums font-bold text-rose-600 dark:text-rose-400">
                          {formatMoney(passbook.loanTerms.outstandingDue)}
                        </td>
                        <td className="p-2.5 text-center text-emerald-700 dark:text-emerald-400 font-medium font-sans text-[11px]">
                          ✓ সিলকৃত
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Passbook Official Endorsement & Verification Footer */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-between items-end text-xs text-slate-500 dark:text-slate-400 flex-wrap gap-4">
                <div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200 mb-0.5">
                    {language === 'bn' ? 'বিশেষ দ্রষ্টব্য:' : 'Important Notice:'}
                  </div>
                  <p className="text-[11px] leading-relaxed max-w-md">
                    {language === 'bn'
                      ? 'প্রতিটি কিস্তি ও সঞ্চয় জমার পর কর্মকর্তার স্বাক্ষর এবং ডিজিটাল সিল যাচাই করুন। যেকোনো অসামঞ্জস্যতায় প্রধান কার্যালয়ে অবিলম্বে যোগাযোগ করুন।'
                      : 'Please verify officer signature and stamp after every collection. Contact head office immediately for discrepancies.'}
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 border-2 border-dashed border-emerald-600 dark:border-emerald-500 rounded-full flex flex-col items-center justify-center mx-auto mb-1 text-[9px] text-emerald-700 dark:text-emerald-400 font-bold rotate-[-10deg]">
                    <span>ট-ক ২৮৪০/২১</span>
                    <span className="text-[8px] font-sans">সিলকৃত</span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {language === 'bn' ? 'সমিতির অফিশিয়াল সিল' : 'Official Seal'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          MODAL 1: ADD RECORD DIRECTLY INTO PASSBOOK LEDGER
          ======================================================== */}
      {showAddEntryModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0b1324] rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{language === 'bn' ? 'বইয়ে নতুন রেকর্ড এন্ট্রি লিখুন' : 'Add Passbook Record Entry'}</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {language === 'bn'
                    ? 'সঞ্চয় জমা, উত্তোলন ও ঋণের কিস্তি সরাসরি পাশ বইয়ের টেবিলে যুক্ত হবে।'
                    : 'Record deposit, withdrawal, and loan payment directly into passbook ledger.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddEntryModal(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEntry} className="p-4 sm:p-5 space-y-4">
              {/* Member Quick Summary */}
              <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800/60 text-xs flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">{passbook?.name}</span>
                  <span className="text-[11px] text-emerald-800 dark:text-emerald-300 font-mono font-medium">{passbook?.accountNo} • {passbook?.centerNo}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase">{language === 'bn' ? 'বর্তমান বকেয়া' : 'Current Due'}</span>
                  <span className="font-bold text-rose-600 dark:text-rose-400 font-financial tabular-nums">
                    {formatMoney(passbook?.loanTerms.outstandingDue || 0)}
                  </span>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                {/* Date */}
                <div className="sm:col-span-2">
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'bn' ? 'লেনদেনের তারিখ:' : 'Transaction Date:'}
                  </label>
                  <Input
                    type="date"
                    value={entryDate}
                    onChange={(e) => setEntryDate(e.target.value)}
                    required
                    className="font-mono text-xs"
                  />
                </div>

                {/* Savings Deposit */}
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'bn' ? 'ক. সঞ্চয় জমা (৳):' : 'Part A: Savings Deposit (৳):'}
                  </label>
                  <Input
                    type="number"
                    min="0"
                    step="10"
                    value={entryDeposit}
                    onChange={(e) => setEntryDeposit(e.target.value)}
                    required
                    className="font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-400"
                  />
                </div>

                {/* Savings Withdraw */}
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'bn' ? 'ক. সঞ্চয় উত্তোলন (৳):' : 'Part A: Savings Withdraw (৳):'}
                  </label>
                  <Input
                    type="number"
                    min="0"
                    step="10"
                    value={entryWithdraw}
                    onChange={(e) => setEntryWithdraw(e.target.value)}
                    className="font-mono text-xs text-rose-600 dark:text-rose-400"
                  />
                </div>

                {/* Savings Profit */}
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'bn' ? 'ক. সঞ্চয় সুদ/মুনাফা (৳):' : 'Part A: Savings Profit (৳):'}
                  </label>
                  <Input
                    type="number"
                    min="0"
                    step="10"
                    value={entryProfit}
                    onChange={(e) => setEntryProfit(e.target.value)}
                    className="font-mono text-xs text-amber-600 dark:text-amber-400"
                  />
                </div>

                {/* Loan Installment Paid */}
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'bn' ? 'খ. ঋণের কিস্তি আদায় (৳):' : 'Part B: Loan Installment (৳):'}
                  </label>
                  <Input
                    type="number"
                    min="0"
                    step="50"
                    value={entryLoanPaid}
                    onChange={(e) => setEntryLoanPaid(e.target.value)}
                    required
                    className="font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-400"
                  />
                </div>

                {/* Officer Signature */}
                <div className="sm:col-span-2">
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'bn' ? 'গ. যাচাই / কর্মকর্তার স্বাক্ষর:' : 'Part C: Officer Signature:'}
                  </label>
                  <Input
                    type="text"
                    value={entrySignature}
                    onChange={(e) => setEntrySignature(e.target.value)}
                    required
                    className="text-xs"
                  />
                </div>
              </div>

              {/* Live Preview of balances */}
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>{language === 'bn' ? 'নতুন সঞ্চয় স্থিতি হবে:' : 'Estimated Savings Balance:'}</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400 font-financial tabular-nums">
                    {formatMoney(
                      (passbook?.ledgerRows[0]?.savingsClosingBalance || 0) +
                        (parseFloat(entryDeposit) || 0) -
                        (parseFloat(entryWithdraw) || 0) +
                        (parseFloat(entryProfit) || 0)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>{language === 'bn' ? 'নতুন অবশিষ্ট ঋণ হবে:' : 'Estimated Remaining Due:'}</span>
                  <span className="font-bold text-rose-600 dark:text-rose-400 font-financial tabular-nums">
                    {formatMoney(
                      Math.max(
                        0,
                        (passbook?.loanTerms.outstandingDue || 0) - (parseFloat(entryLoanPaid) || 0)
                      )
                    )}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddEntryModal(false)}
                  className="cursor-pointer"
                >
                  {language === 'bn' ? 'বাতিল' : 'Cancel'}
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="gap-1.5 shadow-sm bg-emerald-700 hover:bg-emerald-800 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'রেকর্ড সংরক্ষণ ও বই আপডেট' : 'Save to Passbook'}</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 2: EDIT PASSBOOK COVER PAGE
          ======================================================== */}
      {showEditCoverModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0b1324] rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{language === 'bn' ? 'বইয়ের কভার পেজের তথ্য পূরণ / সম্পাদনা' : 'Edit Passbook Cover Details'}</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {language === 'bn'
                    ? 'শারীরিক বইয়ের কভারের ৬টি ফিল্ডের তথ্য হালনাগাদ করুন।'
                    : 'Update the 6 identity fields printed on physical passbook cover.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowEditCoverModal(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCover} className="p-4 sm:p-5 space-y-3.5 text-xs">
              {/* 1. Name */}
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'bn' ? '১. সদস্য / সদস্যার নাম (বাংলা):' : '1. Member Name (Bangla):'}
                </label>
                <Input
                  type="text"
                  value={coverName}
                  onChange={(e) => setCoverName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'bn' ? 'সদস্য / সদস্যার নাম (ইংরেজি):' : 'Member Name (English):'}
                </label>
                <Input
                  type="text"
                  value={coverNameEn}
                  onChange={(e) => setCoverNameEn(e.target.value)}
                />
              </div>

              {/* 2. Father / Husband */}
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'bn' ? '২. পিতা / স্বামীর নাম:' : '2. Father / Husband Name:'}
                </label>
                <Input
                  type="text"
                  value={coverFather}
                  onChange={(e) => setCoverFather(e.target.value)}
                  required
                />
              </div>

              {/* 3. Address */}
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'bn' ? '৩. ঠিকানা:' : '3. Address:'}
                </label>
                <Input
                  type="text"
                  value={coverAddress}
                  onChange={(e) => setCoverAddress(e.target.value)}
                  required
                />
              </div>

              {/* 4. Center No */}
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'bn' ? '৪. কেন্দ্র নং:' : '4. Center No:'}
                </label>
                <Input
                  type="text"
                  value={coverCenter}
                  onChange={(e) => setCoverCenter(e.target.value)}
                  required
                />
              </div>

              {/* 5. Savings A/C No */}
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'bn' ? '৫. সঞ্চয়ী হিসাব নং:' : '5. Savings A/C No:'}
                </label>
                <Input
                  type="text"
                  value={coverAccountNo}
                  onChange={(e) => setCoverAccountNo(e.target.value)}
                  required
                  className="font-mono font-bold"
                />
              </div>

              {/* 6. Officer Signature */}
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'bn' ? '৬. কর্মকর্তার স্বাক্ষর:' : '6. Officer Signature:'}
                </label>
                <Input
                  type="text"
                  value={coverSignature}
                  onChange={(e) => setCoverSignature(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowEditCoverModal(false)}
                  className="cursor-pointer"
                >
                  {language === 'bn' ? 'বাতিল' : 'Cancel'}
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="gap-1.5 shadow-sm bg-emerald-700 hover:bg-emerald-800 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'কভার পেজ হালনাগাদ করুন' : 'Save Cover Info'}</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 3: EDIT UPPER LOAN TERMS (Matching Screenshot 1)
          ======================================================== */}
      {showEditLoanModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0b1324] rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{language === 'bn' ? 'ভেতরের পৃষ্ঠার ঋণের তথ্য পূরণ (Loan Terms)' : 'Edit Loan Sanction Terms'}</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {language === 'bn'
                    ? 'শারীরিক বইয়ের উপরের অংশের ৮টি ঋণের শর্তাদি হালনাগাদ করুন।'
                    : 'Update the 8 loan parameters from physical passbook upper spread.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowEditLoanModal(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveLoanTerms} className="p-4 sm:p-5 space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* 1. Loan Amount */}
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'bn' ? '১. ঋণের পরিমাণ (৳):' : '1. Loan Amount (৳):'}
                  </label>
                  <Input
                    type="number"
                    value={loanAmountInput}
                    onChange={(e) => setLoanAmountInput(e.target.value)}
                    required
                    className="font-mono font-bold text-emerald-700 dark:text-emerald-400"
                  />
                </div>

                {/* 2. Disburse Date */}
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'bn' ? '২. বিতরণের তারিখ:' : '2. Disburse Date:'}
                  </label>
                  <Input
                    type="date"
                    value={disburseDateInput}
                    onChange={(e) => setDisburseDateInput(e.target.value)}
                    required
                    className="font-mono text-xs"
                  />
                </div>

                {/* 3. Installments Count */}
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'bn' ? '৩. কিস্তির সংখ্যা:' : '3. Total Installments:'}
                  </label>
                  <Input
                    type="number"
                    value={installmentCountInput}
                    onChange={(e) => setInstallmentCountInput(e.target.value)}
                    required
                    className="font-mono"
                  />
                </div>

                {/* 4. Form No */}
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'bn' ? '৪. ঋণের ফরম নং:' : '4. Loan Form No:'}
                  </label>
                  <Input
                    type="text"
                    value={formNoInput}
                    onChange={(e) => setFormNoInput(e.target.value)}
                    required
                    className="font-mono"
                  />
                </div>

                {/* 5. Per Installment */}
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'bn' ? '৫. প্রতি কিস্তি (৳):' : '5. Per Installment (৳):'}
                  </label>
                  <Input
                    type="number"
                    value={perInstallmentInput}
                    onChange={(e) => setPerInstallmentInput(e.target.value)}
                    required
                    className="font-mono font-semibold"
                  />
                </div>

                {/* 7. Weekly Installment */}
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'bn' ? '৭. সাপ্তাহিক কিস্তি (৳):' : '7. Weekly Installment (৳):'}
                  </label>
                  <Input
                    type="number"
                    value={weeklyInstallmentInput}
                    onChange={(e) => setWeeklyInstallmentInput(e.target.value)}
                    required
                    className="font-mono font-semibold"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowEditLoanModal(false)}
                  className="cursor-pointer"
                >
                  {language === 'bn' ? 'বাতিল' : 'Cancel'}
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="gap-1.5 shadow-sm bg-emerald-700 hover:bg-emerald-800 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'ঋণের শর্তাদি সংরক্ষণ করুন' : 'Save Loan Terms'}</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
