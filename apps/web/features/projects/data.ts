import { Column } from './types';

export const MOCK_COLUMNS: Column[] = [
    {
        id: 'todo',
        title: 'To Do',
        color: 'bg-gray-100',
        tasks: [
            { id: '1', title: 'Research new AI models', tag: 'Research', tagColor: 'bg-purple-100 text-purple-700', priority: 'medium', members: ['https://api.dicebear.com/9.x/avataaars/svg?seed=1'], comments: 2, attachments: 1 },
            { id: '2', title: 'Draft visual identity', tag: 'Design', tagColor: 'bg-pink-100 text-pink-700', priority: 'high', members: ['https://api.dicebear.com/9.x/avataaars/svg?seed=2', 'https://api.dicebear.com/9.x/avataaars/svg?seed=3'], comments: 5, attachments: 2 }
        ]
    },
    {
        id: 'in-progress',
        title: 'In Progress',
        color: 'bg-blue-50',
        tasks: [
            { id: '3', title: 'Implement Primary Sidebar', tag: 'Frontend', tagColor: 'bg-blue-100 text-blue-700', priority: 'high', members: ['https://api.dicebear.com/9.x/avataaars/svg?seed=4'], comments: 0, attachments: 0 },
            { id: '4', title: 'Setup Database Schema', tag: 'Backend', tagColor: 'bg-green-100 text-green-700', priority: 'medium', members: ['https://api.dicebear.com/9.x/avataaars/svg?seed=5'], comments: 1, attachments: 0 }
        ]
    },
    {
        id: 'review',
        title: 'Code Review',
        color: 'bg-yellow-50',
        tasks: [
            { id: '5', title: 'Authentication Logic', tag: 'Security', tagColor: 'bg-gray-100 text-gray-700', priority: 'high', members: ['https://api.dicebear.com/9.x/avataaars/svg?seed=6'], comments: 12, attachments: 0 }
        ]
    },
    {
        id: 'done',
        title: 'Done',
        color: 'bg-green-50',
        tasks: [
            { id: '6', title: 'Project Kickoff Meeting', tag: 'Meeting', tagColor: 'bg-orange-100 text-orange-700', priority: 'low', members: ['https://api.dicebear.com/9.x/avataaars/svg?seed=7', 'https://api.dicebear.com/9.x/avataaars/svg?seed=8', 'https://api.dicebear.com/9.x/avataaars/svg?seed=9'], comments: 0, attachments: 1 }
        ]
    }
];
