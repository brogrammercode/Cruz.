export interface Lead {
    id: string;
    name: string;
    value: string;
    contact: string;
    score: number;
    warning?: boolean;
    hot?: boolean;
}

export interface PipelineStage {
    id: string;
    title: string;
    count: number;
    total: string;
    color: string;
    leads: Lead[];
}
