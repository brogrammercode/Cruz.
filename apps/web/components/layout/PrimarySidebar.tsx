'use client';

import React from 'react';
import {
    LayoutGrid,
    ClipboardList,
    MessageSquare,
    Landmark,
    BarChart3,
    Code2,
    Search,
    Settings,
    Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';

import { useAppStore } from '@/context/AppContext';
import { Avatar } from '@/components/ui/Avatar';

// Module Definition
const MODULES = [
    { id: 'dashboard', icon: LayoutGrid, label: 'Dashboard', color: 'text-indigo-500' },
    { id: 'projects', icon: ClipboardList, label: 'Projects', color: 'text-blue-500' },
    { id: 'chat', icon: MessageSquare, label: 'Communication', color: 'text-green-500' },
    { id: 'finance', icon: Landmark, label: 'Finance & HR', color: 'text-yellow-500' },
    { id: 'sales', icon: BarChart3, label: 'Sales & Marketing', color: 'text-rose-500' },
    { id: 'dev', icon: Code2, label: 'Dev Tools', color: 'text-slate-500' },
];

export function PrimarySidebar() {
    const { activeModule, setActiveModule } = useAppStore();
    return (
        <div className="flex flex-col h-full items-center justify-between w-full">

            {/* Top Section: Navigation */}
            <div className="flex flex-col items-center gap-4 w-full">
                {/* Logo / Home */}
                <button
                    className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-all shadow-md group"
                    title="Cruz Home"
                >
                    <div className="font-bold text-xl group-hover:scale-110 transition-transform">C</div>
                </button>

                {/* Separator */}
                <div className="w-8 h-[2px] bg-border rounded-full" />

                {/* Modules */}
                <nav className="flex flex-col gap-3 w-full items-center">
                    {MODULES.map((module) => {
                        const isActive = activeModule === module.id;
                        return (
                            <SidebarItem
                                key={module.id}
                                icon={module.icon}
                                label={module.label}
                                isActive={isActive}
                                onClick={() => setActiveModule(module.id)}
                                color={module.color}
                            />
                        );
                    })}
                </nav>
            </div>

            {/* Bottom Section: Utilities */}
            <div className="flex flex-col gap-4 items-center w-full pb-4">
                <SidebarItem
                    icon={Search}
                    label="Search"
                    isActive={false}
                    onClick={() => { }}
                />

                {/* User Avatar Stub */}
                <button className="rounded-full hover:ring-2 hover:ring-primary transition-all">
                    <Avatar
                        src="https://api.dicebear.com/9.x/avataaars/svg?seed=CruzUser"
                        alt="User"
                        size="md" // or lg
                    />
                </button>
            </div>
        </div>
    );
}

// Sub-component for individual items
interface SidebarItemProps {
    icon: React.ElementType;
    label: string;
    isActive?: boolean;
    onClick?: () => void;
    color?: string;
}

function SidebarItem({ icon: Icon, label, isActive, onClick, color }: SidebarItemProps) {
    return (
        <div className="relative group flex items-center justify-center w-full">
            {/* Active Indicator Pillus */}
            <div
                className={cn(
                    "absolute left-0 w-1 bg-primary rounded-r-lg transition-all duration-300 ease-out",
                    isActive ? "h-8" : "h-0 group-hover:h-4"
                )}
            />

            <button
                onClick={onClick}
                className={cn(
                    "w-12 h-12 rounded-[24px] flex items-center justify-center transition-all duration-300 group-hover:rounded-[16px] group-hover:bg-primary/10 group-hover:text-primary",
                    isActive ? "bg-primary/10 text-primary rounded-[16px]" : "bg-transparent text-sidebar-fg"
                )}
                title={label}
            >
                <Icon size={24} className={cn("transition-transform duration-200", isActive && "scale-105")} />
            </button>

            {/* Tooltip (CSS only for now) */}
            <div className="absolute left-14 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg translate-x-2 group-hover:translate-x-0 transition-transform">
                {label}
            </div>
        </div>
    );
}
