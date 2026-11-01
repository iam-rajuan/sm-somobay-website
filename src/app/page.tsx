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
  Wallet,
  Landmark,
  BadgeAlert,
  Coins,
  Plus,
  Search,
  Receipt,
  UserPlus,
  X,
  Printer,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/LanguageContext';

export default function HomePage() {
  const { language, formatMoney, formatNum } = useLanguage();

  // Common Banking Operations state (matching Dashboard Screenshot 2)
  const [activeOp, setActiveOp] = useState<'none' | 'collection' | 'installment' | 'new_member' | 'disburse' | 'report'>('none');
  const [opAccountNo, setOpAccountNo] = useState('SM-2840-001');
  const [opMemberVerified, setOpMemberVerified] = useState(true);
  const [opSavingsDeposit, setOpSavingsDeposit] = useState('200');
  const [opLoanInstallment, setOpLoanInstallment] = useState('1250');
  const [opDpsDeposit, setOpDpsDeposit] = useState('500');
  const [opToastMsg, setOpToastMsg] = useState<string | null>(null);

  // New Member state
  const [nmName, setNmName] = useState('মোছাঃ নাসিমা আক্তার');
  const [nmFather, setNmFather] = useState('মোঃ করিম সিকদার');
  const [nmAddress, setNmAddress] = useState('এলেঙ্গা বাজার, কালিহাতী, টাঙ্গাইল');
  const [nmCenter, setNmCenter] = useState('কেন্দ্র নং- ০১ (এলেঙ্গা সমিতি)');
  const [nmAcc, setNmAcc] = useState('SM-2840-004');
  const [nmOfficer, setNmOfficer] = useState('স্বাক্ষরিত (মাঠ কর্মকর্তা)');

  // Loan Disbursement state (matching Screenshot 1: Step 2 Loan Scheme, Tenure & Calculation)
  const [disburseDate, setDisburseDate] = useState('2026-10-31');
  const [disburseScheme, setDisburseScheme] = useState('Weekly');
  const [disbursePurpose, setDisbursePurpose] = useState('General Micro Business');
  const [disbursePrincipal, setDisbursePrincipal] = useState(50000);
  const [disburseProfitPct, setDisburseProfitPct] = useState(15);
  const [disburseTenureWeeks, setDisburseTenureWeeks] = useState(46);

  const disburseProfitAmount = Math.round((disbursePrincipal * disburseProfitPct) / 100);
  const disburseTotalRepayable = disbursePrincipal + disburseProfitAmount;
  const disburseInstallmentAmount = Math.round(disburseTotalRepayable / disburseTenureWeeks);

  const showOpToast = (msg: string) => {
    setOpToastMsg(msg);
    setTimeout(() => setOpToastMsg(null), 4000);
  };

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
    <div className="pb-0 bg-white dark:bg-[#060911] text-slate-900 dark:text-slate-100 transition-colors">
      {/* 1. Hero Section */}
      <section className="bg-slate-50 dark:bg-[#0b1324]/50 border-b border-slate-200 dark:border-slate-800 py-16 sm:py-20 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-5">
            {/* Govt approval badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-medium shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>
                {language === 'bn'
                  ? 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত • রেজিঃ ট-ক ২৮৪০/২১'
                  : 'Approved by Govt. of Bangladesh • Reg: T-K 2840/21'}
              </span>
            </div>

            <div className="flex items-center justify-center gap-2 pt-1">
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-700 dark:text-emerald-400">
                {language === 'bn' ? 'সোশ্যাল ম্যানেজমেন্ট' : 'Social Management'}
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
                {language === 'bn' ? 'প্রধান কার্যালয়: এলেঙ্গা, কালিহাতী' : 'Head Office: Elenga, Kalihati'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
              {language === 'bn' ? (
                <>
                  এস, এম ক্ষুদ্র সঞ্চয় ও ঋণদান <br className="hidden sm:inline" />
                  <span className="text-emerald-700 dark:text-emerald-400">সমবায় সমিতি লিঃ</span>
                </>
              ) : (
                <>
                  S.M. Khudra Sanchay O Rindan <br className="hidden sm:inline" />
                  <span className="text-emerald-700 dark:text-emerald-400">Samabay Samity Limited</span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
              {language === 'bn' ? (
                <>
                  সদস্যদের অর্থনৈতিক মুক্তি ও আত্মকর্মসংস্থানে বিশ্বস্ত প্রতিষ্ঠান। ১০০% স্বচ্ছ ডিজিটাল পাশ বই, মাঠকর্মী সংগ্রহ ও নির্ভরযোগ্য আধুনিক সমবায় ব্যাংকিং সেবা।
                </>
              ) : (
                <>
                  Empowering members through transparent cooperative banking, 100% digital savings & loan passbooks, and responsible financial management.
                </>
              )}
            </p>

            {/* Direct Action CTAs */}
            <div className="flex flex-wrap justify-center items-center gap-3 pt-3">
              <Link href="/member">
                <Button size="lg" className="gap-2 shadow-sm font-semibold">
                  <ReceiptText className="w-4.5 h-4.5" />
                  <span>{language === 'bn' ? 'সঞ্চয় ও ঋণের ডিজিটাল পাশ বই' : 'Digital Passbook Portal'}</span>
                </Button>
              </Link>

              <a href="http://localhost:3001" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="gap-2 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{language === 'bn' ? 'কর্মকর্তা ও মাঠকর্মী ERP' : 'Staff ERP Portal'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>

          {/* Key 8 Institutional Financial Funds (Directly Matching Dashboard Screenshot 2) */}
          <div className="mt-12 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium px-1">
              <span>{language === 'bn' ? 'সমিতির কেন্দ্রীয় তহবিল ও পোর্টফোলিও স্থিতি:' : 'Central Reserves & Fund Balances:'}</span>
              <span className="font-mono text-emerald-700 dark:text-emerald-400 font-semibold">{language === 'bn' ? 'লাইভ অডিট ট্রেইল' : 'Live Audit Trail'}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-3.5">
              {[
                {
                  label: language === 'bn' ? 'হাতে নগদ ও ব্যাংক রিভার্ভ' : 'Cash in Hand & Reserve',
                  value: 4215000,
                  tag: language === 'bn' ? 'রিজার্ভ সক্রিয়' : 'Reserve Active',
                  tagColor: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800',
                  icon: Wallet,
                },
                {
                  label: language === 'bn' ? 'মোট বিতরণকৃত ঋণ স্থিতি' : 'Total Loan Outstanding',
                  value: 12850000,
                  tag: language === 'bn' ? 'চলতি পোর্টফোলিও' : 'Current Portfolio',
                  tagColor: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-900',
                  icon: TrendingUp,
                },
                {
                  label: language === 'bn' ? 'সাধারণ সঞ্চয় আমানত' : 'General Savings Deposit',
                  value: 8450000,
                  tag: language === 'bn' ? '১,১৯৫ সদস্য' : '1,195 Members',
                  tagColor: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
                  icon: PiggyBank,
                },
                {
                  label: language === 'bn' ? 'বিশেষ সঞ্চয় তহবিল' : 'Special Savings Deposit',
                  value: 125000,
                  tag: language === 'bn' ? 'ঐচ্ছিক সঞ্চয়' : 'Voluntary Savings',
                  tagColor: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800',
                  icon: Coins,
                },
                {
                  label: language === 'bn' ? 'ডিপিএস আমানত তহবিল' : 'DPS Deposit Fund',
                  value: 3420000,
                  tag: language === 'bn' ? 'মুনাফা: ৳১.৮৪ লাখ' : 'Profit: ৳1.84L',
                  tagColor: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800',
                  icon: Landmark,
                },
                {
                  label: language === 'bn' ? 'এফডিআর স্থায়ী আমানত' : 'Fixed Deposit (FDR) Fund',
                  value: 18200000,
                  tag: language === 'bn' ? 'মুনাফা: ৳১৪.২ লাখ' : 'Profit: ৳14.2L',
                  tagColor: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800',
                  icon: Building2,
                },
                {
                  label: language === 'bn' ? 'শেয়ার মূলধন (SHARE)' : 'Share Capital (SHARE)',
                  value: 850000,
                  tag: language === 'bn' ? 'পরিশোধিত ইকুইটি' : 'Paid-up Equity',
                  tagColor: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800',
                  icon: Users,
                },
                {
                  label: language === 'bn' ? 'অর্জিত ঋণ মুনাফা' : 'Earned Loan Profit',
                  value: 1542000,
                  tag: language === 'bn' ? 'পরিচালন উদ্বৃত্ত' : 'Operating Reserve',
                  tagColor: 'bg-teal-50 text-teal-800 border-teal-200 dark:bg-teal-950 dark:text-teal-300 dark:border-teal-800',
                  icon: BadgePercent,
                },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={i}
                    className="bg-white dark:bg-[#0b1324] border border-slate-200/90 dark:border-slate-800 rounded-lg p-3.5 sm:p-4 shadow-xs transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">{stat.label}</span>
                        <Icon className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 shrink-0" />
                      </div>
                      <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-financial tabular-nums tracking-tight">
                        {formatMoney(stat.value)}
                      </div>
                    </div>
                    <div className="mt-2.5">
                      <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-medium border ${stat.tagColor}`}>
                        {stat.tag}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          1.5 COMMON BANKING OPERATIONS (DIRECT REPLICA OF DASHBOARD)
          ======================================================== */}
      <section className="py-6 sm:py-8 bg-slate-50 dark:bg-[#0b1324]/40 border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {/* Toast Notification */}
          {opToastMsg && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs rounded-lg flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="font-medium">{opToastMsg}</span>
              </div>
              <button
                type="button"
                onClick={() => setOpToastMsg(null)}
                className="text-emerald-600 hover:text-emerald-900 dark:hover:text-emerald-300 p-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Operational Toolbar Matching Screenshot 2 */}
          <div className="bg-white dark:bg-[#0b1324] border border-slate-200 dark:border-slate-800 rounded-lg p-3 sm:p-4 shadow-xs">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 whitespace-nowrap">
                  {language === 'bn' ? 'সাধারণ ব্যাংকিং অপারেশন:' : 'COMMON BANKING OPERATIONS:'}
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  {language === 'bn' ? 'লাইভ সিস্টেম' : 'Live Gateway'}
                </span>
              </div>

              {/* 5 Operation Action Tabs (Highlighted in red box in Screenshot 2) */}
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <Button
                  variant={activeOp === 'collection' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setActiveOp(activeOp === 'collection' ? 'none' : 'collection')}
                  className={`gap-1.5 text-xs font-medium cursor-pointer transition ${
                    activeOp === 'collection' ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs' : ''
                  }`}
                >
                  <Receipt className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{language === 'bn' ? 'কমন কালেকশন স্লিপ' : 'Common Collection Slip'}</span>
                </Button>

                <Button
                  variant={activeOp === 'installment' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setActiveOp(activeOp === 'installment' ? 'none' : 'installment')}
                  className={`gap-1.5 text-xs font-medium cursor-pointer transition ${
                    activeOp === 'installment' ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs' : ''
                  }`}
                >
                  <Coins className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>{language === 'bn' ? 'কিস্তি আদায়' : 'Installment Collection'}</span>
                </Button>

                <Button
                  variant={activeOp === 'new_member' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setActiveOp(activeOp === 'new_member' ? 'none' : 'new_member')}
                  className={`gap-1.5 text-xs font-medium cursor-pointer transition ${
                    activeOp === 'new_member' ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs' : ''
                  }`}
                >
                  <Users className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>{language === 'bn' ? 'নতুন সদস্য ভর্তি' : 'New Member'}</span>
                </Button>

                <Button
                  variant={activeOp === 'disburse' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setActiveOp(activeOp === 'disburse' ? 'none' : 'disburse')}
                  className={`gap-1.5 text-xs font-medium cursor-pointer transition ${
                    activeOp === 'disburse' ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs' : ''
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>{language === 'bn' ? 'ঋণ বিতরণ' : 'Disburse Loan'}</span>
                </Button>

                <Button
                  variant={activeOp === 'report' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setActiveOp(activeOp === 'report' ? 'none' : 'report')}
                  className={`gap-1.5 text-xs font-medium cursor-pointer transition ${
                    activeOp === 'report' ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs' : ''
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                  <span>{language === 'bn' ? 'কালেকশন রিপোর্ট' : 'Collection Report'}</span>
                </Button>
              </div>
            </div>

            {/* PANEL 1: COMMON COLLECTION SLIP (With Gatekeeper Member Verification) */}
            {activeOp === 'collection' && (
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>{language === 'bn' ? 'মাঠ ও কাউন্টার কমন কালেকশন স্লিপ' : 'Field & Counter Collection Slip'}</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveOp('none')}
                    className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  >
                    ✕ {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
                  </button>
                </div>

                {/* Gatekeeper Member Verification (Step 1 from Screenshot 1) */}
                <div className="p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-lg border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    {language === 'bn' ? 'ধাপ ১: সদস্য গেটকিপার অনুসন্ধান ও যাচাই' : 'STEP 1: MEMBER GATEKEEPER VERIFICATION'}
                  </div>
                  <div className="flex items-center gap-2 max-w-md">
                    <div className="relative flex-1">
                      <Input
                        type="text"
                        placeholder="SM-2840-001"
                        value={opAccountNo}
                        onChange={(e) => setOpAccountNo(e.target.value)}
                        className="font-mono text-xs pl-8 uppercase"
                      />
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
                    </div>
                    <Button
                      size="sm"
                      onClick={() => setOpMemberVerified(true)}
                      className="bg-emerald-700 hover:bg-emerald-800 text-xs font-semibold cursor-pointer"
                    >
                      {language === 'bn' ? 'যাচাই' : 'Verify'}
                    </Button>
                  </div>

                  {opMemberVerified && (
                    <div className="p-3 bg-white dark:bg-[#0b1324] rounded-md border border-emerald-200 dark:border-emerald-800/80 space-y-2">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-white text-xs">
                            {language === 'bn' ? 'মোঃ আব্দুল করিম (Md. Abdul Karim)' : 'Md. Abdul Karim'}
                          </span>
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold">
                            SM-2840-001
                          </span>
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-50 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                            {language === 'bn' ? 'সক্রিয়' : 'Active'}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          {language === 'bn' ? 'কেন্দ্র: এলেঙ্গা ১ নং কেন্দ্র (রবিবার)' : 'Center: Elenga Center #1 (Sunday)'}
                        </span>
                      </div>

                      {/* Balances Strip matching Screenshot 1 */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-slate-100 dark:border-slate-800 text-xs">
                        <div className="p-2 rounded bg-slate-50 dark:bg-slate-900/80">
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase">{language === 'bn' ? 'সাধারণ সঞ্চয়' : 'General Savings'}</span>
                          <span className="font-financial tabular-nums font-bold text-slate-900 dark:text-white">{formatMoney(22500)}</span>
                        </div>
                        <div className="p-2 rounded bg-slate-50 dark:bg-slate-900/80">
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase">{language === 'bn' ? 'বিশেষ সঞ্চয়' : 'Special Savings'}</span>
                          <span className="font-financial tabular-nums font-bold text-slate-900 dark:text-white">{formatMoney(3200)}</span>
                        </div>
                        <div className="p-2 rounded bg-slate-50 dark:bg-slate-900/80">
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase">{language === 'bn' ? 'ঋণ বকেয়া' : 'Loan Due'}</span>
                          <span className="font-financial tabular-nums font-bold text-rose-600 dark:text-rose-400">{formatMoney(57500)}</span>
                        </div>
                        <div className="p-2 rounded bg-slate-50 dark:bg-slate-900/80">
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase">{language === 'bn' ? 'ডিপিএস ও শেয়ার' : 'DPS & Share'}</span>
                          <span className="font-financial tabular-nums font-bold text-emerald-700 dark:text-emerald-400">{formatMoney(25000)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Step 2: Collection Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                      {language === 'bn' ? '১. সাধারণ সঞ্চয় জমা (৳):' : '1. General Savings Deposit (৳):'}
                    </label>
                    <Input
                      type="number"
                      value={opSavingsDeposit}
                      onChange={(e) => setOpSavingsDeposit(e.target.value)}
                      className="font-mono font-semibold text-emerald-700 dark:text-emerald-400"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                      {language === 'bn' ? '২. ক্ষুদ্রঋণ কিস্তি আদায় (৳):' : '2. Loan Installment Paid (৳):'}
                    </label>
                    <Input
                      type="number"
                      value={opLoanInstallment}
                      onChange={(e) => setOpLoanInstallment(e.target.value)}
                      className="font-mono font-semibold text-emerald-700 dark:text-emerald-400"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                      {language === 'bn' ? '৩. ডিপিএস মাসিক কিস্তি (৳):' : '3. DPS Monthly Deposit (৳):'}
                    </label>
                    <Input
                      type="number"
                      value={opDpsDeposit}
                      onChange={(e) => setOpDpsDeposit(e.target.value)}
                      className="font-mono font-semibold text-blue-600 dark:text-blue-400"
                    />
                  </div>
                </div>

                {/* Total and Submit */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                  <div className="text-xs">
                    <span className="text-slate-500 dark:text-slate-400 block">{language === 'bn' ? 'মোট সংগৃহীত অংক:' : 'Total Collection Slip Amount:'}</span>
                    <span className="text-lg font-bold text-emerald-700 dark:text-emerald-400 font-financial tabular-nums">
                      {formatMoney(
                        (parseFloat(opSavingsDeposit) || 0) +
                          (parseFloat(opLoanInstallment) || 0) +
                          (parseFloat(opDpsDeposit) || 0)
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => {
                        showOpToast(
                          language === 'bn'
                            ? `সফল! ৳${formatNum(
                                (parseFloat(opSavingsDeposit) || 0) +
                                  (parseFloat(opLoanInstallment) || 0) +
                                  (parseFloat(opDpsDeposit) || 0)
                              )} সফলভাবে আদায় হয়েছে এবং ডিজিটাল পাশ বইয়ে লিপিবদ্ধ হয়েছে।`
                            : 'Collection saved and recorded in member passbook!'
                        );
                      }}
                      className="bg-emerald-700 hover:bg-emerald-800 text-xs font-semibold cursor-pointer shadow-xs gap-1.5"
                    >
                      <Receipt className="w-3.5 h-3.5" />
                      <span>{language === 'bn' ? 'আদায় সম্পন্ন ও রশিদ মুদ্রণ' : 'Record & Print Receipt'}</span>
                    </Button>
                    <Link href="/member">
                      <Button variant="outline" size="sm" className="text-xs font-medium cursor-pointer gap-1">
                        <span>{language === 'bn' ? 'সদস্যের পাশ বই খুলুন →' : 'View in Passbook →'}</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* PANEL 2: INSTALLMENT COLLECTION */}
            {activeOp === 'installment' && (
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Coins className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>{language === 'bn' ? 'দ্রুত কিস্তি আদায় স্লিপ' : 'Fast Loan Installment Collection'}</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveOp('none')}
                    className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  >
                    ✕ {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                      {language === 'bn' ? 'সদস্য হিসাব নং:' : 'Member A/C No:'}
                    </label>
                    <Input
                      type="text"
                      value={opAccountNo}
                      onChange={(e) => setOpAccountNo(e.target.value)}
                      className="font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                      {language === 'bn' ? 'কিস্তির অংক (৳):' : 'Installment Amount (৳):'}
                    </label>
                    <Input
                      type="number"
                      value={opLoanInstallment}
                      onChange={(e) => setOpLoanInstallment(e.target.value)}
                      className="font-mono font-semibold text-emerald-700 dark:text-emerald-400"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      size="sm"
                      onClick={() => {
                        showOpToast(
                          language === 'bn'
                            ? `কিস্তি ৳${formatNum(opLoanInstallment)} সফলভাবে গৃহীত হয়েছে!`
                            : `Installment ৳${opLoanInstallment} collected successfully!`
                        );
                      }}
                      className="w-full bg-emerald-700 hover:bg-emerald-800 text-xs font-semibold cursor-pointer shadow-xs"
                    >
                      {language === 'bn' ? 'কিস্তি জমা করুন' : 'Submit Installment'}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* PANEL 3: NEW MEMBER ADMISSION (With 6 Cover Page Fields) */}
            {activeOp === 'new_member' && (
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      <span>{language === 'bn' ? 'নতুন সদস্য ভর্তি ও পাশ বই ইস্যু' : 'New Member Registration & Passbook Issuance'}</span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {language === 'bn'
                        ? 'শারীরিক বইয়ের কভারের ৬টি ফিল্ডের তথ্য পূরণ করে নতুন সঞ্চয়ী হিসাব ও ডিজিটাল পাশ বই তৈরি করুন।'
                        : 'Register member by filling the 6 passbook cover fields.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveOp('none')}
                    className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  >
                    ✕ {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                      {language === 'bn' ? '১. সদস্য / সদস্যার নাম:' : '1. Member Name:'}
                    </label>
                    <Input
                      type="text"
                      value={nmName}
                      onChange={(e) => setNmName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                      {language === 'bn' ? '২. পিতা / স্বামীর নাম:' : '2. Father / Husband Name:'}
                    </label>
                    <Input
                      type="text"
                      value={nmFather}
                      onChange={(e) => setNmFather(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                      {language === 'bn' ? '৩. ঠিকানা:' : '3. Address:'}
                    </label>
                    <Input
                      type="text"
                      value={nmAddress}
                      onChange={(e) => setNmAddress(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                      {language === 'bn' ? '৪. কেন্দ্র নং:' : '4. Center No:'}
                    </label>
                    <Input
                      type="text"
                      value={nmCenter}
                      onChange={(e) => setNmCenter(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                      {language === 'bn' ? '৫. সঞ্চয়ী হিসাব নং:' : '5. Savings A/C No:'}
                    </label>
                    <Input
                      type="text"
                      value={nmAcc}
                      onChange={(e) => setNmAcc(e.target.value)}
                      className="font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                      {language === 'bn' ? '৬. কর্মকর্তার স্বাক্ষর:' : '6. Officer Signature:'}
                    </label>
                    <Input
                      type="text"
                      value={nmOfficer}
                      onChange={(e) => setNmOfficer(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <Button
                    size="sm"
                    onClick={() => {
                      showOpToast(
                        language === 'bn'
                          ? `নতুন সদস্য ${nmName} (হিসাব নং: ${nmAcc}) সফলভাবে যুক্ত হয়েছে এবং ডিজিটাল পাশ বই প্রস্তুত!`
                          : `Member ${nmName} (${nmAcc}) successfully registered!`
                      );
                    }}
                    className="bg-emerald-700 hover:bg-emerald-800 text-xs font-semibold cursor-pointer shadow-xs gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{language === 'bn' ? 'সদস্য ভর্তি সম্পন্ন ও পাশ বই তৈরি' : 'Register & Issue Passbook'}</span>
                  </Button>
                </div>
              </div>
            )}

            {/* PANEL 4: DISBURSE LOAN (EXACT REPLICA OF SCREENSHOT 1!) */}
            {activeOp === 'disburse' && (
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">
                      {language === 'bn' ? 'এস, এম ক্ষুদ্র সঞ্চয় ও ঋণদান সমবায় সমিতি লিঃ' : 'S.M. KHUDRA SANCHAY O RINDAN SAMABAY SAMITY LIMITED'}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>{language === 'bn' ? 'ঋণ মঞ্জুর ও বিতরণ (Disburse & Approve New Loan)' : 'Disburse & Approve New Loan'}</span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {language === 'bn'
                        ? 'দ্বিমুখী মুনাফা হিসাব ও আসল-মুনাফা সমবায় কিস্তি নির্ধারণ।'
                        : 'Bidirectional profit calculation and principal-amortization loan disbursement.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveOp('none')}
                    className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  >
                    ✕ {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
                  </button>
                </div>

                {/* Step 1: Member Gatekeeper Verification (Exact Screenshot 1) */}
                <div className="p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-lg border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    {language === 'bn' ? 'ধাপ ১: সদস্য গেটকিপার যাচাইকরণ' : 'STEP 1: MEMBER GATEKEEPER VERIFICATION'}
                  </div>

                  <div className="flex items-center gap-2 max-w-md">
                    <div className="relative flex-1">
                      <Input
                        type="text"
                        placeholder="SM-2840-001"
                        value={opAccountNo}
                        onChange={(e) => setOpAccountNo(e.target.value)}
                        className="font-mono text-xs pl-8 uppercase"
                      />
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
                    </div>
                    <Button
                      size="sm"
                      onClick={() => setOpMemberVerified(true)}
                      className="bg-emerald-700 hover:bg-emerald-800 text-xs font-semibold cursor-pointer"
                    >
                      {language === 'bn' ? 'যাচাই' : 'Verify'}
                    </Button>
                  </div>

                  {opMemberVerified && (
                    <div className="p-3 bg-white dark:bg-[#0b1324] rounded-md border border-emerald-200 dark:border-emerald-800/80 space-y-2">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-white text-xs">
                            {language === 'bn' ? 'মোঃ আব্দুল করিম (Md. Abdul Karim)' : 'Md. Abdul Karim'}
                          </span>
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold">
                            SM-2840-001
                          </span>
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-50 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                            {language === 'bn' ? 'সক্রিয়' : 'Active'}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          {language === 'bn' ? 'কেন্দ্র: এলেঙ্গা ১ নং কেন্দ্র (রবিবার)' : 'Center: Elenga Center #1 (Sunday)'} • 01711-223344
                        </span>
                      </div>

                      {/* Balances Strip matching Screenshot 1 */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-slate-100 dark:border-slate-800 text-xs">
                        <div className="p-2 rounded bg-slate-50 dark:bg-slate-900/80">
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase">{language === 'bn' ? 'সাধারণ সঞ্চয়' : 'General Savings'}</span>
                          <span className="font-financial tabular-nums font-bold text-slate-900 dark:text-white">{formatMoney(22500)}</span>
                        </div>
                        <div className="p-2 rounded bg-slate-50 dark:bg-slate-900/80">
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase">{language === 'bn' ? 'বিশেষ সঞ্চয়' : 'Special Savings'}</span>
                          <span className="font-financial tabular-nums font-bold text-slate-900 dark:text-white">{formatMoney(3200)}</span>
                        </div>
                        <div className="p-2 rounded bg-slate-50 dark:bg-slate-900/80">
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase">{language === 'bn' ? 'ঋণ বকেয়া' : 'Loan Due'}</span>
                          <span className="font-financial tabular-nums font-bold text-rose-600 dark:text-rose-400">{formatMoney(57500)}</span>
                        </div>
                        <div className="p-2 rounded bg-slate-50 dark:bg-slate-900/80">
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase">{language === 'bn' ? 'ডিপিএস ও শেয়ার' : 'DPS & Share'}</span>
                          <span className="font-financial tabular-nums font-bold text-emerald-700 dark:text-emerald-400">{formatMoney(25000)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Step 2: Loan Scheme, Tenure & Calculation (Exact Screenshot 1) */}
                <div className="p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-lg border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>{language === 'bn' ? 'ধাপ ২: ঋণ স্কিম, মেয়াদ ও কিস্তি হিসাব' : 'Step 2: Loan Scheme, Tenure & Calculation'}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                      {language === 'bn' ? 'সাপ্তাহিক স্কিম' : 'Weekly Scheme'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    <div>
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                        {language === 'bn' ? 'বিতরণের তারিখ *' : 'Disbursement Date *'}
                      </label>
                      <Input
                        type="date"
                        value={disburseDate}
                        onChange={(e) => setDisburseDate(e.target.value)}
                        className="font-mono text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                        {language === 'bn' ? 'ঋণের ধরন / স্কিম *' : 'Loan Scheme *'}
                      </label>
                      <select
                        value={disburseScheme}
                        onChange={(e) => setDisburseScheme(e.target.value)}
                        className="w-full h-9 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1 text-xs text-slate-900 dark:text-white"
                      >
                        <option value="Weekly">Weekly (সাপ্তাহিক)</option>
                        <option value="Daily">Daily (দৈনিক)</option>
                        <option value="Monthly">Monthly (মাসিক)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                        {language === 'bn' ? 'ঋণের উদ্দেশ্য / খাত *' : 'Loan Purpose / Category *'}
                      </label>
                      <Input
                        type="text"
                        value={disbursePurpose}
                        onChange={(e) => setDisbursePurpose(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                        {language === 'bn' ? 'আসল ঋণের পরিমাণ (P) *' : 'Principal Amount (P) *'}
                      </label>
                      <Input
                        type="number"
                        step="5000"
                        value={disbursePrincipal}
                        onChange={(e) => setDisbursePrincipal(parseFloat(e.target.value) || 0)}
                        className="font-mono font-bold text-emerald-700 dark:text-emerald-400"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                        {language === 'bn' ? 'মুনাফা (%) | লাভ (৳)' : 'Profit (%) | Interest (৳)'}
                      </label>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          value={disburseProfitPct}
                          onChange={(e) => setDisburseProfitPct(parseFloat(e.target.value) || 0)}
                          className="w-20 font-mono"
                        />
                        <div className="flex-1 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded font-financial tabular-nums text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center">
                          {formatMoney(disburseProfitAmount)}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                        {language === 'bn' ? 'কিস্তির সংখ্যা *' : 'Number of Installments *'}
                      </label>
                      <Input
                        type="number"
                        value={disburseTenureWeeks}
                        onChange={(e) => setDisburseTenureWeeks(parseInt(e.target.value, 10) || 1)}
                        className="font-mono"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                        {language === 'bn' ? 'প্রতি কিস্তির অংক' : 'Installment Amount'}
                      </label>
                      <div className="px-3 py-2 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded font-financial tabular-nums text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center">
                        {formatMoney(disburseInstallmentAmount)}
                      </div>
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                        {language === 'bn' ? 'মোট পরিশোধযোগ্য (P + I)' : 'Total Repayable (P + I)'}
                      </label>
                      <div className="px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded font-financial tabular-nums text-xs font-bold text-slate-900 dark:text-white flex items-center">
                        {formatMoney(disburseTotalRepayable)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <Button
                      size="sm"
                      onClick={() => {
                        showOpToast(
                          language === 'bn'
                            ? `সফল! ৳${formatNum(disbursePrincipal)} ঋণ বিতরণ অনুমোদন হয়েছে এবং সদস্যের পাশ বইয়ের শীর্ষ টেবিলে হালনাগাদ সম্পন্ন!`
                            : `Loan of ৳${disbursePrincipal} approved and disbursed into passbook!`
                        );
                      }}
                      className="bg-emerald-700 hover:bg-emerald-800 text-xs font-semibold cursor-pointer shadow-xs gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{language === 'bn' ? 'বিতরণ ও অনুমোদন নিশ্চিত করুন' : 'Confirm Disbursement'}</span>
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* PANEL 5: COLLECTION REPORT & AUDIT TRAIL (Matching Bottom Half of Screenshot 2) */}
            {activeOp === 'report' && (
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    <span>{language === 'bn' ? 'দৈনিক ভাউচার অডিট ও কালেকশন রিপোর্ট' : 'Recent Voucher Audit Trail & Report'}</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveOp('none')}
                    className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  >
                    ✕ {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
                  </button>
                </div>

                <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-lg">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 dark:bg-slate-900 font-semibold border-b border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400">
                      <tr>
                        <th className="p-2.5">ভাউচার নং</th>
                        <th className="p-2.5">তারিখ</th>
                        <th className="p-2.5">হিসাব খাত ও বিবরণ</th>
                        <th className="p-2.5">ধরন</th>
                        <th className="p-2.5 text-right">পরিমাণ (৳)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                      <tr>
                        <td className="p-2.5 text-slate-700 dark:text-slate-300 font-semibold">VCH-1001</td>
                        <td className="p-2.5 text-slate-500">28 Oct 2026</td>
                        <td className="p-2.5 text-slate-800 dark:text-slate-200 font-sans">
                          Electricity & Utility Bill <br /><span className="text-[10px] text-slate-400">General Ledger</span>
                        </td>
                        <td className="p-2.5">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-sans">
                            • Debit (Expense)
                          </span>
                        </td>
                        <td className="p-2.5 text-right text-rose-600 dark:text-rose-400 font-bold font-financial tabular-nums">
                          - ৳ ৩,২০০
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2.5 text-slate-700 dark:text-slate-300 font-semibold">VCH-1002</td>
                        <td className="p-2.5 text-slate-500">28 Oct 2026</td>
                        <td className="p-2.5 text-slate-800 dark:text-slate-200 font-sans">
                          Member Admission & Passbook Fee <br /><span className="text-[10px] text-slate-400">মোঃ আব্দুল করিম</span>
                        </td>
                        <td className="p-2.5">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-sans">
                            • Credit (Income)
                          </span>
                        </td>
                        <td className="p-2.5 text-right text-emerald-700 dark:text-emerald-400 font-bold font-financial tabular-nums">
                          + ৳ ১০০
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. Core Financial Schemes */}
      <section id="schemes" className="py-16 sm:py-20 bg-white dark:bg-[#060911] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2.5">
            <Badge variant="success" className="text-xs">
              {language === 'bn' ? 'আমানত ও ঋণ সেবাসমূহ' : 'Savings & Credit Schemes'}
            </Badge>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              {language === 'bn' ? 'সমবায় সমিতির মূল আর্থিক সেবাসমূহ' : 'Core Financial Products & Services'}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {language === 'bn'
                ? 'স্থানীয় ক্ষুদ্র ব্যবসায়ী, কৃষক, দিনমজুর ও কর্মজীবীদের আর্থিক নিরাপত্তা ও মূলধন গঠনে প্রণীত সুশৃঙ্খল সমবায় প্রকল্প।'
                : 'Designed for local entrepreneurs, merchants, and working families to build wealth and access responsible cooperative credit.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Scheme 1: General Savings */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-10 h-10 rounded-md bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-2">
                  <PiggyBank className="w-5 h-5" />
                </div>
                <CardTitle>
                  {language === 'bn' ? 'সাধারণ দৈনিক ও সাপ্তাহিক সঞ্চয়' : 'Daily & Weekly General Savings'}
                </CardTitle>
                <CardDescription>
                  {language === 'bn' ? 'দৈনন্দিন ক্ষুদ্র আমানত ও মুনাফা' : 'Flexible Micro-Deposits with Annual Dividend'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3.5 text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>
                  {language === 'bn'
                    ? 'প্রতিদিন বা প্রতি সপ্তাহে ক্ষুদ্র সঞ্চয় জমা করার নির্ভরযোগ্য সুযোগ। মাঠ কর্মকর্তার মাধ্যমে ডিজিটাল রিসিট ও সরাসরি এসএমএস নিশ্চিতকরণ।'
                    : 'Reliable doorstep savings collection with printed receipts and real-time SMS alerts after each field deposit.'}
                </p>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{language === 'bn' ? 'দৈনিক ২০ টাকা হতে যেকোন পরিমাণ সঞ্চয়' : 'Flexible deposits starting from ৳ 20 daily'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{language === 'bn' ? 'জরুরী প্রয়োজনে তাৎক্ষণিক উত্তোলন সুবিধা' : 'Instant on-demand withdrawals in emergencies'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{language === 'bn' ? 'বাৎসরিক লাভ/মুনাফা বণ্টন সুবিধা' : 'Competitive annual profit sharing & dividends'}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Scheme 2: DPS */}
            <Card className="hover:shadow-md transition-shadow border-emerald-300 dark:border-emerald-700 relative">
              <div className="absolute top-3 right-3">
                <span className="px-2 py-0.5 rounded bg-emerald-700 text-white text-[10px] font-medium">
                  {language === 'bn' ? 'জনপ্রিয়' : 'Popular'}
                </span>
              </div>
              <CardHeader>
                <div className="w-10 h-10 rounded-md bg-emerald-700 text-white flex items-center justify-center mb-2 shadow-xs">
                  <BadgePercent className="w-5 h-5" />
                </div>
                <CardTitle>
                  {language === 'bn' ? 'ডিপিএস মেয়াদী আমানত (DPS)' : 'Deposit Pension Scheme (DPS)'}
                </CardTitle>
                <CardDescription>
                  {language === 'bn' ? '১ হতে ১০ বছর মেয়াদী সঞ্চয় স্কিম' : 'Fixed Monthly Savings (1 to 10 Years)'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3.5 text-xs sm:text-[13px] text-slate-600 dark:text-slate-300">
                <p className="leading-relaxed">
                  {language === 'bn'
                    ? 'মাসিক ৫০০ টাকা হতে ৫,০০০ টাকা কিস্তিতে ১ থেকে ১০ বছর মেয়াদে নিশ্চিত অধিক মুনাফাসহ এককালীন তহবিল গঠন।'
                    : 'Disciplined monthly installment plans from ৳ 500 to ৳ 5,000 for guaranteed compound maturity returns.'}
                </p>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{language === 'bn' ? '১২, ২৪, ৩৬, ৬০ বা ১২০ মাসের কিস্তি মেয়াদ' : 'Tenure choices: 12, 24, 36, 60 or 120 months'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{language === 'bn' ? 'মেয়াদান্তে আকর্ষণীয় চক্রবৃদ্ধি মুনাফা' : 'High maturity yield with guaranteed dividends'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{language === 'bn' ? 'ডিপিএস আমানতের বিপরীতে ৮০% ঋণ সুবিধা' : 'Up to 80% loan entitlement against accumulated balance'}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Scheme 3: Micro-loans */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-10 h-10 rounded-md bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 flex items-center justify-center mb-2">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <CardTitle>
                  {language === 'bn' ? 'সহজ শর্তে ক্ষুদ্রঋণ ও বিনিয়োগ' : 'Micro-Credit & Business Loans'}
                </CardTitle>
                <CardDescription>
                  {language === 'bn' ? 'ব্যবসা ও কর্মসংস্থান বিনিয়োগ' : 'SME & Agricultural Working Capital'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3.5 text-xs sm:text-[13px] text-slate-600 dark:text-slate-300">
                <p className="leading-relaxed">
                  {language === 'bn'
                    ? 'দোকানদার, কুটির শিল্প, কৃষি ও ক্ষুদ্র উদ্যোক্তাদের ব্যবসায়িক মূলধন বৃদ্ধিতে সহজ ও স্বচ্ছ কিস্তির ঋণ সহায়তা।'
                    : 'Fast loan disbursement for merchants, farmers, and craftsmen with transparent repayment schedules.'}
                </p>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{language === 'bn' ? 'দৈনিক, সাপ্তাহিক বা মাসিক কিস্তিতে পরিশোধ' : 'Flexible daily, weekly, or monthly installments'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{language === 'bn' ? 'আসল ও মুনাফার আনুপাতিক বিভাজন স্বচ্ছতা' : 'Transparent principal and profit amortization split'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{language === 'bn' ? 'সময়মত পরিশোধে রিবেট/মওকুফ বোনাস সুবিধা' : 'Early repayment rebates and interest discounts'}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 3. Financial Calculator */}
      <section id="calculator" className="py-16 bg-slate-50 dark:bg-[#0b1324]/50 border-y border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-[#0b1324] rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm p-5 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  <Calculator className="w-4 h-4" />
                  <span>{language === 'bn' ? 'হিসাব পরিমাপক' : 'Financial Calculator'}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
                  {language === 'bn' ? 'ঋণ ও ডিপিএস মুনাফা ক্যালকুলেটর' : 'Loan & DPS Return Calculator'}
                </h3>
              </div>

              {/* Tab toggle */}
              <div className="flex border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden shrink-0">
                <button
                  type="button"
                  onClick={() => setCalcTab('loan')}
                  className={`px-4 py-2 text-xs font-medium transition cursor-pointer ${
                    calcTab === 'loan'
                      ? 'bg-emerald-700 text-white'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {language === 'bn' ? 'ঋণ কিস্তি হিসাব' : 'Loan Calculator'}
                </button>
                <button
                  type="button"
                  onClick={() => setCalcTab('dps')}
                  className={`px-4 py-2 text-xs font-medium transition cursor-pointer ${
                    calcTab === 'dps'
                      ? 'bg-emerald-700 text-white'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {language === 'bn' ? 'ডিপিএস মুনাফা হিসাব' : 'DPS Calculator'}
                </button>
              </div>
            </div>

            {calcTab === 'loan' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="space-y-5 text-sm">
                  <div>
                    <div className="flex justify-between font-medium text-slate-700 dark:text-slate-300 mb-1.5 text-xs">
                      <span>{language === 'bn' ? 'আসল ঋণের পরিমাণ' : 'Loan Principal Amount'}</span>
                      <span className="font-financial tabular-nums font-semibold text-emerald-700 dark:text-emerald-400">{formatMoney(loanPrincipal)}</span>
                    </div>
                    <input
                      type="range"
                      min="10000"
                      max="300000"
                      step="5000"
                      value={loanPrincipal}
                      onChange={(e) => setLoanPrincipal(Number(e.target.value))}
                      className="w-full accent-emerald-700 cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-financial tabular-nums">
                      <span>{formatMoney(10000)}</span>
                      <span>{formatMoney(300000)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        {language === 'bn' ? 'কিস্তি সংখ্যা (সাপ্তাহিক)' : 'Tenure (Weeks)'}
                      </label>
                      <select
                        value={loanTenureWeeks}
                        onChange={(e) => setLoanTenureWeeks(Number(e.target.value))}
                        className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-2 text-xs font-mono"
                      >
                        <option value={24}>{language === 'bn' ? '২৪ সপ্তাহ (৬ মাস)' : '24 Weeks (6 Months)'}</option>
                        <option value={46}>{language === 'bn' ? '৪৬ সপ্তাহ (১ বছর)' : '46 Weeks (1 Year)'}</option>
                        <option value={52}>{language === 'bn' ? '৫২ সপ্তাহ (পূর্ণ ১ বছর)' : '52 Weeks (Full 1 Year)'}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        {language === 'bn' ? 'মুনাফার হার %' : 'Profit Rate (%)'}
                      </label>
                      <input
                        type="number"
                        value={loanRatePct}
                        onChange={(e) => setLoanRatePct(Number(e.target.value))}
                        className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-2 text-xs font-mono"
                        min="5"
                        max="25"
                        step="0.5"
                      />
                    </div>
                  </div>
                </div>

                {/* Loan Result */}
                <div className="bg-slate-900 text-white rounded-lg p-5 space-y-4 border border-slate-800">
                  <span className="text-xs font-medium text-slate-300 uppercase tracking-wider block">
                    {language === 'bn' ? 'পরিশোধ বিবরণী' : 'Repayment Summary'}
                  </span>

                  <div className="space-y-2 border-b border-slate-800 pb-3 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>{language === 'bn' ? 'আসল ঋণ:' : 'Principal:'}</span>
                      <span className="font-financial tabular-nums font-medium text-white">{formatMoney(loanPrincipal)}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>{language === 'bn' ? `মুনাফা (${formatNum(loanRatePct)}%):` : `Profit (${formatNum(loanRatePct)}%):`}</span>
                      <span className="font-financial tabular-nums font-medium text-amber-400">{formatMoney(totalLoanProfit)}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>{language === 'bn' ? 'সর্বমোট পরিশোধযোগ্য:' : 'Total Repayable:'}</span>
                      <span className="font-financial tabular-nums font-semibold text-emerald-400">{formatMoney(totalLoanRepayable)}</span>
                    </div>
                  </div>

                  <div className="bg-slate-950 rounded-md p-3 text-center border border-slate-800">
                    <span className="text-[11px] text-slate-400 block">
                      {language === 'bn'
                        ? `প্রতি কিস্তির পরিমাণ (${formatNum(loanTenureWeeks)} টি কিস্তি)`
                        : `Installment Amount (${formatNum(loanTenureWeeks)} installments)`}
                    </span>
                    <span className="text-xl font-bold text-white font-financial tabular-nums mt-0.5 block">
                      {formatMoney(perInstallmentLoan)}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="space-y-5 text-sm">
                  <div>
                    <div className="flex justify-between font-medium text-slate-700 dark:text-slate-300 mb-1.5 text-xs">
                      <span>{language === 'bn' ? 'মাসিক কিস্তি জমার পরিমাণ' : 'Monthly Deposit Amount'}</span>
                      <span className="font-financial tabular-nums font-semibold text-emerald-700 dark:text-emerald-400">{formatMoney(dpsMonthly)}</span>
                    </div>
                    <input
                      type="range"
                      min="500"
                      max="10000"
                      step="500"
                      value={dpsMonthly}
                      onChange={(e) => setDpsMonthly(Number(e.target.value))}
                      className="w-full accent-emerald-700 cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-financial tabular-nums">
                      <span>{formatMoney(500)}</span>
                      <span>{formatMoney(10000)}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      {language === 'bn' ? 'ডিপিএস মেয়াদ (বছর)' : 'DPS Tenure (Years)'}
                    </label>
                    <select
                      value={dpsYears}
                      onChange={(e) => setDpsYears(Number(e.target.value))}
                      className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-2 text-xs font-mono"
                    >
                      <option value={1}>{language === 'bn' ? '১ বছর (১২ মাস)' : '1 Year (12 Months)'}</option>
                      <option value={2}>{language === 'bn' ? '২ বছর (২৪ মাস)' : '2 Years (24 Months)'}</option>
                      <option value={3}>{language === 'bn' ? '৩ বছর (৩৬ মাস)' : '3 Years (36 Months)'}</option>
                      <option value={5}>{language === 'bn' ? '৫ বছর (৬০ মাস)' : '5 Years (60 Months)'}</option>
                      <option value={10}>{language === 'bn' ? '১০ বছর (১২০ মাস)' : '10 Years (120 Months)'}</option>
                    </select>
                  </div>
                </div>

                {/* DPS Result */}
                <div className="bg-emerald-900 text-white rounded-lg p-5 space-y-4 border border-emerald-800">
                  <span className="text-xs font-medium text-emerald-200 uppercase tracking-wider block">
                    {language === 'bn' ? 'মেয়াদপূর্তি বিবরণী' : 'Maturity Projection'}
                  </span>

                  <div className="space-y-2 border-b border-emerald-800 pb-3 text-xs">
                    <div className="flex justify-between text-emerald-100">
                      <span>{language === 'bn' ? 'মোট জমাকৃত টাকা:' : 'Total Deposited:'}</span>
                      <span className="font-financial tabular-nums font-medium text-white">{formatMoney(totalDpsDeposit)}</span>
                    </div>
                    <div className="flex justify-between text-emerald-100">
                      <span>{language === 'bn' ? 'আনুমানিক মুনাফা:' : 'Estimated Profit:'}</span>
                      <span className="font-financial tabular-nums font-medium text-amber-300">{formatMoney(dpsProfit)}</span>
                    </div>
                  </div>

                  <div className="bg-emerald-950 rounded-md p-3 text-center border border-emerald-800">
                    <span className="text-[11px] text-emerald-300 block">
                      {language === 'bn' ? 'মেয়াদপূর্তিতে সর্বমোট প্রাপ্য' : 'Estimated Maturity Payable'}
                    </span>
                    <span className="text-xl font-bold text-white font-financial tabular-nums mt-0.5 block">
                      {formatMoney(totalDpsMaturity)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. Branch Network */}
      <section id="branches" className="py-16 bg-white dark:bg-[#060911] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <Badge variant="info" className="text-xs">
              {language === 'bn' ? 'সেবাকেন্দ্র ও শাখা' : 'Branch Network'}
            </Badge>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {language === 'bn' ? 'আমাদের অনুমোদিত সেবাকেন্দ্র ও শাখাসমূহ' : 'Authorized Branches & Service Centers'}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {language === 'bn'
                ? 'কালিহাতী ও টাঙ্গাইলের প্রত্যন্ত অঞ্চলে অবস্থিত আমাদের অনুমোদিত সেবাকেন্দ্র।'
                : 'Visit our branch offices across Kalihati and Tangail districts.'}
            </p>
          </div>

          {/* Branch table */}
          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs">
            <table className="w-full text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="text-left p-3.5 font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider text-xs">
                    {language === 'bn' ? 'শাখার নাম' : 'Branch Name'}
                  </th>
                  <th className="text-left p-3.5 font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider text-xs">
                    {language === 'bn' ? 'কোড' : 'Code'}
                  </th>
                  <th className="text-left p-3.5 font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider text-xs">
                    {language === 'bn' ? 'ঠিকানা' : 'Address'}
                  </th>
                  <th className="text-left p-3.5 font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider text-xs">
                    {language === 'bn' ? 'ফোন' : 'Phone'}
                  </th>
                  <th className="text-left p-3.5 font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider text-xs">
                    {language === 'bn' ? 'কার্যক্রমের সময়' : 'Hours'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  {
                    name: language === 'bn' ? 'এলেঙ্গা প্রধান কার্যালয়' : 'Elenga Head Office',
                    code: 'MB-01',
                    location: language === 'bn' ? 'এলেঙ্গা বাসস্ট্যান্ড সংলগ্ন, কালিহাতী, টাঙ্গাইল' : 'Elenga Bus Stand, Kalihati, Tangail',
                    phone: language === 'bn' ? '০১৭১১-০০০০০০' : '01711-000000',
                    time: language === 'bn' ? 'সকাল ৯:০০ — বিকাল ৫:০০ (শনি—বৃহঃ)' : '9:00 AM — 5:00 PM (Sat — Thu)',
                  },
                  {
                    name: language === 'bn' ? 'কালিহাতী বাজার শাখা' : 'Kalihati Bazar Branch',
                    code: 'KB-02',
                    location: language === 'bn' ? 'কালিহাতী পৌর সুপার মার্কেট, ২য় তলা' : 'Kalihati Super Market, 2nd Floor',
                    phone: language === 'bn' ? '০১৭২২-০০০০০০' : '01722-000000',
                    time: language === 'bn' ? 'সকাল ৯:০০ — বিকাল ৫:০০ (শনি—বৃহঃ)' : '9:00 AM — 5:00 PM (Sat — Thu)',
                  },
                  {
                    name: language === 'bn' ? 'ঘাটাইল উপজেলা শাখা' : 'Ghatail Upazila Branch',
                    code: 'GB-03',
                    location: language === 'bn' ? 'ঘাটাইল কলেজ রোড, কলেজ মোড়' : 'Ghatail College Road, College Mor',
                    phone: language === 'bn' ? '০১৭৩৩-০০০০০০' : '01733-000000',
                    time: language === 'bn' ? 'সকাল ৯:০০ — বিকাল ৫:০০ (শনি—বৃহঃ)' : '9:00 AM — 5:00 PM (Sat — Thu)',
                  },
                  {
                    name: language === 'bn' ? 'টাঙ্গাইল সদর শাখা' : 'Tangail Sadar Branch',
                    code: 'TS-04',
                    location: language === 'bn' ? 'ভিক্টোরিয়া রোড, টাঙ্গাইল সদর' : 'Victoria Road, Tangail Sadar',
                    phone: language === 'bn' ? '০১৭৪৪-০০০০০০' : '01744-000000',
                    time: language === 'bn' ? 'সকাল ৯:০০ — বিকাল ৫:০০ (শনি—বৃহঃ)' : '9:00 AM — 5:00 PM (Sat — Thu)',
                  },
                ].map((br, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                    <td className="p-3.5 font-medium text-slate-900 dark:text-slate-100">{br.name}</td>
                    <td className="p-3.5 font-mono text-xs text-slate-500 dark:text-slate-400">{br.code}</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">{br.location}</td>
                    <td className="p-3.5 font-mono text-slate-600 dark:text-slate-300">{br.phone}</td>
                    <td className="p-3.5 text-slate-500 dark:text-slate-400 text-xs">{br.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. Notice Board */}
      <section id="notices" className="py-16 bg-slate-50 dark:bg-[#0b1324]/50 border-y border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-[#0b1324] rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm p-5 sm:p-7 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3.5 flex-wrap gap-2">
              <div>
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
                  {language === 'bn' ? 'জরুরী বিজ্ঞপ্তি' : 'Official Notices'}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                  {language === 'bn' ? 'সমিতি নোটিশ ও সার্কুলার বোর্ড' : 'Notice & Circular Board'}
                </h3>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                {language === 'bn' ? 'সর্বশেষ হালনাগাদ: অক্টোবর ২০২৬' : 'Last Updated: October 2026'}
              </span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {[
                {
                  title: language === 'bn'
                    ? 'বার্ষিক সাধারণ সভা (AGM ২০২৬) সংক্রান্ত জরুরি বিজ্ঞপ্তি'
                    : 'Notice of Annual General Meeting (AGM 2026)',
                  date: language === 'bn' ? '২৮ অক্টোবর, ২০২৬' : '28 October, 2026',
                  badge: language === 'bn' ? 'সাধারণ সভা' : 'AGM',
                  desc: language === 'bn'
                    ? 'সকল সম্মানিত সদস্যগণকে অবহিত করা যাইতেছে যে, আগামী ১৫ই নভেম্বর ২০২৬ সমিতির বার্ষিক সাধারণ সভা প্রধান কার্যালয়ে অনুষ্ঠিত হইবে।'
                    : 'All valued members are hereby notified that the AGM will convene at Elenga Head Office on 15 November 2026.',
                },
                {
                  title: language === 'bn'
                    ? 'চলতি অর্থ-বছরের সঞ্চয় ও ডিপিএস মুনাফা প্রদান কার্যক্রম'
                    : 'Annual Dividend & DPS Profit Distribution',
                  date: language === 'bn' ? '২৫ অক্টোবর, ২০২৬' : '25 October, 2026',
                  badge: language === 'bn' ? 'মুনাফা বণ্টন' : 'Dividend',
                  desc: language === 'bn'
                    ? 'বার্ষিক হিসাব নিরীক্ষা সম্পন্ন সাপেক্ষে সকল সঞ্চয়ী হিসাবের অর্জিত মুনাফা সদস্যগণের হিসাবে ক্রেডিট সম্পন্ন হইয়াছে।'
                    : 'Following annual auditing, dividends have been credited to all active savings accounts.',
                },
                {
                  title: language === 'bn'
                    ? 'ডিজিটাল পাশবই সেবা গ্রহণ সংক্রান্ত নির্দেশনা'
                    : 'Digital Passbook Portal Access Guidelines',
                  date: language === 'bn' ? '২০ অক্টোবর, ২০২৬' : '20 October, 2026',
                  badge: language === 'bn' ? 'সেবা আপডেট' : 'E-Services',
                  desc: language === 'bn'
                    ? 'সম্মানিত সদস্যগণ এখন হইতে ঘরে বসিয়া অনলাইনে তাহাদের সঞ্চয় ও ঋণের ডিজিটাল পাশবই স্টেটমেন্ট অবলোকন করিতে পারিবেন।'
                    : 'Members can now inspect real-time electronic passbook statements online with their account credentials.',
                },
              ].map((n, i) => (
                <div key={i} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex items-start gap-3 flex-1">
                      <FileText className="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm text-slate-900 dark:text-white">{n.title}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{n.desc}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-medium text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/80">
                        {n.badge}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{n.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA Banner */}
      <section className="py-16 bg-white dark:bg-[#060911] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 text-white rounded-lg p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800 shadow-md">
            <div className="space-y-2 max-w-xl">
              <span className="inline-block px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
                {language === 'bn' ? 'সদস্য সেলফ সার্ভিস পোর্টাল' : 'Member Self-Service Portal'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                {language === 'bn'
                  ? 'আপনার সঞ্চয় ও ঋণের ডিজিটাল পাশ বই ঘরে বসেই দেখুন'
                  : 'Access Your Complete Savings & Loan Passbook Online'}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {language === 'bn'
                  ? 'আপনার সদস্য হিসাব নম্বর দিয়ে তাৎক্ষণিক সাধারণ সঞ্চয় স্থিতি, ডিপিএস জমা ও ঋণ কিস্তির বিবরণী যেকোনো সময় যাচাই করুন।'
                  : 'Enter your member account number to inspect live balances, deposit ledger entries, DPS maturity progress, and loan schedules 24/7.'}
              </p>
            </div>

            <div className="shrink-0">
              <Link href="/member">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2.5 cursor-pointer shadow-sm">
                  <span>{language === 'bn' ? 'ডিজিটাল পাশ বই খুলুন' : 'Open Digital Passbook'}</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
