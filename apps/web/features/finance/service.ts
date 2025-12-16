import { MOCK_KPIS, MOCK_TRANSACTIONS } from './data';
import { KPIMetric, Transaction } from './types';

export const FinanceService = {
    getKPIs: (): KPIMetric[] => MOCK_KPIS,
    getTransactions: (): Transaction[] => MOCK_TRANSACTIONS
};
