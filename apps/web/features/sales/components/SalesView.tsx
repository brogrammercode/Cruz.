'use client';

import React from 'react';
import { LeadCard } from './LeadCard';
import { SalesService } from '../service';
import { Lead } from '../types';

export default function SalesView() {
    const pipeline = SalesService.getPipeline();

    return (
        <div className="h-full flex flex-col p-8 bg-white overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Sales Pipeline</h1>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 mr-2">Total Value: <strong>$1.2M</strong></span>
                    <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                        Add Lead
                    </button>
                </div>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-6 h-full min-h-[500px]">
                {pipeline.map(stage => (
                    <StageColumn key={stage.id} {...stage}>
                        {stage.leads.map(lead => (
                            <LeadCard key={lead.id} {...lead} />
                        ))}
                        {stage.id === 'closed' && (
                            <div className="p-4 text-center text-gray-400 text-sm border-2 border-dashed border-gray-100 rounded-xl">
                                {stage.count} deals closed this month
                            </div>
                        )}
                    </StageColumn>
                ))}
            </div>
        </div>
    );
}

// ... other code ...

interface StageColumnProps {
    title: string;
    count: number;
    total: string;
    children: React.ReactNode;
    color: string;
    id: string; // Added ID to match usage
    leads: Lead[]; // Strictly typed
}

function StageColumn({ title, count, total, children, color }: Omit<StageColumnProps, 'leads' | 'id'>) {
    return (
        <div className="w-[300px] flex-shrink-0 flex flex-col gap-4">
            <div className={`pl-3 ${color}`}>
                <h3 className="font-semibold text-gray-800">{title}</h3>
                <div className="text-xs text-gray-500 flex justify-between mt-1">
                    <span>{count} deals</span>
                    <span>{total}</span>
                </div>
            </div>
            <div className="flex-1 space-y-3">
                {children}
            </div>
        </div>
    )
}
