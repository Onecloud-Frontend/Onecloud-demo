import type { ProfitLossSummary } from '../types/reportTypes';

const currency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value);

export function ProfitLossKpis({ summary }: { summary: ProfitLossSummary }) {
  const cards = [
    { label: 'GROSS SALES', value: summary.grossSales, note: '+ 12.5% increase', color: '#f4f7fc' },
    { label: 'COST OF GOODS (COGS)', value: summary.cogs, note: '50.6% of sales revenue', color: '#dc2626' },
    { label: 'GROSS PROFIT', value: summary.grossProfit, note: '49.4% gross margin', color: '#16a34a' },
    { label: 'NET OPERATING PROFIT', value: summary.netOperatingProfit, note: '27.3% net profit margin', color: '#16a34a' },
  ];

  return (
    <section className="erp-pl-kpis" aria-label="Profit and loss metrics">
      {cards.map((card) => (
        <article 
          className="erp-pl-kpi erp-chart-tooltip" 
          key={card.label} 
          tabIndex={0} 
          data-tooltip={`${card.label}: ${currency(card.value)} (${card.note})`}
        >
          <span>{card.label}</span>
          <strong style={{ color: card.color }}>{currency(card.value)}</strong>
          <small>{card.note}</small>
        </article>
      ))}
    </section>
  );
}