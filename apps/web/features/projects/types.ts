export type Priority = 'low' | 'medium' | 'high';

export interface User {
    id: string;
    name: string;
    avatar: string; // URL
}

export interface Task {
    id: string;
    title: string;
    tag: string;
    tagColor: string;
    priority: Priority;
    members: string[]; // URLs for now, to match existing
    comments: number;
    attachments: number;
}

export interface Column {
    id: string;
    title: string;
    tasks: Task[];
    color: string;
}

export type ProjectViewMode = 'board' | 'list' | 'timeline';
