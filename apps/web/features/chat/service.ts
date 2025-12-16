import { MOCK_MESSAGES } from './data';
import { Message } from './types';

export const ChatService = {
    getMessages: (): Message[] => MOCK_MESSAGES,
    getChannels: () => [
        { id: '1', name: 'general' },
        { id: '2', name: 'random' },
        { id: '3', name: 'engineering' }
    ]
};
