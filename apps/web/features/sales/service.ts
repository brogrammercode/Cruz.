import { MOCK_PIPELINE } from './data';
import { PipelineStage } from './types';

export const SalesService = {
    getPipeline: (): PipelineStage[] => MOCK_PIPELINE
};
