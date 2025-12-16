import { Transaction, KPIMetric } from './types';
import { TrendingUp, TrendingDown, DollarSign, AlertCircle, CreditCard, Users } from 'lucide-react';

export const MOCK_KPIS: KPIMetric[] = [
    { title: "Total Revenue", value: "$428,900.00", change: "+12.5%", trend: "up", icon: DollarSign, color: "indigo" },
    { title: "Monthly Burn", value: "$42,000.00", change: "-2.1%", trend: "down", icon: TrendingDown, color: "orange" },
    { title: "Runway", value: "14 Months", change: "Stable", trend: "neutral", icon: TrendingUp, color: "green" },
    { title: "Pending Invoices", value: "5", change: "$12k", trend: "neutral", icon: AlertCircle, color: "red" }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
    { id: '1', title: "AWS Services", date: "Today, 2:00 PM", amount: "-$2,400.00", icon: CreditCard },
    { id: '2', title: "Stripe Payout", date: "Yesterday", amount: "+$14,250.00", positive: true, icon: DollarSign },
    { id: '3', title: "WeWork Rent", date: "Oct 24", amount: "-$4,500.00", icon: CreditCard },
    { id: '4', title: "Gusto Payroll", date: "Oct 15", amount: "-$32,000.00", icon: Users },
    { id: '5', title: "Slack Subscription", date: "Oct 14", amount: "-$1,200.00", icon: CreditCard }
];
