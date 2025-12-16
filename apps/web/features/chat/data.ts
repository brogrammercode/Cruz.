import { Message } from './types';

export const MOCK_MESSAGES: Message[] = [
    {
        id: '1',
        user: { name: 'Sarah Chen', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Sarah', color: 'text-rose-600' },
        content: 'Hey team! Just pushed the latest updates to the Cruz UI shell. Can you all take a look?',
        timestamp: 'Today at 9:42 AM'
    },
    {
        id: '2',
        user: { name: 'Alex Rivera', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Alex', color: 'text-indigo-600' },
        content: 'Looks clean! Love the new sidebar interaction. Are we sticking with the indigo primary?',
        timestamp: 'Today at 9:45 AM'
    },
    {
        id: '3',
        user: { name: 'Cruz AI', avatar: 'https://api.dicebear.com/9.x/bottts/svg?seed=Cruz', color: 'text-purple-600' },
        content: 'Summary of discussion: The team is reviewing the UI Shell. Consensus is positive on the sidebar. Decision on primary color pending confirmation.',
        timestamp: 'Today at 9:46 AM',
        isSystem: false
    },
    {
        id: '4',
        user: { name: 'System', avatar: '', color: '' },
        content: 'Active Sprint "UI V1" updated by Sarah Chen.',
        timestamp: 'Today at 10:00 AM',
        isSystem: true
    },
    {
        id: '5',
        user: { name: 'David Kim', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=David', color: 'text-emerald-600' },
        content: 'I will start integrating the Project module components shortly. @Sarah does the Shell support secondary sidebars yet?',
        timestamp: 'Today at 10:15 AM'
    }
];
