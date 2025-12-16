'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppState {
    activeModule: string;
    setActiveModule: (module: string) => void;
    projectView: 'board' | 'list' | 'timeline';
    setProjectView: (view: 'board' | 'list' | 'timeline') => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [activeModule, setActiveModule] = useState('dashboard');
    const [projectView, setProjectView] = useState<'board' | 'list' | 'timeline'>('board');

    return (
        <AppContext.Provider value={{ activeModule, setActiveModule, projectView, setProjectView }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppStore() {
    const context = useContext(AppContext);
    if (!context) {
        // Fallback for SSR/Build time if provider is missing
        return {
            activeModule: 'dashboard',
            setActiveModule: () => { },
            projectView: 'board',
            setProjectView: () => { }
        } as AppState;
    }
    return context;
}
