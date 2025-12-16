'use client';

import React from 'react';
import { Terminal, Key, Database, ShieldCheck, Activity, Clock, Globe } from 'lucide-react';
import { DevService } from '../service';

export default function DevView() {
    const logs = DevService.getSecurityLogs();
    // const metrics = DevService.getDatabaseMetrics(); 

    return (
        <div className="h-full flex flex-col">
            {/* Dev Header */}
            <div className="bg-gray-900 text-white p-6 pb-12">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-indigo-500 rounded-lg">
                        <Terminal size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold">Developer Console</h1>
                        <p className="text-gray-400 text-sm">Manage your API keys, webhooks, and integrations.</p>
                    </div>
                </div>

                <div className="flex gap-8 text-sm">
                    <div className="flex items-center gap-2">
                        <Activity size={16} className="text-green-500" />
                        <span className="text-gray-300">System Status: <strong>Operational</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock size={16} className="text-blue-500" />
                        <span className="text-gray-300">Uptime: <strong>99.99%</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Globe size={16} className="text-purple-500" />
                        <span className="text-gray-300">Region: <strong>us-east-1</strong></span>
                    </div>
                </div>
            </div>

            {/* Content offset */}
            <div className="-mt-6 flex-1 bg-gray-50 p-6 overflow-y-auto">
                <div className="max-w-6xl mx-auto space-y-6">

                    {/* API Section */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                                <Key size={18} className="text-gray-400" /> API Keys
                            </h3>
                            <button className="text-xs bg-gray-900 text-white px-3 py-1.5 rounded hover:bg-black">Generate New Key</button>
                        </div>
                        <div className="p-6">
                            <div className="bg-gray-50 border border-gray-200 rounded p-3 flex items-center justify-between font-mono text-sm mb-4">
                                <span className="text-gray-600">pk_live_51Mz...q89s</span>
                                <button className="text-indigo-600 font-medium hover:underline">Reveal</button>
                            </div>
                            <div className="bg-gray-50 border border-gray-200 rounded p-3 flex items-center justify-between font-mono text-sm">
                                <span className="text-gray-600">sk_live_... (Hidden)</span>
                                <button className="text-indigo-600 font-medium hover:underline">Reveal</button>
                            </div>
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><Database size={18} /> Database Metrics</h3>
                            <div className="space-y-4">
                                <MetricRow label="Total Records" value="1,240,500" />
                                <MetricRow label="Storage Used" value="4.2 GB / 10 GB" />
                                <MetricRow label="Avg Query Time" value="12ms" />
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><ShieldCheck size={18} /> Security Logs</h3>
                            <div className="space-y-3">
                                {logs.map(log => (
                                    <LogEntry key={log.id} time={log.time} msg={log.msg} type={log.type} />
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

function MetricRow({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
            <span className="text-gray-500 text-sm">{label}</span>
            <span className="font-medium text-gray-900">{value}</span>
        </div>
    )
}

function LogEntry({ time, msg, type }: { time: string, msg: string, type: 'success' | 'warning' | 'error' }) {
    const color = type === 'success' ? 'bg-green-500' : type === 'warning' ? 'bg-yellow-500' : 'bg-red-500';
    return (
        <div className="flex items-center gap-3 text-sm">
            <div className={`w-1.5 h-1.5 rounded-full ${color}`} />
            <span className="text-gray-400 font-mono text-xs">{time}</span>
            <span className="text-gray-700 truncate">{msg}</span>
        </div>
    )
}
