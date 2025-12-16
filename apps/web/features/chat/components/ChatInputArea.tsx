'use client';

import React from 'react';
import { PlusCircle, Gift, Smile, Sticker, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ChatInput() {
    return (
        <div className="px-4 pb-6 pt-2">
            <div className="bg-gray-100 rounded-lg p-3 flex flex-col gap-2 relative focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">

                {/* Input Field */}
                <input
                    type="text"
                    placeholder="Message #general"
                    className="bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 w-full"
                />

                {/* Toolbar */}
                <div className="flex items-center justify-between border-t border-gray-200/50 pt-2 mt-1">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="p-1.5 h-auto w-auto rounded-full hover:bg-gray-200">
                            <PlusCircle size={20} className="text-gray-500" />
                        </Button>
                        <div className="h-4 w-[1px] bg-gray-300 mx-1" />
                        <button className="flex items-center gap-1 text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full hover:bg-indigo-100 transition-colors">
                            <Sparkles size={10} /> AI Enhanced
                        </button>
                    </div>

                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="p-1.5 h-auto w-auto rounded-full hover:bg-gray-200">
                            <Gift size={20} className="text-gray-500" />
                        </Button>
                        <Button variant="ghost" size="icon" className="p-1.5 h-auto w-auto rounded-full hover:bg-gray-200">
                            <Sticker size={20} className="text-gray-500" />
                        </Button>
                        <Button variant="ghost" size="icon" className="p-1.5 h-auto w-auto rounded-full hover:bg-gray-200">
                            <Smile size={20} className="text-gray-500" />
                        </Button>
                    </div>
                </div>
            </div>
            <div className="text-[10px] text-gray-400 mt-1 text-right">
                <strong>Return</strong> to send. <strong>Shift+Return</strong> for new line.
            </div>
        </div>
    );
}
