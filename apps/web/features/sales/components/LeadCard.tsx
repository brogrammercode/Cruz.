'use client';

import React from 'react';
import { MoreHorizontal, Users, Phone, Mail } from 'lucide-react';
import { Lead } from '../types';

export function LeadCard({ name, value, contact, score, warning, hot }: Lead) {
    return (
        <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-800">{name}</h4>
                <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={16} /></button>
            </div>
            <div className="text-lg font-bold text-gray-900 mb-3">{value}</div>

            <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
                <Users size={14} /> <span>{contact}</span>
            </div>

            <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                <div className="flex items-center gap-1">
                    <div className={`text-xs font-bold px-1.5 py-0.5 rounded ${score > 90 ? 'bg-green-100 text-green-700' : score < 50 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                        {score}
                    </div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wide">AI Score</span>
                </div>
                <div className="flex gap-2 text-gray-400">
                    <Phone size={14} className="hover:text-gray-600" />
                    <Mail size={14} className="hover:text-gray-600" />
                </div>
            </div>
            {hot && <div className="mt-2 text-[10px] font-bold text-orange-500 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" /> HOT LEAD</div>}
        </div>
    )
}
