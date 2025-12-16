'use client';

import React from 'react';
import { MoreHorizontal, Paperclip, MessageSquare, Flag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Task } from '../types';
import { Avatar } from '@/components/ui/Avatar';

export function TaskCard({ task }: { task: Task }) {
    return (
        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <div className="flex items-center justify-between mb-2">
                <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full", task.tagColor)}>
                    {task.tag}
                </span>
                <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal size={14} />
                </button>
            </div>
            <h4 className="text-sm font-medium text-gray-800 leading-tight mb-3">
                {task.title}
            </h4>

            <div className="flex items-center justify-between mt-auto">
                <div className="flex -space-x-2">
                    {task.members.map((member, i) => (
                        <Avatar key={i} src={member} size="sm" className="ring-1 ring-white" />
                    ))}
                </div>

                <div className="flex items-center gap-2 text-gray-400 text-xs">
                    {task.attachments > 0 && (
                        <div className="flex items-center gap-0.5">
                            <Paperclip size={12} />
                            <span>{task.attachments}</span>
                        </div>
                    )}
                    {task.comments > 0 && (
                        <div className="flex items-center gap-0.5">
                            <MessageSquare size={12} />
                            <span>{task.comments}</span>
                        </div>
                    )}
                    {task.priority === 'high' && (
                        <Flag size={12} className="text-red-500 fill-red-500" />
                    )}
                </div>
            </div>
        </div>
    );
}
