/**
 * Canonical Sales Pipeline Types
 * Ownership: Team CRM
 */

export interface PipelineStage {
  id: string;
  pipelineId: string;
  stageName: string;
  orderIndex: number;
  defaultProbability: number;
  color?: string;
}

export interface SalesPipeline {
  id: string;
  code: string;
  name: string;
  isDefault: boolean;
  stages: PipelineStage[];
  status: 'ACTIVE' | 'INACTIVE';
}
