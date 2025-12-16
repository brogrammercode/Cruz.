'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Smile, Reply, MoreHorizontal } from 'lucide-react';
import { Message } from '../types';
import { Avatar } from '@/components/ui/Avatar';

export function MessageItem({ message }: { message: Message }) {
    if (message.isSystem) {
        return (
            <div className="flex items-center gap-4 py-2 px-4 hover:bg-black/[0.02] group">
                <div className="w-[50px] flex justify-end">
                    <div className="h-[1px] bg-gray-200 w-full relative top-3" />
                </div>
                <div className="text-xs text-gray-400 flex-1">{message.content}</div>
                <div className="flex-1 h-[1px] bg-gray-200" />
            </div>
        );
    }

    return (
        <div className="flex gap-4 py-2 px-4 hover:bg-black/[0.02] group relative mb-1">
            {/* Avatar */}
            <div className="flex-shrink-0 mt-0.5 ml-1">
                <Avatar
                    src={message.user.avatar}
                    alt={message.user.name}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    size="lg"
                />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <span className={cn("font-semibold text-sm cursor-pointer hover:underline", message.user.color)}>
                        {message.user.name}
                    </span>
                    <span className="text-[10px] text-gray-400">{message.timestamp}</span>
                </div>
                <div className="text-gray-800 text-[15px] leading-relaxed whitespace-pre-wrap">
                    {message.content}
                </div>
            </div>

            {/* Hover Actions (Discord Style) */}
            <div className="absolute right-4 -top-2 bg-white shadow-sm border border-gray-200 rounded-lg p-0.5 flex opacity-0 group-hover:opacity-100 transition-opacity">
                <ActionButton icon={Smile} />
                <ActionButton icon={Reply} />
                <ActionButton icon={MoreHorizontal} />
            </div>
        </div>
    );
}

function ActionButton({ icon: Icon }: { icon: React.ElementType }) {
    return (
        <button className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded">
            <Icon size={16} />
        </button>
    )
}
