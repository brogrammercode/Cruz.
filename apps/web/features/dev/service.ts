import { MOCK_LOGS } from './data';
import { SecurityLog } from './types';

export const DevService = {
    getSecurityLogs: (): SecurityLog[] => MOCK_LOGS,
    getDatabaseMetrics: () => ({
        totalRecords: "1,240,500",
        storage: "4.2 GB / 10 GB",
        queryTime: "12ms"
    })
};
