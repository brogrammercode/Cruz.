export interface KPIMetric {
    title: string;
    value: string;
    change: string;
    trend: 'up' | 'down' | 'neutral';
    icon: React.ElementType;
    color: string;
}

export interface Transaction {
    id: string;
    title: string;
    date: string;
    amount: string;
    positive?: boolean;
    icon: React.ElementType;
}
