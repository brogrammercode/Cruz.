'use client';

import React from 'react';
import { MessageItem } from './MessageItem';
import { ChatInput } from './ChatInputArea';
import { Hash, Bell, Pin, Users, Search, HelpCircle } from 'lucide-react';
import { ChatService } from '../service';

export default function ChatView() {
    const messages = ChatService.getMessages();

    return (
        <div className="flex flex-col h-full bg-white relative">
            {/* Header */}
            <header className="h-12 border-b border-gray-200 flex items-center justify-between px-4 flex-shrink-0">
                <div className="flex items-center gap-2">
                    <Hash size={20} className="text-gray-400" />
                    <h3 className="font-bold text-gray-800">general</h3>
                    <div className="h-4 w-[1px] bg-gray-300 mx-2" />
                    <span className="text-xs text-gray-500 truncate max-w-md">General discussion for the Cruz team.</span>
                </div>

                <div className="flex items-center gap-4 text-gray-500">
                    <Bell size={18} className="cursor-pointer hover:text-gray-800" />
                    <Pin size={18} className="cursor-pointer hover:text-gray-800" />
                    <Users size={18} className="cursor-pointer hover:text-gray-800" />
                    <div className="relative">
                        <input type="text" placeholder="Search" className="bg-gray-100 rounded text-xs px-2 py-1 w-32 focus:w-48 transition-all outline-none" />
                        <Search size={12} className="absolute right-2 top-1.5 opacity-50" />
                    </div>
                    <HelpCircle size={18} className="cursor-pointer hover:text-gray-800" />
                </div>
            </header>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto flex flex-col justify-end pb-2">
                {/* Spacer to push messages down if few, or scroll if many */}
                <div className="flex-1" />

                {messages.map(msg => (
                    <MessageItem key={msg.id} message={msg} />
                ))}
            </div>

            {/* Input Area */}
            <ChatInput />
        </div>
    );
}
