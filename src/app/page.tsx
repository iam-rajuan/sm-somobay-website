import React from 'react';
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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-white to-slate-50 pt-20 pb-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <Badge variant="success" className="px-3 py-1 text-sm gap-1.5 font-medium shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত • রেজিঃ ট-ক ২৮৪০/২১
            </Badge>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              এস, এম ক্ষুদ্র সঞ্চয় ও ঋণদান <span className="text-emerald-700">সমবায় সমিতি লিঃ</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              প্রধান কার্যালয়: এলেঙ্গা, কালিহাতী, টাঙ্গাইল। সদস্যদের সঞ্চয় ও ঋণের ডিজিটাল পাসবই (সঞ্চয় ও ঋণের পাশ বই) ব্যবস্থাপনা, সাপ্তাহিক কিস্তি ট্র্যাকিং এবং ডিজিটাল হিসাব পরিষেবা।
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
              <Link href="/member">
                <Button size="lg" className="gap-2 text-base px-6 shadow-md shadow-emerald-600/20">
                  <ReceiptText className="w-5 h-5" />
                  Member Self-Service Login
                </Button>
              </Link>
              <a href="http://localhost:3001" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="gap-2 text-base px-6">
                  Admin & Staff ERP
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { label: 'Active Members (সদস্য)', value: '12,450+', icon: Users },
              { label: 'Total Savings (সঞ্চয়)', value: '৳৮.৫+ কোটি', icon: PiggyBank },
              { label: 'Disbursed Loans (ঋণ বিতরণ)', value: '৳১২.২+ কোটি', icon: TrendingUp },
              { label: 'Branch Offices (শাখা)', value: '18 Branches', icon: Building2 },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-lg bg-emerald-100/70 text-emerald-700 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                    <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Financial Schemes Section */}
      <section id="schemes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="info" className="mb-3">Our Core Products</Badge>
          <h2 className="text-3xl font-bold text-slate-900">Cooperative Financial Schemes</h2>
          <p className="text-slate-600 mt-2">
            Tailored savings and financing products engineered for local micro-entrepreneurs and community welfare.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Scheme 1 */}
          <Card className="hover:shadow-md transition">
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
                <PiggyBank className="w-5 h-5" />
              </div>
              <CardTitle>General Daily & Weekly Savings</CardTitle>
              <CardDescription>সাধারণ সঞ্চয় ও ক্ষুদ্র আমানত হিসাব</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600">
              <p>Flexible deposit schedules with instant door-to-door field collector receipts and SMS confirmations.</p>
              <ul className="space-y-1.5 text-xs text-slate-500">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  Daily or weekly installment flexibility
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  Immediate cash withdrawal on demand
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Scheme 2 */}
          <Card className="hover:shadow-md transition border-emerald-300 shadow-emerald-50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center mb-2">
                  <BadgePercent className="w-5 h-5" />
                </div>
                <Badge variant="success">Most Popular</Badge>
              </div>
              <CardTitle>Deposit Pension Scheme (DPS)</CardTitle>
              <CardDescription>ডিপিএস মেয়াদী আমানত সঞ্চয়</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600">
              <p>Fixed monthly installments from 1 to 10 years with guaranteed compounded profits upon maturity.</p>
              <ul className="space-y-1.5 text-xs text-slate-500">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  Terms from 12 to 120 months
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  High profit rate on full maturity
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Scheme 3 */}
          <Card className="hover:shadow-md transition">
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-2">
                <TrendingUp className="w-5 h-5" />
              </div>
              <CardTitle>Micro-Credit & SME Loans</CardTitle>
              <CardDescription>ক্ষুদ্র ঋণ ও ব্যবসা উন্নয়ন বিনিয়োগ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600">
              <p>Low-interest, proportional amortization micro-loans for small business inventory, agriculture, and livestock.</p>
              <ul className="space-y-1.5 text-xs text-slate-500">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  Transparent flat / reducing interest rates
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  Easy weekly/monthly installment split
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Member Portal Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-900 text-white rounded-2xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <Badge variant="default" className="bg-emerald-800 text-emerald-200">
              Member Self-Service
            </Badge>
            <h3 className="text-2xl sm:text-3xl font-bold">
              Check your Somity Electronic Passbook Online
            </h3>
            <p className="text-emerald-100 text-sm leading-relaxed">
              Log in with your Account No and Member PIN to view your ledger history, active loan balance, and payment receipts 24/7.
            </p>
          </div>
          <div className="shrink-0">
            <Link href="/member">
              <Button size="lg" className="bg-white text-emerald-900 hover:bg-emerald-50 font-semibold shadow-md">
                Launch Member Portal
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

