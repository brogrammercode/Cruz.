import { SecurityLog } from './types';

export const MOCK_LOGS: SecurityLog[] = [
    { id: '1', time: "10:42 AM", msg: "Successful login from IP 192.168.1.1", type: "success" },
    { id: '2', time: "10:15 AM", msg: "API Rate limit warning for key pk_test...", type: "warning" },
    { id: '3', time: "09:30 AM", msg: "Failed login attempt (admin)", type: "error" }
];
