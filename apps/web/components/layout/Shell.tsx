'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ShellProps {
    children: React.ReactNode;
    primarySidebar: React.ReactNode;
    secondarySidebar?: React.ReactNode;
}

export function Shell({
    children,
    primarySidebar,
    secondarySidebar,
}: ShellProps) {
    return (
        <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
            {/* Primary Navigation Rail */}
            <aside className="w-[72px] flex-shrink-0 z-50 flex flex-col items-center py-3 bg-sidebar border-r border-border">
                {primarySidebar}
            </aside>

            {/* Secondary Sidebar (Context) */}
            {secondarySidebar && (
                <aside className="w-60 flex-shrink-0 flex flex-col bg-sec-sidebar border-r border-border">
                    {secondarySidebar}
                </aside>
            )}

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 bg-background relative z-0 overflow-hidden">
                {children}
            </main>
        </div>
    );
}
