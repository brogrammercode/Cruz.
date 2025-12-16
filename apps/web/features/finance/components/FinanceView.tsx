'use client';

import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, AlertCircle, CreditCard, Download } from 'lucide-react';
import { KPICard } from './KPICard';
import { TransactionItem } from './TransactionItem';
import { FinanceService } from '../service';

export default function FinanceView() {
    const kpis = FinanceService.getKPIs();
    const transactions = FinanceService.getTransactions();

    return (
        <div className="h-full flex flex-col p-8 bg-gray-50/30 overflow-y-auto">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Financial Overview</h1>
                    <p className="text-sm text-gray-500">Real-time cashflow and budget monitoring.</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 shadow-sm transition-colors">
                        <Download size={16} /> Export Report
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm transition-colors">
                        <DollarSign size={16} /> New Expense
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {kpis.map((kpi, i) => (
                    <KPICard key={i} {...kpi} />
                ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart Section (Placeholder) */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm min-h-[400px]">
                    <h3 className="text-lg font-semibold text-gray-800 mb-6">Revenue vs Expenses</h3>
                    <div className="flex items-end justify-between gap-4 h-64 px-4 pb-4 border-b border-gray-100">
                        {/* Mock Chart Bars */}
                        {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((h, i) => (
                            <div key={i} className="w-full bg-indigo-50 hover:bg-indigo-100 rounded-t-sm relative group transition-all">
                                <div
                                    style={{ height: `${h}%` }}
                                    className="absolute bottom-0 w-full bg-indigo-500 rounded-t-sm group-hover:bg-indigo-600 transition-colors"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-2 px-2">
                        <span>Jan</span><span>Apr</span><span>Aug</span><span>Dec</span>
                    </div>
                </div>

                {/* Right Rail: Transactions */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Transactions</h3>
                    <div className="space-y-4 flex-1">
                        {transactions.map((tx) => (
                            <TransactionItem key={tx.id} {...tx} />
                        ))}
                    </div>
                    <button className="w-full mt-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                        View All Transactions
                    </button>
                </div>
            </div>
        </div>
    );
}
