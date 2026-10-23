import { ProfitLossKpis } from '../components/ProfitLossKpis';
import { ClusteredBarChart } from '../components/ClusteredBarChart';
import { ErpReportResult } from '../types/reportTypes';
import { ReportPieChart } from '../components/ReportPieChart';
import { CombinedAdvancedChart } from '../components/CombinedAdvancedChart';

export function ProfitLossAnalysisReport({ report }: { report: ErpReportResult }) {
  if (!report.profitLoss) return null;
  
  const { summary } = report.profitLoss;
  
  const pieData = [
    { label: 'Gross Profit', value: summary.grossProfit, color: '#34d399' },
    { label: 'COGS', value: summary.cogs, color: '#f87171' }
  ];
  const plData = report.profitLoss?.chartData.map(d => ({
  label: d.month, barValue: d.revenue, areaValue: d.cogs, dotValue: d.net
})) || [];

  return (
    <div className="erp-pl-report erp-stagger-fade-in">
      <ProfitLossKpis summary={summary} />
      
      <div className="erp-report-visual-grid">
        <ReportPieChart title="Revenue Breakdown" data={pieData} />
        <ClusteredBarChart data={report.profitLoss.chartData} />
        <CombinedAdvancedChart title="P&L Advanced Breakdown" data={plData} />
      </div>
    </div>
  );
}