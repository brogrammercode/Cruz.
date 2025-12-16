'use client';

import React from 'react';
import { Shell } from '@/components/layout/Shell';
import { PrimarySidebar } from '@/components/layout/PrimarySidebar';
import { ContextSidebar } from '@/components/layout/ContextSidebar';
import { ProjectHeader, KanbanBoard } from '@/features/projects';
import { ChatView } from '@/features/chat';
import { FinanceView } from '@/features/finance';
import { SalesView } from '@/features/sales';
import { DevView } from '@/features/dev';

import { useAppStore, AppProvider } from '@/context/AppContext'; // Import AppProvider

function HomeContent() { // Extracted logic to component
  const { activeModule, projectView, setProjectView } = useAppStore();

  const renderContent = () => {
    switch (activeModule) {
      case 'projects':
        return (
          <div className="h-full flex flex-col pt-6 px-8 bg-white">
            <ProjectHeader view={projectView} onViewChange={setProjectView} />
            <div className="flex-1 overflow-hidden min-h-0">
              {projectView === 'board' ? (
                <KanbanBoard />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 border-2 border-dashed border-gray-100 rounded-xl">
                  List/Timeline View Placeholder
                </div>
              )}
            </div>
          </div>
        );
      case 'chat':
        return <ChatView />;
      case 'finance':
        return <FinanceView />;
      case 'sales':
        return <SalesView />;
      case 'dev':
        return <DevView />;
      default:
        // Dashboard Default
        return (
          <div className="h-full w-full flex flex-col p-8 bg-white overflow-y-auto">
            <header className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Good Morning, Harshu</h1>
              <p className="text-gray-500">Here is what's happening at Cruz Inc. today.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <DashboardCard title="Revenue (Q4)" value="$1.2M" trend="+12%" />
              <DashboardCard title="Active Sprint" value="Sprint 12" subtext="3 days remaining" />
              <DashboardCard title="Team Online" value="14/18" subtext="All systems go" />
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-8 text-center flex flex-col items-center justify-center flex-1 min-h-[300px]">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">How can Cruz AI help you today?</h2>
              <p className="text-gray-500 max-w-md mb-6">Ask me anything about your business logic, create a new task, or draft an invoice.</p>

              <div className="w-full max-w-lg relative">
                <input
                  type="text"
                  placeholder="Draft a tweet about our new launch..."
                  className="w-full pl-6 pr-4 py-4 rounded-full border border-gray-200 shadow-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <button className="absolute right-2 top-2 p-2 bg-black text-white rounded-full hover:bg-gray-800">
                  <span className="text-xs font-bold px-1">→</span>
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <Shell
      primarySidebar={<PrimarySidebar />}
      secondarySidebar={<ContextSidebar />}
    >
      {renderContent()}
    </Shell>
  );
}

export default function Home() {
  return (
    <AppProvider>
      <HomeContent />
    </AppProvider>
  )
}

interface DashboardCardProps {
  title: string;
  value: string;
  trend?: string;
  subtext?: string;
}

function DashboardCard({ title, value, trend, subtext }: DashboardCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {trend && <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">{trend}</span>}
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      {subtext && <div className="text-xs text-gray-400 mt-1">{subtext}</div>}
    </div>
  );
}
