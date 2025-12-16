'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { TaskCard } from './TaskCard';
import { ProjectService } from '../service';

export function KanbanBoard() {
    const columns = ProjectService.getBoard();

    return (
        <div className="flex h-full gap-4 overflow-x-auto pb-4">
            {columns.map((col) => (
                <div key={col.id} className="w-80 flex-shrink-0 flex flex-col h-full rounded-xl bg-gray-50/50 border border-gray-100">
                    {/* Column Header */}
                    <div className="p-3 flex items-center justify-between border-b border-gray-100">
                        <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${col.id === 'todo' ? 'bg-gray-400' : col.id === 'in-progress' ? 'bg-blue-500' : col.id === 'review' ? 'bg-yellow-400' : 'bg-green-500'}`} />
                            <h3 className="text-sm font-semibold text-gray-700">{col.title}</h3>
                            <span className="text-xs text-gray-400 font-medium">{col.tasks.length}</span>
                        </div>
                        <button className="text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded p-1">
                            <Plus size={14} />
                        </button>
                    </div>

                    {/* Tasks Container */}
                    <div className="p-3 flex-1 overflow-y-auto space-y-3">
                        {col.tasks.map((task) => (
                            <TaskCard key={task.id} task={task} />
                        ))}

                        {/* Add Task Ghost Button */}
                        <button className="w-full py-2 bg-transparent hover:bg-gray-100 border border-transparent border-dashed hover:border-gray-300 rounded-lg text-xs text-gray-400 flex items-center justify-center gap-2 transition-all">
                            <Plus size={12} /> Add Task
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
