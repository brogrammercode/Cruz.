export interface Metric {
    label: string;
    value: string;
}

export interface SecurityLog {
    id: string;
    time: string;
    msg: string;
    type: 'success' | 'warning' | 'error';
}
