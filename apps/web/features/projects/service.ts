import { MOCK_COLUMNS } from './data';
import { Column } from './types';

export const ProjectService = {
    getBoard: (): Column[] => {
        return MOCK_COLUMNS;
    },

    // Future expansion
    getTasks: () => {
        return MOCK_COLUMNS.flatMap(c => c.tasks);
    }
};
