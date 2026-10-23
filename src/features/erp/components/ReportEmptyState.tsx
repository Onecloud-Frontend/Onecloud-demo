import { CircleAlert, SearchX } from 'lucide-react';

interface ReportEmptyStateProps {
  error: string | null;
  isLoading: boolean;
  onRetry: () => void;
}

export function ReportEmptyState({ error, isLoading, onRetry }: ReportEmptyStateProps) {
  if (isLoading) return <div className="erp-report-loading" role="status"><span className="erp-report-loader" /><strong>Preparing report</strong><span>Gathering the latest ERP activity...</span></div>;
  if (!error) return <div className="erp-report-empty-state"><SearchX size={24} /><strong>No report data</strong><span>Try widening the date range or clearing some filters.</span></div>;
  return <div className="erp-report-error-state" role="alert"><CircleAlert size={21} /><div><strong>Report could not be loaded</strong><p>{error}</p></div><button className="erp-report-retry" onClick={onRetry} type="button">Try again</button></div>;
}