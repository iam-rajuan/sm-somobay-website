'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Landmark, Menu, X, UserCheck, ShieldCheck, PhoneCall } from 'lucide-react';
import { Button } from '../ui/button';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg text-slate-900 tracking-tight block leading-tight">
                সমিতি ম্যানেজমেন্ট সিস্টেম
              </span>
              <span className="text-xs text-slate-500 font-medium block">
                Somity Management System
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#schemes" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition">
              Schemes
            </Link>
            <Link href="#calculator" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition">
              Profit Calculator
            </Link>
            <Link href="#branches" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition">
              Branches
            </Link>
            <Link href="#notices" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition">
              Notice Board
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/member">
              <Button variant="outline" size="sm" className="gap-2">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                Member Portal
              </Button>
            </Link>
            <a href="http://localhost:3001" target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="sm" className="gap-2">
                <ShieldCheck className="w-4 h-4" />
                Staff ERP
              </Button>
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-3">
          <Link
            href="#schemes"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            Schemes
          </Link>
          <Link
            href="#calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            Profit Calculator
          </Link>
          <Link
            href="#branches"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            Branches
          </Link>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <Link href="/member" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full justify-center gap-2">
                <UserCheck className="w-4 h-4" />
                Member Self-Service
              </Button>
            </Link>
            <a href="http://localhost:3001" target="_blank" rel="noopener noreferrer">
              <Button variant="primary" className="w-full justify-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Staff ERP Login
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

