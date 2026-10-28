'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { UserCheck, KeyRound, ShieldAlert, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function MemberPortalPage() {
  const [accountNo, setAccountNo] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Mock feedback for scaffold phase
    setTimeout(() => {
      setLoading(false);
      setMessage('Member portal authentication service configured. Ready for Phase 2 API integration.');
    }, 800);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 mb-6 transition">
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <Card className="shadow-lg border-slate-200">
        <CardHeader className="text-center pb-2">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-sm">
            এস,এম
          </div>
          <CardTitle className="text-xl">সঞ্চয় ও ঋণের পাশ বই</CardTitle>
          <CardDescription className="text-xs">
            এস, এম ক্ষুদ্র সঞ্চয় ও ঋণদান সমবায় সমিতি লিঃ<br />
            <span className="text-emerald-700 font-semibold">রেজিঃ ট-ক ২৮৪০/২১ • এলেঙ্গা, কালিহাতী, টাঙ্গাইল</span>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
                Savings Account No (সঞ্চয়ী হিসাব নং)
              </label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="e.g. এস-১০২৪ বা কেন্দ্র নং"
                  value={accountNo}
                  onChange={(e) => setAccountNo(e.target.value)}
                  required
                />
                <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
                Member PIN / Password
              </label>
              <div className="relative">
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  required
                />
                <KeyRound className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {message && (
              <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-lg border border-emerald-200 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{message}</span>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Verifying Account...' : 'Access Electronic Passbook'}
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            Forgot your Account No or PIN? Please visit your local Somity branch with your National ID (NID).
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

