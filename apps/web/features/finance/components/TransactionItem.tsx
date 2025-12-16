'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Users } from 'lucide-react';
import { Transaction } from '../types';

export function TransactionItem({ title, date, amount, positive, icon: Icon }: Transaction) {
    return (
        <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                    {title === 'Gusto Payroll' ? <Users size={14} /> : <Icon size={14} />}
                </div>
                <div>
                    <h4 className="text-sm font-medium text-gray-800">{title}</h4>
                    <p className="text-[10px] text-gray-400">{date}</p>
                </div>
            </div>
            <span className={cn("text-sm font-semibold", positive ? "text-green-600" : "text-gray-900")}>
                {amount}
            </span>
        </div>
    )
}
