'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { KPIMetric } from '../types';

// Safe color map for Tailwind compiler
const COLOR_MAP: Record<string, string> = {
    indigo: 'text-indigo-500',
    green: 'text-green-500',
    red: 'text-red-500',
    yellow: 'text-yellow-500',
    blue: 'text-blue-500',
    purple: 'text-purple-500',
    pink: 'text-pink-500',
    gray: 'text-gray-500',
};

export function KPICard({ title, value, change, trend, icon: Icon, color }: KPIMetric) {
    const iconColorClass = COLOR_MAP[color] || 'text-gray-500';

    return (
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
            <div className={cn("absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity", iconColorClass)}>
                <Icon size={64} />
            </div>
            <div className="relative">
                <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{value}</h3>
                <div className="flex items-center gap-1.5 text-xs font-medium">
                    <span className={cn(
                        "px-1.5 py-0.5 rounded",
                        trend === 'up' ? "bg-green-100 text-green-700" :
                            trend === 'down' ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600"
                    )}>
                        {change}
                    </span>
                    <span className="text-gray-400">vs last month</span>
                </div>
            </div>
        </div>
    )
}
