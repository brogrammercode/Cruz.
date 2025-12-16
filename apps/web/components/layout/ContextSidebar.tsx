'use client';

import React from 'react';
import {
    ChevronDown,
    Plus,
    Hash,
    Volume2,
    Folder,
    Clock,
    Users,
    Search,
    MoreHorizontal
} from 'lucide-react';
import { cn } from '@/lib/utils';

import { useAppStore } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';

export function ContextSidebar() {
    const { activeModule } = useAppStore();
    return (
        <div className="flex flex-col h-full w-full">
            {/* Header (Project Name / Team Name) */}
            <div className="h-12 border-b border-border flex items-center justify-between px-4 hover:bg-black/5 cursor-pointer transition-colors shadow-sm z-10">
                <div className="font-semibold text-sm truncate flex items-center gap-2">
                    <span>Cruz Inc.</span>
                    <ChevronDown size={14} className="opacity-50" />
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto py-3 px-2">
                {renderModuleContent(activeModule)}
            </div>

            {/* Footer (User/Connection Status) */}
            <div className="h-12 bg-gray-100/50 border-t border-border flex items-center px-3 gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium text-muted-foreground">System Online</span>
            </div>
        </div>
    );
}

function renderModuleContent(module: string) {
    switch (module) {
        case 'chat':
            return <ChatChannels />;
        case 'projects':
            return <ProjectList />;
        case 'finance':
            return <FinanceMenu />;
        default: // dashboard
            return <DashboardMenu />;
    }
}

// --- Sub-Menus ---

function DashboardMenu() {
    return (
        <div className="space-y-6">
            <Section title="Overview">
                <Item icon={Clock} label="My Focus" active />
                <Item icon={Users} label="Team Activity" />
            </Section>
            <Section title="Favorites">
                <Item icon={Folder} label="Q4 Launch" />
                <Item icon={Hash} label="marketing-leads" />
            </Section>
        </div>
    );
}

function ChatChannels() {
    return (
        <div className="space-y-6">
            <Section title="Unread" action={<Plus size={14} />}>
                <Item icon={Hash} label="announcements" bold />
                <Item icon={Hash} label="dev-ops" badge={3} bold />
            </Section>

            <Section title="Channels" action={<Plus size={14} />}>
                <Item icon={Hash} label="general" />
                <Item icon={Hash} label="design" />
                <Item icon={Hash} label="marketing" />
                <Item icon={Hash} label="random" />
            </Section>

            <Section title="Voice Channels">
                <Item icon={Volume2} label="Lobby" subLabel="3 users" />
                <Item icon={Volume2} label="Standup" />
            </Section>
        </div>
    );
}

function ProjectList() {
    return (
        <div className="space-y-6">
            <div className="px-2 mb-2">
                <button className="w-full bg-primary text-primary-foreground py-1.5 rounded-md text-sm font-medium shadow-sm hover:opacity-90 flex items-center justify-center gap-2">
                    <Plus size={16} /> New Project
                </button>
            </div>
            <Section title="Active Sprints">
                <Item icon={Folder} label="Web Redesign" active />
                <Item icon={Folder} label="Mobile App v2" />
                <Item icon={Folder} label="API Migration" />
            </Section>
            <Section title="Backlog">
                <Item icon={Folder} label="Internal Tools" />
                <Item icon={Folder} label="Compliance" />
            </Section>
        </div>
    );
}

function FinanceMenu() {
    return (
        <div className="space-y-6">
            <Section title="Accounts">
                <Item icon={Folder} label="Overview" active />
                <Item icon={Folder} label="Transactions" />
                <Item icon={Folder} label="Payroll" />
            </Section>
            <Section title="Planning">
                <Item icon={Folder} label="Budgets 2025" />
                <Item icon={Folder} label="Projections" />
            </Section>
        </div>
    );
}


// --- Generic UI Components ---

function Section({ title, children, action }: { title: string, children: React.ReactNode, action?: React.ReactNode }) {
    return (
        <div className="mb-2">
            <div className="px-2 mb-1 flex items-center justify-between group cursor-pointer text-xs font-bold text-gray-500 uppercase tracking-wider hover:text-gray-700">
                <span>{title}</span>
                {action && <span className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-200 rounded p-0.5">{action}</span>}
            </div>
            <div className="space-y-[1px]">{children}</div>
        </div>
    );
}

function Item({
    icon: Icon,
    label,
    subLabel,
    active,
    badge,
    bold
}: {
    icon: React.ElementType,
    label: string,
    subLabel?: string,
    active?: boolean,
    badge?: number,
    bold?: boolean
}) {
    return (
        <button className={cn(
            "w-full flex items-center gap-2 px-2 py-1.5 rounded-md transition-all group",
            active ? "bg-gray-200/80 text-gray-900 font-medium" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        )}>
            <Icon size={18} className={cn("flex-shrink-0 opacity-70", active && "opacity-100 text-gray-800")} />
            <div className="flex-1 text-left overflow-hidden">
                <div className={cn("truncate text-sm", bold && "font-semibold text-gray-800")}>{label}</div>
                {subLabel && <div className="text-[10px] text-gray-400 truncate">{subLabel}</div>}
            </div>
            {badge && (
                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[16px] text-center">
                    {badge}
                </span>
            )}
        </button>
    );
}
