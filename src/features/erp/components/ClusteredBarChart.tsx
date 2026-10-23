import type { ProfitLossMonth } from '../types/reportTypes';

const series = [
  { key: 'revenue', label: 'Gross Revenue', color: '#22b573' },
  { key: 'cogs', label: 'COGS & Cost', color: '#ef4444' },
  { key: 'net', label: 'Net Profit', color: '#3b82f6' },
] as const;

const money = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

export function ClusteredBarChart({ data }: { data: ProfitLossMonth[] }) {
  const max = Math.max(...data.flatMap((item) => [item.revenue, item.cogs, item.net]), 1);

  return (
    <section className="erp-report-panel erp-pl-chart-panel">
     <h2 className="erp-pl-chart-title">Revenue vs Cost &amp; Expenses (2026)</h2>
      {/* ... legend part ... */}
      <div className="erp-pl-bars" role="list" aria-label="Monthly revenue, costs, and profit">
        {data.map((month) => (
          <div className="erp-pl-month" key={month.month} role="listitem">
            <div className="erp-pl-month-bars">
              {series.map((item) => {
                const value = month[item.key];
                return (
                  <span
                    key={item.key}
                    className="erp-pl-bar erp-chart-tooltip"
                    tabIndex={0}
                    // Exact tooltip format idigo:
                    title={`${month.month} ${item.label}: ${money(value)}`}
                    aria-label={`${month.month} ${item.label}: ${money(value)}`}
                    data-tooltip={`${month.month} ${item.label}: ${money(value)}`}
                    style={{
                      height: `${(value / max) * 100}%`,
                      background: item.color,
                    }}
                  />
                );
              })}
            </div>
            <small>{month.month}</small>
          </div>
        ))}
      </div>
    </section>
  );
}