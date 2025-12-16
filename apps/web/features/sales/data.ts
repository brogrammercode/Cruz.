import { PipelineStage } from './types';

export const MOCK_PIPELINE: PipelineStage[] = [
    {
        id: 'new', title: "New Leads", count: 12, total: "$45k", color: "border-l-4 border-blue-400",
        leads: [
            { id: '1', name: "Acme Corp", value: "$12,000", contact: "John Doe", score: 95 },
            { id: '2', name: "TechStart Inc", value: "$8,500", contact: "Sarah Smith", score: 88 },
            { id: '3', name: "Global Logistics", value: "$25,000", contact: "Mike Ross", score: 45, warning: true }
        ]
    },
    {
        id: 'qualified', title: "Qualified", count: 5, total: "$120k", color: "border-l-4 border-indigo-400",
        leads: [
            { id: '4', name: "Nebula Systems", value: "$45,000", contact: "Elena K.", score: 92 },
            { id: '5', name: "Blue Ocean", value: "$15,000", contact: "Tom H.", score: 78 }
        ]
    },
    {
        id: 'proposal', title: "Proposal Sent", count: 3, total: "$85k", color: "border-l-4 border-purple-400",
        leads: [
            { id: '6', name: "Massive Dynamic", value: "$60,000", contact: "William Bell", score: 99, hot: true }
        ]
    },
    {
        id: 'negotiation', title: "Negotiation", count: 2, total: "$210k", color: "border-l-4 border-orange-400",
        leads: [
            { id: '7', name: "Hooli XYZ", value: "$150,000", contact: "Gavin B.", score: 60 }
        ]
    },
    {
        id: 'closed', title: "Closed Won", count: 28, total: "$840k", color: "border-l-4 border-green-400",
        leads: [] // Empty for now as rendered differently in view
    }
];
