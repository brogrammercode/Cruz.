'use client';

import React from 'react';
import {
    Kanban,
    List,
    CalendarDays,
    Filter,
    ArrowUpDown,
    Users
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProjectViewMode } from '../types';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';

interface ProjectHeaderProps {
    view: ProjectViewMode;
    onViewChange: (view: ProjectViewMode) => void;
}

export function ProjectHeader({ view, onViewChange }: ProjectHeaderProps) {
    return (
        <div className="flex flex-col gap-4 mb-6">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <span>Projects</span>
                        <span>/</span>
                        <span>Web Redesign</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Sprint 12: Core Features</h1>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex -space-x-2 mr-4">
                        {[1, 2, 3].map(i => (
                            <Avatar key={i} src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${i}`} size="md" className="border-2 border-white bg-gray-100" />
                        ))}
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500">+5</div>
                    </div>
                    <Button variant="primary" size="sm">
                        Complete Sprint
                    </Button>
                </div>
            </div>

            {/* Controls Bar */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-1">
                {/* View Switcher */}
                <div className="flex items-center gap-1">
                    <ViewTab
                        active={view === 'board'}
                        onClick={() => onViewChange('board')}
                        icon={Kanban}
                        label="Board"
                    />
                    <ViewTab
                        active={view === 'list'}
                        onClick={() => onViewChange('list')}
                        icon={List}
                        label="List"
                    />
                    <ViewTab
                        active={view === 'timeline'}
                        onClick={() => onViewChange('timeline')}
                        icon={CalendarDays}
                        label="Timeline"
                    />
                </div>

                {/* Filters */}
                <div className="flex items-center gap-2 text-sm">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                        <Filter size={14} /> <span>Filter</span>
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                        <ArrowUpDown size={14} /> <span>Sort</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

function ViewTab({ active, onClick, icon: Icon, label }: { active: boolean, onClick: () => void, icon: React.ElementType, label: string }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors",
                active ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            )}
        >
            <Icon size={16} />
            {label}
        </button>
    );
}
