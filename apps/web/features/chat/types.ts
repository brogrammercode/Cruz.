export interface User {
    name: string;
    avatar: string;
    color: string;
}

export interface Message {
    id: string;
    user: User;
    content: string;
    timestamp: string;
    isSystem?: boolean;
}
